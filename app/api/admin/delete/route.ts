import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Email dena zaroori hai!" }, { status: 400 });
    }

    // 1. Database se user dhundho
    const usersRef = adminDb.collection('users');
    const snapshot = await usersRef.where('email', '==', email).limit(1).get();

    if (snapshot.empty) {
      return NextResponse.json({ success: false, error: "System mein ye agent nahi mila!" }, { status: 404 });
    }

    const doc = snapshot.docs[0];
    const uid = doc.id;

    // 2. Firebase Auth (Logins) se delete karo
    await adminAuth.deleteUser(uid);

    // 3. Firestore Database se details delete karo
    await usersRef.doc(uid).delete();

    return NextResponse.json({ success: true, message: `Agent ${email} successfully terminated.` });

  } catch (error: any) {
    console.error("Delete Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}