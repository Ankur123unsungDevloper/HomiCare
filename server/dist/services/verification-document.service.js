"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVerificationDocument = uploadVerificationDocument;
const node_crypto_1 = require("node:crypto");
const node_stream_1 = require("node:stream");
const cloudinary_js_1 = require("../config/cloudinary.js");
const prisma_js_1 = require("../lib/prisma.js");
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = new Set([
    "application/pdf",
    "image/jpeg",
    "image/png",
]);
const MIME_TO_EXTENSION = {
    "application/pdf": "pdf",
    "image/jpeg": "jpg",
    "image/png": "png",
};
async function uploadVerificationDocument(input) {
    if (!ALLOWED_MIME_TYPES.has(input.mimeType)) {
        throw new Error("UNSUPPORTED_FILE_TYPE");
    }
    if (!Number.isInteger(input.sizeBytes) ||
        input.sizeBytes <= 0 ||
        input.sizeBytes > MAX_FILE_SIZE ||
        input.buffer.length !== input.sizeBytes) {
        throw new Error("INVALID_FILE_SIZE");
    }
    const verification = await prisma_js_1.prisma.helperVerification.findUnique({
        where: { id: input.verificationId },
        select: {
            id: true,
            type: true,
            evidenceRequired: true,
            application: {
                select: {
                    id: true,
                    userId: true,
                    status: true,
                },
            },
        },
    });
    if (!verification) {
        throw new Error("VERIFICATION_NOT_FOUND");
    }
    if (!verification.evidenceRequired) {
        throw new Error("EVIDENCE_NOT_REQUIRED");
    }
    if (verification.application.status === "APPROVED" ||
        verification.application.status === "REJECTED") {
        throw new Error("APPLICATION_CLOSED");
    }
    const extension = MIME_TO_EXTENSION[input.mimeType];
    const publicId = `homicare/${(0, node_crypto_1.randomUUID)()}`;
    const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary_js_1.cloudinary.uploader.upload_stream({
            public_id: publicId,
            resource_type: "raw",
            type: "authenticated",
            overwrite: false,
            format: extension,
            tags: ["homicare", "verification"],
        }, (error, result) => {
            if (error) {
                console.error("Cloudinary upload diagnostic:", {
                    message: error.message,
                    http_code: error.http_code,
                    name: error.name,
                    error: error,
                });
                reject(error);
                return;
            }
            if (!result) {
                reject(new Error("CLOUDINARY_UPLOAD_FAILED"));
                return;
            }
            resolve(result);
        });
        node_stream_1.Readable.from(input.buffer).pipe(uploadStream);
    });
    try {
        return await prisma_js_1.prisma.verificationDocument.create({
            data: {
                verificationId: verification.id,
                uploadedById: input.uploadedById,
                documentType: input.documentType,
                storageKey: uploadResult.public_id,
                mimeType: input.mimeType,
                sizeBytes: uploadResult.bytes,
            },
            select: {
                id: true,
                verificationId: true,
                documentType: true,
                mimeType: true,
                sizeBytes: true,
                status: true,
                createdAt: true,
            },
        });
    }
    catch (error) {
        try {
            await cloudinary_js_1.cloudinary.uploader.destroy(uploadResult.public_id, {
                resource_type: "raw",
                type: "authenticated",
                invalidate: true,
            });
        }
        catch (cleanupError) {
            console.error("Failed to clean up Cloudinary asset after database failure:", cleanupError);
        }
        throw error;
    }
}
