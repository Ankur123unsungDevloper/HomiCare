"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorpay = void 0;
exports.createRegistrationOrder = createRegistrationOrder;
const razorpay_1 = __importDefault(require("razorpay"));
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;
if (!keyId || !keySecret) {
    throw new Error("Razorpay configuration is missing. Check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server/.env.");
}
exports.razorpay = new razorpay_1.default({
    key_id: keyId,
    key_secret: keySecret,
});
async function createRegistrationOrder(applicationId) {
    return exports.razorpay.orders.create({
        amount: 19900, // ₹199 in paise
        currency: "INR",
        receipt: `hc_${applicationId.slice(0, 20)}`,
        notes: {
            applicationId,
            purpose: "HELPER_REGISTRATION",
        },
    });
}
