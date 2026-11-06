"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_js_1 = require("./cloudinary.js");
async function checkCloudinary() {
    try {
        const result = await cloudinary_js_1.cloudinary.api.ping();
        console.log("Cloudinary connection successful:", result);
    }
    catch (error) {
        console.error("Cloudinary connection failed:", error);
        process.exitCode = 1;
    }
}
checkCloudinary();
