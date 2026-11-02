import { fileTypeFromBuffer } from "file-type";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
} as const;

export async function validateVerificationDocument(
  buffer: Buffer,
  declaredMimeType: string,
) {
  if (buffer.length === 0 || buffer.length > MAX_FILE_SIZE) {
    throw new Error("INVALID_FILE_SIZE");
  }

  const detected = await fileTypeFromBuffer(buffer);

  if (!detected) {
    throw new Error("UNSUPPORTED_FILE_TYPE");
  }

  const expectedExtension =
    ALLOWED_TYPES[detected.mime as keyof typeof ALLOWED_TYPES];

  if (
    !expectedExtension ||
    detected.mime !== declaredMimeType ||
    detected.ext !== expectedExtension
  ) {
    throw new Error("UNSUPPORTED_FILE_TYPE");
  }

  return {
    mimeType: detected.mime,
    sizeBytes: buffer.length,
  };
}
  