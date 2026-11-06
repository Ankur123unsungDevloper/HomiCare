"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAdminAuth = void 0;
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const node_fs_1 = require("node:fs");
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
if (!serviceAccountPath) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_PATH is missing from the server environment.");
}
const serviceAccount = JSON.parse((0, node_fs_1.readFileSync)(serviceAccountPath, "utf8"));
const firebaseAdminApp = (0, app_1.getApps)().length
    ? (0, app_1.getApp)()
    : (0, app_1.initializeApp)({
        credential: (0, app_1.cert)(serviceAccount),
    });
exports.firebaseAdminAuth = (0, auth_1.getAuth)(firebaseAdminApp);
