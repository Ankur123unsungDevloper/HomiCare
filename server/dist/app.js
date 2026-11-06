"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prisma_js_1 = require("./lib/prisma.js");
const firebase_admin_js_1 = require("./firebase-admin.js");
const express_2 = require("@clerk/express");
const multer_1 = __importDefault(require("multer"));
const validate_document_js_1 = require("./utils/validate-document.js");
const verification_document_service_js_1 = require("./services/verification-document.service.js");
const razorpay_service_js_1 = require("./services/razorpay.service.js");
const booking_routes_js_1 = __importDefault(require("./modules/booking/booking.routes.js"));
const helperApplicationSchema = zod_1.z.object({
    fullName: zod_1.z.string().trim().min(2).max(100),
    phone: zod_1.z.string().trim().min(7).max(20),
    city: zod_1.z.string().trim().min(2).max(100),
    area: zod_1.z.string().trim().min(2).max(100),
    services: zod_1.z
        .array(zod_1.z.enum(["Maid Services", "Babysitting", "Nanny Care"]))
        .min(1)
        .max(3),
    experience: zod_1.z.string().trim().min(1).max(50),
    availability: zod_1.z.enum([
        "Full-time",
        "Part-time",
        "Hourly",
        "Live-in",
    ]),
    experienceDetails: zod_1.z.string().trim().max(2000).optional(),
});
const createRegistrationPaymentSchema = zod_1.z.object({
    applicationId: zod_1.z.string().min(1, "Application ID is required"),
});
const complaintStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(["OPEN", "UNDER_REVIEW", "RESOLVED", "CLOSED"]),
    resolution: zod_1.z.string().trim().max(2000).optional(),
});
const complaintPrioritySchema = zod_1.z.object({
    priority: zod_1.z.enum(["LOW", "MEDIUM", "HIGH"]),
});
const app = (0, express_1.default)();
app.use("/api/bookings", booking_routes_js_1.default);
async function requireAdmin(req, res, next) {
    const { isAuthenticated, userId } = (0, express_2.getAuth)(req);
    if (!isAuthenticated || !userId) {
        return res.status(401).json({
            success: false,
            message: "Please sign in to access this resource.",
        });
    }
    try {
        const user = await prisma_js_1.prisma.user.findUnique({
            where: { clerkId: userId },
            select: { role: true },
        });
        if (!user || user.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Administrator access is required.",
            });
        }
        return next();
    }
    catch (error) {
        console.error("Admin authorization failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to verify administrator permissions.",
        });
    }
}
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL ?? "http://localhost:3000",
    credentials: true,
}));
app.use((0, express_2.clerkMiddleware)());
app.use(express_1.default.json());
app.post("/api/helper-applications/payment/order", async (req, res) => {
    const { isAuthenticated, userId } = (0, express_2.getAuth)(req);
    if (!isAuthenticated || !userId) {
        return res.status(401).json({
            success: false,
            message: "Please sign in to continue to payment.",
        });
    }
    const validation = createRegistrationPaymentSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            success: false,
            message: "A valid application ID is required.",
            errors: validation.error.flatten(),
        });
    }
    try {
        const user = await prisma_js_1.prisma.user.findUnique({
            where: { clerkId: userId },
            select: { id: true, role: true },
        });
        if (!user || user.role !== "USER") {
            return res.status(403).json({
                success: false,
                message: "Your account cannot make this registration payment.",
            });
        }
        const application = await prisma_js_1.prisma.helperApplication.findFirst({
            where: {
                id: validation.data.applicationId,
                userId: user.id,
                status: "DRAFT",
            },
            select: {
                id: true,
                verifications: {
                    select: {
                        type: true,
                        evidenceRequired: true,
                        documents: {
                            select: { id: true },
                            take: 1,
                        },
                    },
                },
            },
        });
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Your draft application was not found.",
            });
        }
        const requiredDocuments = ["IDENTITY", "ADDRESS", "BACKGROUND"];
        const missingDocuments = requiredDocuments.filter((type) => {
            const verification = application.verifications.find((item) => item.type === type);
            return (!verification ||
                !verification.evidenceRequired ||
                verification.documents.length === 0);
        });
        if (missingDocuments.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Upload all required documents before proceeding to payment.",
                missingDocuments,
            });
        }
        const order = await (0, razorpay_service_js_1.createRegistrationOrder)(application.id);
        return res.status(201).json({
            success: true,
            message: "Registration payment order created.",
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency,
            },
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    }
    catch (error) {
        console.error("Registration payment order creation failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to initiate registration payment.",
        });
    }
});
const verificationUpload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
        fields: 2,
        parts: 3,
    },
});
app.get("/api/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "HomiCare API is running",
        timestamp: new Date().toISOString(),
    });
});
app.get("/api/db-check", async (_req, res) => {
    try {
        const userCount = await prisma_js_1.prisma.user.count();
        res.status(200).json({
            success: true,
            message: "Database connection successful",
            userCount,
        });
    }
    catch (error) {
        console.error("Database check failed:", error);
        res.status(500).json({
            success: false,
            message: "Database connection failed",
        });
    }
});
app.get("/api/protected", (req, res) => {
    const { isAuthenticated, userId } = (0, express_2.getAuth)(req);
    if (!isAuthenticated || !userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Please sign in.",
        });
    }
    return res.status(200).json({
        success: true,
        message: "You are authenticated!",
        userId,
    });
});
app.post("/api/users/sync", async (req, res) => {
    const { isAuthenticated, userId } = (0, express_2.getAuth)(req);
    if (!isAuthenticated || !userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Please sign in.",
        });
    }
    try {
        // Retrieve the verified user profile directly from Clerk.
        const clerkUser = await express_2.clerkClient.users.getUser(userId);
        const primaryEmail = clerkUser.emailAddresses.find((email) => email.id === clerkUser.primaryEmailAddressId)?.emailAddress;
        if (!primaryEmail) {
            return res.status(400).json({
                success: false,
                message: "Your Clerk account must have a primary email address.",
            });
        }
        const email = primaryEmail.trim().toLowerCase();
        console.log("User sync diagnostic:", {
            clerkUserId: userId,
            normalizedEmail: email,
        });
        const firstName = clerkUser.firstName ?? null;
        const lastName = clerkUser.lastName ?? null;
        // Check whether this email already belongs to another Clerk account.
        const emailOwner = await prisma_js_1.prisma.user.findUnique({
            where: { email },
        });
        console.log("Email ownership diagnostic:", {
            emailExists: Boolean(emailOwner),
            belongsToCurrentClerkUser: emailOwner?.clerkId === userId,
        });
        if (emailOwner && emailOwner.clerkId !== userId) {
            return res.status(409).json({
                success: false,
                message: "This email is already associated with another account.",
            });
        }
        // Create the user if new; otherwise update the existing profile.
        const user = await prisma_js_1.prisma.user.upsert({
            where: { clerkId: userId },
            create: {
                clerkId: userId,
                email,
                firstName,
                lastName,
            },
            update: {
                email,
                firstName,
                lastName,
            },
            select: {
                id: true,
                clerkId: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
            },
        });
        return res.status(200).json({
            success: true,
            message: "User synchronized successfully.",
            user,
        });
    }
    catch (error) {
        console.error("User synchronization failed:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to synchronize user.",
        });
    }
});
app.get("/api/users/me", async (req, res) => {
    const { isAuthenticated, userId } = (0, express_2.getAuth)(req);
    if (!isAuthenticated || !userId) {
        return res.status(401).json({
            success: false,
            message: "Please sign in.",
        });
    }
    try {
        const user = await prisma_js_1.prisma.user.findUnique({
            where: { clerkId: userId },
            select: {
                role: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User account not found.",
            });
        }
        return res.status(200).json({
            success: true,
            role: user.role,
        });
    }
    catch (error) {
        console.error("Fetching current user failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to retrieve user role.",
        });
    }
});
// These routes expect the following to already exist in your server file:
//   app, prisma, requireAdmin, helperApplicationSchema,
//   getAuth (from @clerk/express), z (from zod)
/* ---------------------------------------------
  Shared constants
--------------------------------------------- */
// Every application gets one verification check per type below.
const requiredVerificationTypes = [
    "IDENTITY",
    "PHONE",
    "ADDRESS",
    "BACKGROUND",
];
// Checks that need uploaded supporting evidence (PHONE is verified by OTP only).
const evidenceRequiredTypes = new Set([
    "IDENTITY",
    "ADDRESS",
    "BACKGROUND",
]);
// A user may only have one application in any of these states at a time.
const activeApplicationStatuses = [
    "PENDING",
    "UNDER_REVIEW",
    "VERIFICATION_IN_PROGRESS",
    "ACTION_REQUIRED",
    "VERIFIED",
];
const verificationUpdateSchema = zod_1.z
    .object({
    status: zod_1.z.enum([
        "IN_PROGRESS",
        "PASSED",
        "FAILED",
        "ACTION_REQUIRED",
    ]),
    notes: zod_1.z.string().trim().max(2000).optional(),
})
    .strict();
