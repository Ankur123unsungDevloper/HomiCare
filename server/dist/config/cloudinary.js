"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = void 0;
require("dotenv/config");
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary configuration is incomplete. Check the server environment variables.");
}
cloudinary_1.v2.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
});
console.log("Cloudinary credentials loaded:", {
    cloudNamePresent: Boolean(cloudName),
    apiKeyPresent: Boolean(apiKey),
    apiSecretPresent: Boolean(apiSecret),
});
