import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "node:fs";

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath) {
throw new Error(
"FIREBASE_SERVICE_ACCOUNT_PATH is missing from the server environment.",
);
}

const serviceAccount = JSON.parse(
readFileSync(serviceAccountPath, "utf8"),
);

const firebaseAdminApp = getApps().length
? getApp()
: initializeApp({
credential: cert(serviceAccount),
});

export const firebaseAdminAuth = getAuth(firebaseAdminApp);