function getErrorCode(error) {
    return typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string"
        ? error.code
        : undefined;
}
/* ---------------------------------------------
  POST /api/helper-applications
  A signed-in household user applies to become a helper
--------------------------------------------- */
app.post("/api/helper-applications", async (req, res) => {
    const { isAuthenticated, userId } = (0, express_2.getAuth)(req);
    if (!isAuthenticated || !userId) {
        return res.status(401).json({
            success: false,
            message: "Please sign in to submit your application.",
        });
    }
    const validation = helperApplicationSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            success: false,
            message: "Please check your application details.",
            errors: validation.error.flatten(),
        });
    }
    try {
        const user = await prisma_js_1.prisma.user.findUnique({
            where: { clerkId: userId },
            select: {
                id: true,
                role: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Your account is not ready. Please try again shortly.",
            });
        }
        if (user.role !== "USER") {
            return res.status(403).json({
                success: false,
                message: "Your account is not eligible for a helper application.",
            });
        }
        // Verify the Firebase ID token issued after successful phone OTP verification.
        const firebaseIdToken = req.header("X-Firebase-ID-Token");
        if (!firebaseIdToken) {
            return res.status(401).json({
                success: false,
                message: "Please verify your phone number before continuing.",
            });
        }
        let verifiedPhoneNumber;
        try {
            const decodedToken = await firebase_admin_js_1.firebaseAdminAuth.verifyIdToken(firebaseIdToken);
            if (decodedToken.firebase.sign_in_provider !== "phone") {
                return res.status(401).json({
                    success: false,
                    message: "Please verify your phone number using OTP.",
                });
            }
            if (!decodedToken.phone_number) {
                return res.status(401).json({
                    success: false,
                    message: "The verified token does not contain a phone number.",
                });
            }
            verifiedPhoneNumber = decodedToken.phone_number;
        }
        catch (error) {
            console.error("Firebase phone verification failed:", error);
            return res.status(401).json({
                success: false,
                message: "Phone verification has expired or is invalid. Please verify again.",
            });
        }
        const normalizedSubmittedPhone = validation.data.phone.replace(/[\s()-]/g, "");
        if (verifiedPhoneNumber !== normalizedSubmittedPhone) {
            return res.status(403).json({
                success: false,
                message: "The verified phone number does not match your application.",
            });
        }
        const data = validation.data;
        // The duplicate check and the create run in one serializable transaction,
        // so two quick submissions (double click, two tabs) can't both succeed.
        const result = await prisma_js_1.prisma.$transaction(async (tx) => {
            const existing = await tx.helperApplication.findFirst({
                where: {
                    userId: user.id,
                    status: { in: [...activeApplicationStatuses] },
                },
                select: {
                    id: true,
                    status: true,
                },
            });
            if (existing) {
                return { existing };
            }
            const application = await tx.helperApplication.create({
                data: {
                    userId: user.id,
                    fullName: data.fullName,
                    phone: data.phone,
                    city: data.city,
                    area: data.area,
                    services: [...new Set(data.services)],
                    experience: data.experience,
                    availability: data.availability,
                    experienceDetails: data.experienceDetails || null,
                    status: "DRAFT",
                    verifications: {
                        create: requiredVerificationTypes.map((type) => ({
                            type,
                            evidenceRequired: evidenceRequiredTypes.has(type),
                            ...(type === "PHONE"
                                ? {
                                    status: "PASSED",
                                    verifiedAt: new Date(),
                                    notes: "Phone number verified through Firebase OTP.",
                                }
                                : {}),
                        })),
                    },
                },
                select: {
                    id: true,
                    fullName: true,
                    status: true,
                    createdAt: true,
                    verifications: {
                        orderBy: { type: "asc" },
                        select: {
                            id: true,
                            type: true,
                            status: true,
                        },
                    },
                },
            });
            return { application };
        }, { isolationLevel: "Serializable" });
        if ("existing" in result && result.existing) {
            return res.status(409).json({
                success: false,
                message: "You already have an active helper application.",
                applicationId: result.existing.id,
                status: result.existing.status,
            });
        }
        return res.status(201).json({
            success: true,
            message: "Your application draft has been saved. Upload the required documents to continue.",
            application: result.application,
        });
    }
    catch (error) {
        const code = getErrorCode(error);
        // P2002: unique constraint (if you add one later)
        // P2034: a concurrent submission won the race
        if (code === "P2002" || code === "P2034") {
            return res.status(409).json({
                success: false,
                message: "You already have an active helper application, or another submission is in progress.",
            });
        }
        console.error("Helper application submission failed:", error);
        return res.status(500).json({
            success: false,
            message: "We couldn't submit your application. Please try again.",
        });
    }
});
/* ---------------------------------------------
  POST /api/helper-applications/:applicationId/submit
  Submit a completed draft for admin review
--------------------------------------------- */
app.post("/api/helper-applications/:applicationId/submit", async (req, res) => {
    const { isAuthenticated, userId } = (0, express_2.getAuth)(req);
    if (!isAuthenticated || !userId) {
        return res.status(401).json({
            success: false,
            message: "Please sign in to submit your application.",
        });
    }
    const paramsSchema = zod_1.z.object({
        applicationId: zod_1.z.string().min(1),
    });
    const parsedParams = paramsSchema.safeParse(req.params);
    if (!parsedParams.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid application ID.",
        });
    }
    try {
        const user = await prisma_js_1.prisma.user.findUnique({
            where: { clerkId: userId },
            select: {
                id: true,
                role: true,
            },
        });
        if (!user || user.role !== "USER") {
            return res.status(403).json({
                success: false,
                message: "Your account cannot submit a helper application.",
            });
        }
        const result = await prisma_js_1.prisma.$transaction(async (tx) => {
            const application = await tx.helperApplication.findFirst({
                where: {
                    id: parsedParams.data.applicationId,
                    userId: user.id,
                },
                select: {
                    id: true,
                    status: true,
                    verifications: {
                        select: {
                            type: true,
                            status: true,
                            evidenceRequired: true,
                            documents: {
                                select: {
                                    id: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!application) {
                return { kind: "NOT_FOUND" };
            }
            if (application.status !== "DRAFT") {
                return { kind: "NOT_DRAFT" };
            }
            const phoneVerification = application.verifications.find((verification) => verification.type === "PHONE");
            if (phoneVerification?.status !== "PASSED") {
                return { kind: "PHONE_NOT_VERIFIED" };
            }
            const requiredDocumentTypes = [
                "IDENTITY",
                "ADDRESS",
                "BACKGROUND",
            ];
            const missingDocuments = requiredDocumentTypes.filter((type) => {
                const verification = application.verifications.find((item) => item.type === type);
                return (!verification ||
                    !verification.evidenceRequired ||
                    verification.documents.length === 0);
            });
            const missingVerificationTypes = requiredVerificationTypes.filter((type) => !application.verifications.some((verification) => verification.type === type));
            if (missingDocuments.length > 0 ||
                missingVerificationTypes.length > 0) {
                return {
                    kind: "DOCUMENTS_MISSING",
                    missingDocuments,
                    missingVerificationTypes,
                };
            }
            const updatedApplication = await tx.helperApplication.update({
                where: { id: application.id },
                data: { status: "PENDING" },
                select: {
                    id: true,
                    status: true,
                    updatedAt: true,
                },
            });
            await tx.helperApplication.deleteMany({
                where: {
                    userId: user.id,
                    id: { not: application.id },
                    status: "DRAFT",
                },
            });
            return {
                kind: "SUCCESS",
                application: updatedApplication,
            };
        });
        switch (result.kind) {
            case "NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Application not found.",
                });
            case "NOT_DRAFT":
                return res.status(409).json({
                    success: false,
                    message: "Only draft applications can be submitted.",
                });
            case "PHONE_NOT_VERIFIED":
                return res.status(409).json({
                    success: false,
                    message: "Please verify your phone number before submitting.",
                });
            case "DOCUMENTS_MISSING":
                return res.status(409).json({
                    success: false,
                    message: "Upload all required documents before submitting.",
                    missingDocuments: result.missingDocuments,
                    missingVerificationTypes: result.missingVerificationTypes,
                });
            case "SUCCESS":
                return res.status(200).json({
                    success: true,
                    message: "Your application has been submitted for review.",
                    application: result.application,
                });
        }
    }
    catch (error) {
        console.error("Helper application submission failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to submit your application. Please try again.",
        });
    }
});
/* ---------------------------------------------
  GET /api/admin/helper-applications
  Admin review queue, optionally filtered by ?status=
--------------------------------------------- */
app.get("/api/admin/helper-applications", requireAdmin, async (req, res) => {
    try {
        const statusSchema = zod_1.z.enum([
            "PENDING",
            "UNDER_REVIEW",
            "VERIFICATION_IN_PROGRESS",
            "ACTION_REQUIRED",
            "VERIFIED",
            "APPROVED",
            "REJECTED",
        ]);
        const parsedStatus = statusSchema.safeParse(req.query.status);
        if (req.query.status !== undefined && !parsedStatus.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid application status filter.",
                allowedStatuses: statusSchema.options,
            });
        }
        const status = parsedStatus.success ? parsedStatus.data : undefined;
        const applications = await prisma_js_1.prisma.helperApplication.findMany({
            where: status ? { status } : undefined,
            orderBy: [{ createdAt: "asc" }, { id: "asc" }],
            select: {
                id: true,
                fullName: true,
                phone: true,
                city: true,
                area: true,
                services: true,
                experience: true,
                availability: true,
                experienceDetails: true,
                status: true,
                rejectionReason: true,
                reviewedAt: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
                verifications: {
                    orderBy: { type: "asc" },
                    select: {
                        id: true,
                        type: true,
                        status: true,
                        evidenceRequired: true,
                        notes: true,
                        reviewedAt: true,
                        verifiedAt: true,
                        createdAt: true,
                        updatedAt: true,
                        documents: {
                            select: {
                                id: true,
                                documentType: true,
                                mimeType: true,
                                sizeBytes: true,
                                status: true,
                                reviewNotes: true,
                                reviewedAt: true,
                                createdAt: true,
                            },
                        },
                    },
                },
            },
        });
        return res.status(200).json({
            success: true,
            count: applications.length,
            applications,
        });
    }
    catch (error) {
        console.error("Fetching helper applications failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to load helper applications.",
        });
    }
});
app.get("/api/admin/dashboard/household-count", requireAdmin, async (req, res) => {
    try {
        const primaryAdminId = process.env.SUPER_ADMIN_CLERK_ID;
        if (!primaryAdminId) {
            console.error("SUPER_ADMIN_CLERK_ID is not configured in the server environment.");
            return res.status(500).json({
                success: false,
                message: "Primary administrator is not configured.",
            });
        }
        // Get the authenticated Clerk user ID using Clerk's helper.
        const { isAuthenticated, userId } = (0, express_2.getAuth)(req);
        if (!isAuthenticated || !userId) {
            return res.status(401).json({
                success: false,
                message: "Please sign in to access this statistic.",
            });
        }
        // Only the configured primary administrator can view this statistic.
        if (userId !== primaryAdminId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view this statistic.",
            });
        }
        // Count household accounts only, excluding helpers and administrators.
        const totalHouseholds = await prisma_js_1.prisma.user.count({
            where: {
                role: "USER",
            },
        });
        return res.status(200).json({
            success: true,
            totalHouseholds,
        });
    }
    catch (error) {
        console.error("Failed to fetch household count:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve household statistics.",
        });
    }
});
app.patch("/api/admin/helper-applications/:applicationId/verifications/:verificationId", requireAdmin, async (req, res) => {
    const paramsSchema = zod_1.z.object({
        applicationId: zod_1.z.string().min(1),
        verificationId: zod_1.z.string().min(1),
    });
    const parsedParams = paramsSchema.safeParse(req.params);
    if (!parsedParams.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid application or verification ID.",
        });
    }
    const validation = verificationUpdateSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid verification update.",
            errors: validation.error.flatten(),
        });
    }
    const { applicationId, verificationId } = parsedParams.data;
    const { status, notes } = validation.data;
    const { userId: clerkUserId } = (0, express_2.getAuth)(req);
    if (!clerkUserId) {
        return res.status(401).json({
            success: false,
            message: "Please sign in.",
        });
    }
    try {
        const result = await prisma_js_1.prisma.$transaction(async (tx) => {
            // Resolve the administrator's database ID.
            const admin = await tx.user.findUnique({
                where: { clerkId: clerkUserId },
                select: { id: true, role: true },
            });
            if (!admin || admin.role !== "ADMIN") {
                throw new Error("ADMIN_ACCESS_REVOKED");
            }
            // Confirm the verification belongs to this application.
            const verification = await tx.helperVerification.findFirst({
                where: {
                    id: verificationId,
                    applicationId,
                },
                select: {
                    id: true,
                    type: true,
                    status: true,
                    evidenceRequired: true,
                    application: {
                        select: {
                            id: true,
                            status: true,
                        },
                    },
                    documents: {
                        where: { status: "ACCEPTED" },
                        select: { id: true },
                        take: 1,
                    },
                },
            });
            if (!verification) {
                return { kind: "NOT_FOUND" };
            }
            // Terminal applications cannot have their verification records changed.
            if (verification.application.status === "APPROVED" ||
                verification.application.status === "REJECTED") {
                return { kind: "APPLICATION_CLOSED" };
            }
            // Do not allow an administrator to mark required evidence as passed
            // until an accepted supporting document exists.
            if (status === "PASSED" &&
                verification.evidenceRequired &&
                verification.documents.length === 0) {
                return { kind: "EVIDENCE_REQUIRED" };
            }
            // A passing check must include an audit explanation.
            if (status === "PASSED" && !notes?.trim()) {
                return { kind: "NOTES_REQUIRED" };
            }
            const now = new Date();
            const updatedVerification = await tx.helperVerification.update({
                where: { id: verification.id },
                data: {
                    status,
                    notes: notes ?? null,
                    reviewerId: admin.id,
                    reviewedAt: now,
                    verifiedAt: status === "PASSED" ? now : null,
                },
                select: {
                    id: true,
                    type: true,
                    status: true,
                    notes: true,
                    reviewerId: true,
                    reviewedAt: true,
                    verifiedAt: true,
                },
            });
            // Refresh the overall application status based on all six checks.
            const allVerifications = await tx.helperVerification.findMany({
                where: { applicationId },
                select: { type: true, status: true },
            });
            const requiredTypes = new Set(requiredVerificationTypes);
            const requiredChecks = allVerifications.filter((item) => requiredTypes.has(item.type));
            let applicationStatus;
            if (requiredChecks.some((item) => item.status === "ACTION_REQUIRED" ||
                item.status === "FAILED")) {
                applicationStatus = "ACTION_REQUIRED";
            }
            else if (requiredChecks.length === requiredVerificationTypes.length &&
                requiredChecks.every((item) => item.status === "PASSED")) {
                applicationStatus = "VERIFIED";
            }
            else if (requiredChecks.some((item) => item.status !== "PENDING")) {
                applicationStatus = "VERIFICATION_IN_PROGRESS";
            }
            else {
                applicationStatus = "PENDING";
            }
            await tx.helperApplication.update({
                where: { id: applicationId },
                data: { status: applicationStatus },
            });
            // Record the action in the audit log.
            await tx.adminAuditLog.create({
                data: {
                    actorId: admin.id,
                    applicationId,
                    action: "HELPER_VERIFICATION_UPDATED",
                    entityType: "HelperVerification",
                    entityId: verification.id,
                    metadata: {
                        verificationType: verification.type,
                        previousStatus: verification.status,
                        newStatus: status,
                    },
                },
            });
            return {
                kind: "SUCCESS",
                verification: updatedVerification,
                applicationStatus,
            };
        });
        switch (result.kind) {
            case "NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Application or verification record not found.",
                });
            case "APPLICATION_CLOSED":
                return res.status(409).json({
                    success: false,
                    message: "This application is already closed.",
                });
            case "EVIDENCE_REQUIRED":
                return res.status(409).json({
                    success: false,
                    message: "An accepted supporting document is required before this check can pass.",
                });
            case "NOTES_REQUIRED":
                return res.status(400).json({
                    success: false,
                    message: "Add review notes before marking a check as passed.",
                });
            case "SUCCESS":
                return res.status(200).json({
                    success: true,
                    message: "Verification updated successfully.",
                    verification: result.verification,
                    applicationStatus: result.applicationStatus,
                });
        }
    }
    catch (error) {
        if (error instanceof Error &&
            error.message === "ADMIN_ACCESS_REVOKED") {
            return res.status(403).json({
                success: false,
                message: "Administrator access is required.",
            });
        }
        console.error("Verification update failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update verification.",
        });
    }
});
// GET /api/admin/users
app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
        const users = await prisma_js_1.prisma.user.findMany({
            where: {
                role: {
                    in: ["USER", "HELPER"],
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true,
            },
        });
        return res.json({
            success: true,
            count: users.length,
            users,
        });
    }
    catch (error) {
        console.error("Admin users fetch error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
});
app.post("/api/helper-applications/:applicationId/verifications/:verificationId/documents", (req, res, next) => {
    const { isAuthenticated, userId } = (0, express_2.getAuth)(req);
    if (!isAuthenticated || !userId) {
        return res.status(401).json({
            success: false,
            message: "Please sign in to upload a document.",
        });
    }
    next();
}, (req, res, next) => {
    verificationUpload.single("document")(req, res, (error) => {
        if (error instanceof multer_1.default.MulterError) {
            const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
            return res.status(status).json({
                success: false,
                message: error.code === "LIMIT_FILE_SIZE"
                    ? "The document must not exceed 5 MB."
                    : "The upload request is invalid.",
            });
        }
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Unable to process the uploaded document.",
            });
        }
        next();
    });
}, async (req, res) => {
    const { isAuthenticated, userId } = (0, express_2.getAuth)(req);
    if (!isAuthenticated || !userId) {
        return res.status(401).json({
            success: false,
            message: "Please sign in to upload a document.",
        });
    }
    const paramsSchema = zod_1.z.object({
        applicationId: zod_1.z.string().min(1),
        verificationId: zod_1.z.string().min(1),
    });
    const parsedParams = paramsSchema.safeParse(req.params);
    if (!parsedParams.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid application or verification ID.",
        });
    }
    const bodySchema = zod_1.z
        .object({
        documentType: zod_1.z.string().trim().min(2).max(100),
    })
        .strict();
    const parsedBody = bodySchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid document type.",
            errors: parsedBody.error.flatten(),
        });
    }
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Please select a document to upload.",
        });
    }
    try {
        const validatedFile = await (0, validate_document_js_1.validateVerificationDocument)(req.file.buffer, req.file.mimetype);
        const user = await prisma_js_1.prisma.user.findUnique({
            where: { clerkId: userId },
            select: { id: true, role: true },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Your account could not be found.",
            });
        }
        if (user.role !== "USER") {
            return res.status(403).json({
                success: false,
                message: "Your account cannot upload helper application evidence.",
            });
        }
        const verification = await prisma_js_1.prisma.helperVerification.findFirst({
            where: {
                id: parsedParams.data.verificationId,
                applicationId: parsedParams.data.applicationId,
                application: {
                    userId: user.id,
                    status: {
                        notIn: ["APPROVED", "REJECTED"],
                    },
                },
            },
            select: {
                id: true,
                type: true,
                evidenceRequired: true,
            },
        });
        if (!verification) {
            return res.status(404).json({
                success: false,
                message: "The requested verification was not found.",
            });
        }
        if (!verification.evidenceRequired) {
            return res.status(400).json({
                success: false,
                message: "This verification does not require a document.",
            });
        }
        const allowedDocumentTypes = {
            IDENTITY: ["Identity Document"],
            ADDRESS: ["Address Proof"],
            BACKGROUND: ["Background Check Document"],
        };
        if (!allowedDocumentTypes[verification.type]?.includes(parsedBody.data.documentType)) {
            return res.status(400).json({
                success: false,
                message: "The document type does not match this verification.",
            });
        }
        const document = await (0, verification_document_service_js_1.uploadVerificationDocument)({
            verificationId: verification.id,
            uploadedById: user.id,
            documentType: parsedBody.data.documentType,
            mimeType: validatedFile.mimeType,
            sizeBytes: validatedFile.sizeBytes,
            buffer: req.file.buffer,
        });
        return res.status(201).json({
            success: true,
            message: "Verification document uploaded successfully.",
            document,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "INVALID_FILE_SIZE") {
                return res.status(413).json({
                    success: false,
                    message: "The document must not exceed 5 MB.",
                });
            }
            if (error.message === "UNSUPPORTED_FILE_TYPE") {
                return res.status(415).json({
                    success: false,
                    message: "Only valid PDF, JPEG, and PNG files are accepted.",
                });
            }
            if (error.message === "APPLICATION_CLOSED") {
                return res.status(409).json({
                    success: false,
                    message: "This application is already closed.",
                });
            }
        }
        console.error("Verification document upload failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to upload the verification document.",
        });
    }
});
app.get("/api/admin/dashboard/bookings", requireAdmin, async (_req, res) => {
    try {
        const [totalBookings, activeBookings, recentBookings] = await prisma_js_1.prisma.$transaction([
            prisma_js_1.prisma.booking.count(),
            prisma_js_1.prisma.booking.count({
                where: {
                    status: {
                        in: ["CONFIRMED", "IN_PROGRESS"],
                    },
                },
            }),
            prisma_js_1.prisma.booking.findMany({
                take: 5,
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    id: true,
                    serviceType: true,
                    planType: true,
                    assignmentType: true,
                    status: true,
                    startAt: true,
                    endAt: true,
                    address: true,
                    city: true,
                    area: true,
                    createdAt: true,
                    household: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                    helper: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            }),
        ]);
        return res.status(200).json({
            success: true,
            statistics: {
                totalBookings,
                activeBookings,
            },
            recentBookings,
        });
    }
    catch (error) {
        console.error("Fetching admin bookings failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to retrieve booking information.",
        });
    }
});
const validBookingStatuses = [
    "PENDING",
    "CONFIRMED",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
];
app.get("/api/admin/bookings", requireAdmin, async (req, res) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
        const search = typeof req.query.search === "string"
            ? req.query.search.trim()
            : "";
        const statusFilter = typeof req.query.status === "string"
            ? req.query.status
            : "";
        if (statusFilter &&
            !validBookingStatuses.includes(statusFilter)) {
            return res.status(400).json({
                success: false,
                message: "Invalid booking status.",
            });
        }
        const where = {
            ...(statusFilter && {
                status: statusFilter,
            }),
            ...(search && {
                OR: [
                    { id: { contains: search, mode: "insensitive" } },
                    { serviceType: { contains: search, mode: "insensitive" } },
                    { planType: { contains: search, mode: "insensitive" } },
                    { city: { contains: search, mode: "insensitive" } },
                    { area: { contains: search, mode: "insensitive" } },
                    {
                        household: {
                            OR: [
                                { firstName: { contains: search, mode: "insensitive" } },
                                { lastName: { contains: search, mode: "insensitive" } },
                                { email: { contains: search, mode: "insensitive" } },
                            ],
                        },
                    },
                    {
                        helper: {
                            OR: [
                                { firstName: { contains: search, mode: "insensitive" } },
                                { lastName: { contains: search, mode: "insensitive" } },
                                { email: { contains: search, mode: "insensitive" } },
                            ],
                        },
                    },
                ],
            }),
        };
        const [bookings, totalBookings, statusCounts] = await prisma_js_1.prisma.$transaction([
            prisma_js_1.prisma.booking.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    serviceType: true,
                    planType: true,
                    assignmentType: true,
                    status: true,
                    startAt: true,
                    endAt: true,
                    address: true,
                    city: true,
                    area: true,
                    createdAt: true,
                    household: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                    helper: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            }),
            prisma_js_1.prisma.booking.count({ where }),
            prisma_js_1.prisma.booking.groupBy({
                by: ["status"],
                _count: { status: true },
            }),
        ]);
        const statistics = {
            total: statusCounts.reduce((sum, item) => sum + item._count.status, 0),
            pending: 0,
            confirmed: 0,
            inProgress: 0,
            completed: 0,
            cancelled: 0,
        };
        for (const item of statusCounts) {
            switch (item.status) {
                case "PENDING":
                    statistics.pending = item._count.status;
                    break;
                case "CONFIRMED":
                    statistics.confirmed = item._count.status;
                    break;
                case "IN_PROGRESS":
                    statistics.inProgress = item._count.status;
                    break;
                case "COMPLETED":
                    statistics.completed = item._count.status;
                    break;
                case "CANCELLED":
                    statistics.cancelled = item._count.status;
                    break;
            }
        }
        return res.status(200).json({
            success: true,
            bookings,
            statistics,
            pagination: {
                page,
                limit,
                totalBookings,
                totalPages: Math.ceil(totalBookings / limit),
            },
        });
    }
    catch (error) {
        console.error("Admin bookings error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch bookings.",
        });
    }
});
// =============================================
// ADMIN COMPLAINT MANAGEMENT
// =============================================
const validComplaintCategories = [
    "SERVICE_ISSUE",
    "CONDUCT",
    "CANCELLATION",
    "ATTENDANCE",
    "COMMUNICATION",
    "PAYMENT",
    "OTHER",
];
app.get("/api/admin/complaints", requireAdmin, async (req, res) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
        const search = typeof req.query.search === "string"
            ? req.query.search.trim()
            : "";
        const validStatuses = [
            "OPEN",
            "UNDER_REVIEW",
            "RESOLVED",
            "CLOSED",
        ];
        const validPriorities = ["LOW", "MEDIUM", "HIGH"];
        const status = typeof req.query.status === "string" ? req.query.status : "";
        const priority = typeof req.query.priority === "string" ? req.query.priority : "";
        if (status &&
            !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid complaint status.",
            });
        }
        if (priority &&
            !validPriorities.includes(priority)) {
            return res.status(400).json({
                success: false,
                message: "Invalid complaint priority.",
            });
        }
        // `category` is an enum, so Prisma's `contains` filter can't be used on it.
        // Match the search text against category names in code instead.
        const normalizedSearch = search.toLowerCase().replace(/[\s_-]+/g, "");
        const matchingCategories = search
            ? validComplaintCategories.filter((category) => category
                .toLowerCase()
                .replace(/_/g, "")
                .includes(normalizedSearch))
            : [];
        // Allow searching by complaint number, e.g. "CMP-0012", "cmp0012" or "12".
        const complaintNumberMatch = search.match(/^(?:cmp[-\s]?)?(\d{1,9})$/i);
        const complaintNumber = complaintNumberMatch
            ? Number(complaintNumberMatch[1])
            : null;
        const where = {
            ...(status && {
                status: status,
            }),
            ...(priority && {
                priority: priority,
            }),
            ...(search && {
                OR: [
                    ...(complaintNumber !== null
                        ? [{ complaintNumber }]
                        : []),
                    {
                        subject: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        description: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    ...(matchingCategories.length > 0
                        ? [{ category: { in: [...matchingCategories] } }]
                        : []),
                    {
                        household: {
                            OR: [
                                {
                                    firstName: {
                                        contains: search,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    lastName: {
                                        contains: search,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    email: {
                                        contains: search,
                                        mode: "insensitive",
                                    },
                                },
                            ],
                        },
                    },
                    {
                        helper: {
                            is: {
                                OR: [
                                    {
                                        firstName: {
                                            contains: search,
                                            mode: "insensitive",
                                        },
                                    },
                                    {
                                        lastName: {
                                            contains: search,
                                            mode: "insensitive",
                                        },
                                    },
                                    {
                                        email: {
                                            contains: search,
                                            mode: "insensitive",
                                        },
                                    },
                                ],
                            },
                        },
                    },
                ],
            }),
        };
        const [complaints, totalComplaints, statusCounts, priorityCounts] = await prisma_js_1.prisma.$transaction([
            prisma_js_1.prisma.complaint.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    id: true,
                    complaintNumber: true,
                    subject: true,
                    description: true,
                    category: true,
                    priority: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    household: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                    helper: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                    booking: {
                        select: {
                            id: true,
                            serviceType: true,
                            status: true,
                        },
                    },
                },
            }),
            prisma_js_1.prisma.complaint.count({ where }),
            prisma_js_1.prisma.complaint.groupBy({
                by: ["status"],
                _count: {
                    _all: true,
                },
            }),
            prisma_js_1.prisma.complaint.groupBy({
                by: ["priority"],
                _count: {
                    _all: true,
                },
            }),
        ]);
        const statistics = {
            total: statusCounts.reduce((sum, item) => sum + item._count._all, 0),
            open: 0,
            underReview: 0,
            resolved: 0,
            closed: 0,
            highPriority: 0,
        };
        for (const item of statusCounts) {
            switch (item.status) {
                case "OPEN":
                    statistics.open = item._count._all;
                    break;
                case "UNDER_REVIEW":
                    statistics.underReview = item._count._all;
                    break;
                case "RESOLVED":
                    statistics.resolved = item._count._all;
                    break;
                case "CLOSED":
                    statistics.closed = item._count._all;
                    break;
            }
        }
        statistics.highPriority =
            priorityCounts.find((item) => item.priority === "HIGH")?._count._all ?? 0;
        return res.status(200).json({
            success: true,
            complaints: complaints.map((complaint) => ({
                ...complaint,
                complaintNumber: `CMP-${String(complaint.complaintNumber).padStart(4, "0")}`,
            })),
            statistics,
            pagination: {
                page,
                limit,
                totalComplaints,
                totalPages: Math.ceil(totalComplaints / limit),
            },
        });
    }
    catch (error) {
        console.error("Admin complaints fetch failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch complaints.",
        });
    }
});
app.get("/api/admin/complaints/:id", requireAdmin, async (req, res) => {
    try {
        const complaintId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const complaint = await prisma_js_1.prisma.complaint.findUnique({
            where: {
                id: complaintId,
            },
            include: {
                household: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
                helper: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
                reviewer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                booking: true,
                updates: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        actor: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                role: true,
                            },
                        },
                    },
                },
            },
        });
        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found.",
            });
        }
        return res.status(200).json({
            success: true,
            complaint: {
                ...complaint,
                complaintNumber: `CMP-${String(complaint.complaintNumber).padStart(4, "0")}`,
            },
        });
    }
    catch (error) {
        console.error("Complaint details fetch failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to retrieve complaint details.",
        });
    }
});
app.patch("/api/admin/complaints/:id/status", requireAdmin, async (req, res) => {
    const validation = complaintStatusSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid complaint status update.",
            errors: validation.error.flatten(),
        });
    }
    const { status, resolution } = validation.data;
    const { userId: clerkUserId } = (0, express_2.getAuth)(req);
    if (!clerkUserId) {
        return res.status(401).json({
            success: false,
            message: "Please sign in.",
        });
    }
    try {
        const result = await prisma_js_1.prisma.$transaction(async (tx) => {
            const admin = await tx.user.findUnique({
                where: {
                    clerkId: clerkUserId,
                },
                select: {
                    id: true,
                    role: true,
                },
            });
            if (!admin || admin.role !== "ADMIN") {
                throw new Error("ADMIN_ACCESS_REVOKED");
            }
            const complaintId = Array.isArray(req.params.id)
                ? req.params.id[0]
                : req.params.id;
            const complaint = await tx.complaint.findUnique({
                where: {
                    id: complaintId,
                },
                select: {
                    id: true,
                    status: true,
                    reviewerId: true,
                },
            });
            if (!complaint) {
                return { kind: "NOT_FOUND" };
            }
            if (complaint.status === "CLOSED") {
                return { kind: "ALREADY_CLOSED" };
            }
            if (status === "RESOLVED" &&
                !resolution?.trim()) {
                return { kind: "RESOLUTION_REQUIRED" };
            }
            if (complaint.status === status) {
                return { kind: "UNCHANGED" };
            }
            const now = new Date();
            const updated = await tx.complaint.update({
                where: {
                    id: complaint.id,
                },
                data: {
                    status,
                    reviewerId: admin.id,
                    ...(status === "RESOLVED"
                        ? {
                            resolution: resolution.trim(),
                            resolvedAt: now,
                            closedAt: null,
                        }
                        : status === "CLOSED"
                            ? {
                                closedAt: now,
                            }
                            : {
                                resolvedAt: null,
                                closedAt: null,
                            }),
                },
            });
            await tx.complaintUpdate.create({
                data: {
                    complaintId: complaint.id,
                    actorId: admin.id,
                    actorType: "ADMIN",
                    message: status === "RESOLVED"
                        ? `Complaint resolved: ${resolution.trim()}`
                        : `Complaint status changed from ${complaint.status} to ${status}.`,
                },
            });
            return {
                kind: "SUCCESS",
                complaint: updated,
            };
        });
        switch (result.kind) {
            case "NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Complaint not found.",
                });
            case "ALREADY_CLOSED":
                return res.status(409).json({
                    success: false,
                    message: "This complaint is already closed.",
                });
            case "RESOLUTION_REQUIRED":
                return res.status(400).json({
                    success: false,
                    message: "A resolution explanation is required.",
                });
            case "UNCHANGED":
                return res.status(200).json({
                    success: true,
                    message: "Complaint already has this status.",
                });
            case "SUCCESS":
                return res.status(200).json({
                    success: true,
                    message: "Complaint status updated successfully.",
                    complaint: result.complaint,
                });
        }
    }
    catch (error) {
        if (error instanceof Error &&
            error.message === "ADMIN_ACCESS_REVOKED") {
            return res.status(403).json({
                success: false,
                message: "Administrator access is required.",
            });
        }
        console.error("Complaint status update failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update complaint status.",
        });
    }
});
app.patch("/api/admin/complaints/:id/priority", requireAdmin, async (req, res) => {
    const validation = complaintPrioritySchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid complaint priority.",
            errors: validation.error.flatten(),
        });
    }
    const { priority } = validation.data;
    const { userId: clerkUserId } = (0, express_2.getAuth)(req);
    if (!clerkUserId) {
        return res.status(401).json({
            success: false,
            message: "Please sign in.",
        });
    }
    try {
        const result = await prisma_js_1.prisma.$transaction(async (tx) => {
            const admin = await tx.user.findUnique({
                where: {
                    clerkId: clerkUserId,
                },
                select: {
                    id: true,
                    role: true,
                },
            });
            if (!admin || admin.role !== "ADMIN") {
                throw new Error("ADMIN_ACCESS_REVOKED");
            }
            const complaintId = Array.isArray(req.params.id)
                ? req.params.id[0]
                : req.params.id;
            const complaint = await tx.complaint.findUnique({
                where: {
                    id: complaintId,
                },
                select: {
                    id: true,
                    priority: true,
                },
            });
            if (!complaint) {
                return { kind: "NOT_FOUND" };
            }
            if (complaint.priority === priority) {
                return { kind: "UNCHANGED" };
            }
            const updated = await tx.complaint.update({
                where: {
                    id: complaint.id,
                },
                data: {
                    priority,
                },
            });
            await tx.complaintUpdate.create({
                data: {
                    complaintId: complaint.id,
                    actorId: admin.id,
                    actorType: "ADMIN",
                    message: `Complaint priority changed from ${complaint.priority} to ${priority}.`,
                },
            });
            return {
                kind: "SUCCESS",
                complaint: updated,
            };
        });
        switch (result.kind) {
            case "NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Complaint not found.",
                });
            case "UNCHANGED":
                return res.status(200).json({
                    success: true,
                    message: "Complaint already has this priority.",
                });
            case "SUCCESS":
                return res.status(200).json({
                    success: true,
                    message: "Complaint priority updated successfully.",
                    complaint: result.complaint,
                });
        }
    }
    catch (error) {
        if (error instanceof Error &&
            error.message === "ADMIN_ACCESS_REVOKED") {
            return res.status(403).json({
                success: false,
                message: "Administrator access is required.",
            });
        }
        console.error("Complaint priority update failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update complaint priority.",
        });
    }
});
// =============================================
// USER DASHBOARD
// =============================================
app.get("/api/user/dashboard", async (req, res) => {
    const { isAuthenticated, userId } = (0, express_2.getAuth)(req);
    // Verify Clerk authentication
    if (!isAuthenticated || !userId) {
        return res.status(401).json({
            success: false,
            message: "Please sign in to access your dashboard.",
        });
    }
    try {
        // Find the authenticated household in the database
        const user = await prisma_js_1.prisma.user.findUnique({
            where: {
                clerkId: userId,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User account not found. Please synchronize your account.",
            });
        }
        // Only household users can access this dashboard
        if (user.role !== "USER") {
            return res.status(403).json({
                success: false,
                message: "Household account access is required.",
            });
        }
        const now = new Date();
        // Only bookings belonging to this household
        const householdFilter = {
            householdId: user.id,
        };
        // Fetch dashboard information
        const [upcoming, activeServices, completed, nextService, activeServicesList,] = await prisma_js_1.prisma.$transaction([
            // Upcoming bookings
            prisma_js_1.prisma.booking.count({
                where: {
                    ...householdFilter,
                    status: {
                        in: ["PENDING", "CONFIRMED"],
                    },
                    startAt: {
                        gte: now,
                    },
                },
            }),
            // Active bookings
            prisma_js_1.prisma.booking.count({
                where: {
                    ...householdFilter,
                    status: {
                        in: ["CONFIRMED", "IN_PROGRESS"],
                    },
                },
            }),
            // Completed bookings
            prisma_js_1.prisma.booking.count({
                where: {
                    ...householdFilter,
                    status: "COMPLETED",
                },
            }),
            // Next upcoming service
            prisma_js_1.prisma.booking.findFirst({
                where: {
                    ...householdFilter,
                    status: {
                        in: ["PENDING", "CONFIRMED"],
                    },
                    startAt: {
                        gte: now,
                    },
                },
                orderBy: {
                    startAt: "asc",
                },
                select: {
                    id: true,
                    serviceType: true,
                    planType: true,
                    status: true,
                    startAt: true,
                    endAt: true,
                    helper: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            }),
            // Active services list
            prisma_js_1.prisma.booking.findMany({
                where: {
                    ...householdFilter,
                    status: {
                        in: ["CONFIRMED", "IN_PROGRESS"],
                    },
                },
                orderBy: {
                    startAt: "asc",
                },
                select: {
                    id: true,
                    serviceType: true,
                    planType: true,
                    status: true,
                    startAt: true,
                    endAt: true,
                    helper: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            }),
        ]);
        return res.status(200).json({
            success: true,
            data: {
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                stats: {
                    upcoming,
                    activeServices,
                    completed,
                },
                nextService,
                activeServicesList,
            },
        });
    }
    catch (error) {
        console.error("User dashboard fetch failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to load dashboard information.",
        });
    }
});
app.get("/api/helpers/search", async (req, res) => {
    try {
        const service = String(req.query.service ?? "").trim();
        const city = String(req.query.city ?? "").trim();
        const area = String(req.query.area ?? "").trim();
        if (!service) {
            return res.status(400).json({
                success: false,
                message: "Service type is required.",
            });
        }
        const helpers = await prisma_js_1.prisma.helperApplication.findMany({
            where: {
                status: "APPROVED",
                services: {
                    has: service,
                },
                ...(city && {
                    city: {
                        contains: city,
                        mode: "insensitive",
                    },
                }),
                ...(area && {
                    area: {
                        contains: area,
                        mode: "insensitive",
                    },
                }),
            },
            select: {
                id: true,
                fullName: true,
                phone: true,
                city: true,
                area: true,
                services: true,
                experience: true,
                availability: true,
                experienceDetails: true,
            },
            orderBy: {
                experience: "desc",
            },
        });
        return res.status(200).json({
            success: true,
            count: helpers.length,
            helpers,
        });
    }
    catch (error) {
        console.error("Helper search failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to search for helpers.",
        });
    }
});
// =============================================
// HOUSEHOLD BOOKINGS
// =============================================
app.get("/api/bookings/me", async (req, res) => {
    const { isAuthenticated, userId } = (0, express_2.getAuth)(req);
    if (!isAuthenticated || !userId) {
        return res.status(401).json({
            success: false,
            message: "Please sign in to view your bookings.",
        });
    }
    try {
        // Find the authenticated household account.
        const user = await prisma_js_1.prisma.user.findUnique({
            where: {
                clerkId: userId,
            },
            select: {
                id: true,
                role: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User account not found. Please synchronize your account.",
            });
        }
        // Only household users can access their bookings.
        if (user.role !== "USER") {
            return res.status(403).json({
                success: false,
                message: "Household account access is required.",
            });
        }
        // Retrieve bookings belonging only to this household.
        const bookings = await prisma_js_1.prisma.booking.findMany({
            where: {
                householdId: user.id,
            },
            orderBy: {
                startAt: "desc",
            },
            select: {
                id: true,
                serviceType: true,
                planType: true,
                assignmentType: true,
                status: true,
                startAt: true,
                endAt: true,
                address: true,
                city: true,
                area: true,
                createdAt: true,
                helper: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        // Calculate booking statistics.
        const now = new Date();
        const statistics = {
            total: bookings.length,
            upcoming: bookings.filter((booking) => ["PENDING", "CONFIRMED"].includes(booking.status) &&
                booking.startAt >= now).length,
            pending: bookings.filter((booking) => booking.status === "PENDING").length,
            active: bookings.filter((booking) => ["CONFIRMED", "IN_PROGRESS"].includes(booking.status)).length,
            completed: bookings.filter((booking) => booking.status === "COMPLETED").length,
            cancelled: bookings.filter((booking) => booking.status === "CANCELLED").length,
        };
        return res.status(200).json({
            success: true,
            bookings,
            statistics,
        });
    }
    catch (error) {
        console.error("Fetching household bookings failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to retrieve your bookings.",
        });
    }
});
exports.default = app;
