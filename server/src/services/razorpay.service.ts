import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  throw new Error(
    "Razorpay configuration is missing. Check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server/.env.",
  );
}

export const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export async function createRegistrationOrder(applicationId: string) {
  return razorpay.orders.create({
    amount: 19900, // ₹199 in paise
    currency: "INR",
    receipt: `hc_${applicationId.slice(0, 20)}`,
    notes: {
      applicationId,
      purpose: "HELPER_REGISTRATION",
    },
  });
}