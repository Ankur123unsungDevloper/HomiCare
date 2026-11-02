import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error(
    "Cloudinary configuration is incomplete. Check the server environment variables.",
  );
}

cloudinary.config({
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

export { cloudinary };