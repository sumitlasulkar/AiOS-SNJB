import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { email, imageBase64 } = await req.json();
    if (!email || !imageBase64) return NextResponse.json({ error: "Email and image data required" }, { status: 400 });

    // 1. Get Agent's Master Face Token from DB
    const userSnap = await adminDb.collection('users').where('email', '==', email).limit(1).get();
    if (userSnap.empty) return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    
    const faceToken = userSnap.docs[0].data().faceToken;
    if (!faceToken) return NextResponse.json({ error: "No Biometric profile found for this agent" }, { status: 400 });

    // 2. Compare with Face++
    const formData = new URLSearchParams();
    formData.append('api_key', process.env.FACEPP_API_KEY!);
    formData.append('api_secret', process.env.FACEPP_API_SECRET!);
    formData.append('face_token1', faceToken);
    formData.append('image_base64_2', imageBase64);

    const res = await fetch('https://api-us.faceplusplus.com/facepp/v3/compare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    });
    
    const result = await res.json();

    if (result.error_message) return NextResponse.json({ error: `Face++ Error: ${result.error_message}` }, { status: 400 });

    // 3. Confidence check (Minimum 80% match chahiye)
    if (result.confidence && result.confidence > 80) {
      return NextResponse.json({ success: true, confidence: result.confidence, agent: userSnap.docs[0].data() });
    } else {
      return NextResponse.json({ success: false, error: "Access Denied: Face mismatch!" });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}