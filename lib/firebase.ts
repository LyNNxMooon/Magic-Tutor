import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY as string);

if (!serviceAccount) {
  throw new Error("SERVICE ACCOUNT KEY NOT SET");
}

// Initialize Firebase Admin if it hasn't been initialized yet
function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }
}

initializeFirebaseAdmin();

export const db = getFirestore();