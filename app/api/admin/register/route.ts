import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { email, password, username, imageBase64 } = await req.json();

    if (!email || !password || !username || !imageBase64) {
      return NextResponse.json({ success: false, error: "Saari details aur photo zaroori hai!" }, { status: 400 });
    }

    // 🔴 1. Face++ API Call (Get Face Token)
    const formData = new URLSearchParams();
    formData.append('api_key', process.env.FACEPP_API_KEY!);
    formData.append('api_secret', process.env.FACEPP_API_SECRET!);
    formData.append('image_base64', imageBase64);
    formData.append('return_attributes', 'none');

    const faceRes = await fetch('https://api-us.faceplusplus.com/facepp/v3/detect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    });

    const faceData = await faceRes.json();

    if (faceData.error_message) {
      return NextResponse.json({ success: false, error: `Face++ Error: ${faceData.error_message}` }, { status: 400 });
    }

    if (!faceData.faces || faceData.faces.length === 0) {
      return NextResponse.json({ success: false, error: "Chehra detect nahi hua. Camera mein theek se dekho." }, { status: 400 });
    }

    const faceToken = faceData.faces[0].face_token; // 🧠 The Real Biometric Key

    // 🟢 2. Create Asli Firebase Auth User
    const userRecord = await adminAuth.createUser({
      email: email,
      password: password,
      displayName: username,
    });

    // 🟢 3. Save details to 'users' collection in Firestore
    await adminDb.collection('users').doc(userRecord.uid).set({
      email: email,
      username: username,
      role: "agent",
      faceToken: faceToken, 
      status: "active",
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, message: "Master Agent 100% securely registered!" });

  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}