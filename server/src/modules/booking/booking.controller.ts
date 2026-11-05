import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { z } from "zod";

import { prisma } from "../../lib/prisma.js";

import {
  UserRole,
} from "../../generated/prisma/client.js";

import {
  BookingServiceError,
  getBookingById,
  cancelBooking,
  getBookingHelper,
  createBookingReview,
} from "./booking.service.js";

/**
 * Validate household authentication
 */
const getHousehold = async (req: Request) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    throw new BookingServiceError(
      "Authentication required.",
      401,
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    throw new BookingServiceError(
      "User account not found.",
      404,
    );
  }

  if (user.role !== UserRole.USER) {
    throw new BookingServiceError(
      "Only household accounts can perform this action.",
      403,
    );
  }

  return user;
};

const getBookingId = (req: Request): string => {
  const id = req.params.id;

  if (typeof id !== "string" || !id.trim()) {
    throw new BookingServiceError(
      "Invalid booking ID.",
      400,
    );
  }

  return id;
};

/**
 * Centralized controller error handling
 */
const handleError = (res: Response, error: unknown) => {
  if (error instanceof BookingServiceError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  console.error("Booking API Error:", error);

  return res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again.",
  });
};

/**
 * GET /api/bookings/:id
 */
export const getBookingDetails = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = await getHousehold(req);

    const booking = await getBookingById(
      getBookingId(req),
      user.id,
    );

    return res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * PATCH /api/bookings/:id/cancel
 */
export const cancelBookingController = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = await getHousehold(req);

    const booking = await cancelBooking(
      getBookingId(req),
      user.id,
    );

    return res.json({
      success: true,
      message: "Booking cancelled successfully.",
      data: booking,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * GET /api/bookings/:id/helper
 */
export const getBookingHelperController = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = await getHousehold(req);

    const helper = await getBookingHelper(
      getBookingId(req),
      user.id,
    );

    return res.json({
      success: true,
      data: helper,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * POST /api/bookings/:id/review
 */
export const submitBookingReview = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = await getHousehold(req);

    const reviewSchema = z.object({
      rating: z.number().int().min(1).max(5),
      comment: z.string().trim().max(1000).optional(),
    });

    const validation = reviewSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid review information.",
        errors: validation.error.issues,
      });
    }

    const review = await createBookingReview(
      getBookingId(req),
      user.id,
      validation.data.rating,
      validation.data.comment || undefined,
    );

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      data: review,
    });
  } catch (error) {
    return handleError(res, error);
  }
};