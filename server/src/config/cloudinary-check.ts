import { cloudinary } from "./cloudinary.js";

async function checkCloudinary() {
  try {
    const result = await cloudinary.api.ping();

    console.log("Cloudinary connection successful:", result);
  } catch (error) {
    console.error("Cloudinary connection failed:", error);
    process.exitCode = 1;
  }
}

checkCloudinary();
