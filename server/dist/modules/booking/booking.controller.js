"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitBookingReview = exports.getBookingHelperController = exports.cancelBookingController = exports.getBookingDetails = void 0;
const express_1 = require("@clerk/express");
const zod_1 = require("zod");
const prisma_js_1 = require("../../lib/prisma.js");
const client_js_1 = require("../../generated/prisma/client.js");
const booking_service_js_1 = require("./booking.service.js");
/**
 * Validate household authentication
 */
const getHousehold = async (req) => {
    const { isAuthenticated, userId } = (0, express_1.getAuth)(req);
    if (!isAuthenticated || !userId) {
        throw new booking_service_js_1.BookingServiceError("Authentication required.", 401);
    }
    const user = await prisma_js_1.prisma.user.findUnique({
        where: {
            clerkId: userId,
        },
    });
    if (!user) {
        throw new booking_service_js_1.BookingServiceError("User account not found.", 404);
    }
    if (user.role !== client_js_1.UserRole.USER) {
        throw new booking_service_js_1.BookingServiceError("Only household accounts can perform this action.", 403);
    }
    return user;
};
const getBookingId = (req) => {
    const id = req.params.id;
    if (typeof id !== "string" || !id.trim()) {
        throw new booking_service_js_1.BookingServiceError("Invalid booking ID.", 400);
    }
    return id;
};
/**
 * Centralized controller error handling
 */
const handleError = (res, error) => {
    if (error instanceof booking_service_js_1.BookingServiceError) {
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
const getBookingDetails = async (req, res) => {
    try {
        const user = await getHousehold(req);
        const booking = await (0, booking_service_js_1.getBookingById)(getBookingId(req), user.id);
        return res.json({
            success: true,
            data: booking,
        });
    }
    catch (error) {
        return handleError(res, error);
    }
};
exports.getBookingDetails = getBookingDetails;
/**
 * PATCH /api/bookings/:id/cancel
 */
const cancelBookingController = async (req, res) => {
    try {
        const user = await getHousehold(req);
        const booking = await (0, booking_service_js_1.cancelBooking)(getBookingId(req), user.id);
        return res.json({
            success: true,
            message: "Booking cancelled successfully.",
            data: booking,
        });
    }
    catch (error) {
        return handleError(res, error);
    }
};
exports.cancelBookingController = cancelBookingController;
/**
 * GET /api/bookings/:id/helper
 */
const getBookingHelperController = async (req, res) => {
    try {
        const user = await getHousehold(req);
        const helper = await (0, booking_service_js_1.getBookingHelper)(getBookingId(req), user.id);
        return res.json({
            success: true,
            data: helper,
        });
    }
    catch (error) {
        return handleError(res, error);
    }
};
exports.getBookingHelperController = getBookingHelperController;
/**
 * POST /api/bookings/:id/review
 */
const submitBookingReview = async (req, res) => {
    try {
        const user = await getHousehold(req);
        const reviewSchema = zod_1.z.object({
            rating: zod_1.z.number().int().min(1).max(5),
            comment: zod_1.z.string().trim().max(1000).optional(),
        });
        const validation = reviewSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid review information.",
                errors: validation.error.issues,
            });
        }
        const review = await (0, booking_service_js_1.createBookingReview)(getBookingId(req), user.id, validation.data.rating, validation.data.comment || undefined);
        return res.status(201).json({
            success: true,
            message: "Review submitted successfully.",
            data: review,
        });
    }
    catch (error) {
        return handleError(res, error);
    }
};
exports.submitBookingReview = submitBookingReview;
