"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVerificationDocument = validateVerificationDocument;
const file_type_1 = require("file-type");
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = {
    "application/pdf": "pdf",
    "image/jpeg": "jpg",
    "image/png": "png",
};
async function validateVerificationDocument(buffer, declaredMimeType) {
    if (buffer.length === 0 || buffer.length > MAX_FILE_SIZE) {
        throw new Error("INVALID_FILE_SIZE");
    }
    const detected = await (0, file_type_1.fileTypeFromBuffer)(buffer);
    if (!detected) {
        throw new Error("UNSUPPORTED_FILE_TYPE");
    }
    const expectedExtension = ALLOWED_TYPES[detected.mime];
    if (!expectedExtension ||
        detected.mime !== declaredMimeType ||
        detected.ext !== expectedExtension) {
        throw new Error("UNSUPPORTED_FILE_TYPE");
    }
    return {
        mimeType: detected.mime,
        sizeBytes: buffer.length,
    };
}
