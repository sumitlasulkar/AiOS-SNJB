import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) return NextResponse.json({ error: "Email and OTP required" }, { status: 400 });

    const docRef = adminDb.collection('otp_requests').doc(email);
    const doc = await docRef.get();

    if (!doc.exists) return NextResponse.json({ error: "No OTP requested for this email" }, { status: 400 });

    const data = doc.data()!;
    
    // Check Expiry
    if (new Date(data.expiresAt) < new Date()) {
      await docRef.delete();
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    // Check Attempts Limit
    if (data.attempts >= 3) {
      await docRef.delete();
      return NextResponse.json({ error: "Too many failed attempts." }, { status: 403 });
    }

    // Verify
    if (data.otp !== otp) {
      await docRef.update({ attempts: data.attempts + 1 });
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Success! Fetch Agent Details
    const userSnap = await adminDb.collection('users').where('email', '==', email).limit(1).get();
    if (userSnap.empty) return NextResponse.json({ error: "Agent not found in database." }, { status: 404 });

    await docRef.delete(); // Clean up DB

    return NextResponse.json({ 
      success: true, 
      agent: userSnap.docs[0].data() 
    });

  } catch (error: any) {
    console.error("OTP Verification Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}