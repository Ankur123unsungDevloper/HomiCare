"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingReview = exports.getBookingHelper = exports.cancelBooking = exports.getBookingById = exports.BookingServiceError = void 0;
const prisma_js_1 = require("../../lib/prisma.js");
const client_js_1 = require("../../generated/prisma/client.js");
class BookingServiceError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = "BookingServiceError";
    }
}
exports.BookingServiceError = BookingServiceError;
/**
 * Get booking details
 */
const getBookingById = async (bookingId, householdId) => {
    const booking = await prisma_js_1.prisma.booking.findFirst({
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
exports.getBookingById = getBookingById;
/**
 * Cancel booking
 */
const cancelBooking = async (bookingId, householdId) => {
    const booking = await prisma_js_1.prisma.booking.findFirst({
        where: {
            id: bookingId,
            householdId,
        },
    });
    if (!booking) {
        throw new BookingServiceError("Booking not found.", 404);
    }
    if (booking.status !== client_js_1.BookingStatus.PENDING &&
        booking.status !== client_js_1.BookingStatus.CONFIRMED) {
        throw new BookingServiceError("This booking can no longer be cancelled.", 409);
    }
    // Conditional update prevents cancellation races.
    const result = await prisma_js_1.prisma.booking.updateMany({
        where: {
            id: bookingId,
            householdId,
            status: {
                in: [
                    client_js_1.BookingStatus.PENDING,
                    client_js_1.BookingStatus.CONFIRMED,
                ],
            },
        },
        data: {
            status: client_js_1.BookingStatus.CANCELLED,
        },
    });
    if (result.count === 0) {
        throw new BookingServiceError("Booking status changed. Please refresh and try again.", 409);
    }
    return prisma_js_1.prisma.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
};
exports.cancelBooking = cancelBooking;
/**
 * Get assigned helper's contact details
 */
const getBookingHelper = async (bookingId, householdId) => {
    const booking = await prisma_js_1.prisma.booking.findFirst({
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
        throw new BookingServiceError("No helper has been assigned to this booking yet.", 404);
    }
    if (booking.helper.role !== client_js_1.UserRole.HELPER) {
        throw new BookingServiceError("The assigned account is not a helper.", 409);
    }
    return booking.helper;
};
exports.getBookingHelper = getBookingHelper;
/**
 * Submit booking review
 */
const createBookingReview = async (bookingId, householdId, rating, comment) => {
    const booking = await prisma_js_1.prisma.booking.findFirst({
        where: {
            id: bookingId,
            householdId,
        },
    });
    if (!booking) {
        throw new BookingServiceError("Booking not found.", 404);
    }
    if (booking.status !== client_js_1.BookingStatus.COMPLETED) {
        throw new BookingServiceError("Only completed bookings can be reviewed.", 400);
    }
    if (!booking.helperId) {
        throw new BookingServiceError("This booking has no assigned helper.", 400);
    }
    try {
        return await prisma_js_1.prisma.review.create({
            data: {
                bookingId,
                householdId,
                helperId: booking.helperId,
                rating,
                comment,
            },
        });
    }
    catch (error) {
        if (typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2002") {
            throw new BookingServiceError("You have already reviewed this booking.", 409);
        }
        throw error;
    }
};
exports.createBookingReview = createBookingReview;
