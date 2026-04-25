import * as admin from 'firebase-admin';

// 1. Agar keys missing hain toh saaf error dikhao
if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY) {
  console.error("❌ CRITICAL ERROR: Firebase Admin keys are missing in .env.local!");
}

// 2. Sirf tab initialize karo jab pehle se na hua ho
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace \n properly so the key is read correctly
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log("🔥 Firebase Admin Initialized Successfully!");
  } catch (error) {
    console.error('❌ Firebase Admin Initialization Error:', error);
  }
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();

export { adminDb, adminAuth };
