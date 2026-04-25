/*import * as admin from 'firebase-admin';

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
*/
import * as admin from 'firebase-admin';

// 🚨 VERCEL BYPASS: Hardcoding credentials for presentation to avoid PEM errors
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: "snjb-81ef7",
        clientEmail: "firebase-adminsdk-fbsvc@snjb-81ef7.iam.gserviceaccount.com",
        // Exact formatting with \n preserved
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCpimc8dtNaE+yJ\n0bp/qEgTkr5bpoIgWUv2f5U7iks3u46j/9x1KgWdwmIEkvjEygq2dBp92R+A7H6f\nHdSN6lgZAn9aIVx/thq6rT8W5ZhOOBXReuvTuxIRK/GxdMzk7s4NYt8WacJvg9JY\nxFUd7fYncjp8UHSK5TSAiaCCZA3ZkLj5mx0lBfNyAWAIPTSsBg7XfWRUw/V2MA0/\nlPv/xeaYGNXBNqmwHcANbzZU+uvqtGpl9jFwuSlFLHHhm8mbAMm2Kb0B3fU5iJB9\n7cB2F6Rw6wEt2E2dez+EoSw0Keeak2S0r0RhlC2fRjHejuXSvuFNUqYRAv9dpCGN\n/Z5s8l3PAgMBAAECggEAAiXbrRN7MlLlEqcGDeXct+bDTklizPuPTDKNekhZhQvY\n+Zuym7INwn6ecSsruRkvSh10/ugqAS1ogXtw/N/zABvkC+yo1Lp7m6bV5oC/zX83\nZxoN18wipUthSKndw1QP2P/mnKIGQ04wLDC5A46ORdg3r1sqsXqryMY1lmv429Xp\nNGqG34aBEsLXkO2Ir3UHCCChAn1tH/FFHVWqGVUrDlPnutrutnrrA5CRyL/db72C\nsdFXG5Dr71RzIfLhcbXoFY+D6hK+TIpvUk1TQMA28IkNB4c/bUAp2Plkd8HC2bui\nUvli94G5zL6JK8pfju1uoCMrKi4eQVl7OG22TuK+gQKBgQDRZEZ5tJp3mY8y3NMU\n8mavn0ArTDfmLdDFYH50T0rI8lhilhmLrxIg1nRUPVvAw32Kg4SD2VVbwYvnXC4x\nlz2KMtwBA0GMHyGN6N3eJ4HOW5rm94xFfaFvwMCiLh7CvN4GiBWLffMUGSa/5bXo\n2FwQ/RV6Xt40Wt3tHRyitgZ5gQKBgQDPR02Pd5nFfSwIew2J2E3oWEGICDloq6cf\nDcy49GKsECwKGgCyEF7FLdMEoTYJ/gjINpLCzzSt5rjx7cs9STejO9NwCEZXEFgD\nTBRa4AHmFzv9UxMf1QTCWDZ+4K6cmlfOY+pEHb3Z6g40bZJBfSfE6wQNsok+N20B\n2eLc79xfTwKBgGSJnBkVsVEZpxsJ0kPte4Z5lUr0xqY7e1E52p2n8MV5Lxzu6wcZ\noT+pGKPV7jco5h9atIbGFGkBDlag+QEQmBjCAMZvtMo9rFPB6r2fBIF7lG2vkGdR\nQfExgIyeTmC8ZHKIZqfaaptM1EExX12UfOgfTG+8Gz7SHlqaLsSlV4iBAoGAYng/\nMm7hEF78sjKzJc8qg7yZtSQjEcSqKiiGHz+KOK+eHFZqCi2YuBei7cogP/L8/RBf\n/EgvgIXhSp1rNfw4gEWFlu13bRkIlthnuxw8CrDzAM+cgDzUe/coPHJEwYTZPeVd\nf2qZrJJymRmMp6vrXrM/Q7qTVIlEMeLu0YLpsCUCgYB03EVBHTePak4cthyUrY3b\nqfKdiJI0CYQF6ZcjhDQgloRYmUpCgjKvRRSuAETB/8YOT72gHgjv+glG/uC1W3Rj\nFV+1jIec4xwK5dTyWMlPRGgJ/tr3D69YRnhmxaD8e8N9hF78r0tqH8vwUe2pVUMS\nXcvVlVex11hnYLi92Vnwbw==\n-----END PRIVATE KEY-----\n"
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