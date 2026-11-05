import { prisma } from "../../lib/prisma.js";

import {
  BookingStatus,
  UserRole,
} from "../../generated/prisma/client.js";

export class BookingServiceError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = "BookingServiceError";
  }
}

/**
 * Get booking details
 */
export const getBookingById = async (
  bookingId: string,
  householdId: string,
) => {
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      householdId,
    },
    include: {
      helper: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      review: true,
    },
  });

  if (!booking) {
    throw new BookingServiceError("Booking not found.", 404);
  }

  return booking;
};

/**
 * Cancel booking
 */
export const cancelBooking = async (
  bookingId: string,
  householdId: string,
) => {
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      householdId,
    },
  });

  if (!booking) {
    throw new BookingServiceError("Booking not found.", 404);
  }

  if (
    booking.status !== BookingStatus.PENDING &&
    booking.status !== BookingStatus.CONFIRMED
  ) {
    throw new BookingServiceError(
      "This booking can no longer be cancelled.",
      409,
    );
  }

  // Conditional update prevents cancellation races.
  const result = await prisma.booking.updateMany({
    where: {
      id: bookingId,
      householdId,
      status: {
        in: [
          BookingStatus.PENDING,
          BookingStatus.CONFIRMED,
        ],
      },
    },
    data: {
      status: BookingStatus.CANCELLED,
    },
  });

  if (result.count === 0) {
    throw new BookingServiceError(
      "Booking status changed. Please refresh and try again.",
      409,
    );
  }

  return prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });
};

/**
 * Get assigned helper's contact details
 */
export const getBookingHelper = async (
  bookingId: string,
  householdId: string,
) => {
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      householdId,
    },
    select: {
      id: true,
      status: true,
      helper: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
        },
      },
    },
  });

  if (!booking) {
    throw new BookingServiceError("Booking not found.", 404);
  }

  if (!booking.helper) {
    throw new BookingServiceError(
      "No helper has been assigned to this booking yet.",
      404,
    );
  }

  if (booking.helper.role !== UserRole.HELPER) {
    throw new BookingServiceError(
      "The assigned account is not a helper.",
      409,
    );
  }

  return booking.helper;
};

/**
 * Submit booking review
 */
export const createBookingReview = async (
  bookingId: string,
  householdId: string,
  rating: number,
  comment?: string,
) => {
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      householdId,
    },
  });

  if (!booking) {
    throw new BookingServiceError("Booking not found.", 404);
  }

  if (booking.status !== BookingStatus.COMPLETED) {
    throw new BookingServiceError(
      "Only completed bookings can be reviewed.",
      400,
    );
  }

  if (!booking.helperId) {
    throw new BookingServiceError(
      "This booking has no assigned helper.",
      400,
    );
  }

  try {
    return await prisma.review.create({
      data: {
        bookingId,
        householdId,
        helperId: booking.helperId,
        rating,
        comment,
      },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      throw new BookingServiceError(
        "You have already reviewed this booking.",
        409,
      );
    }

    throw error;
  }
};