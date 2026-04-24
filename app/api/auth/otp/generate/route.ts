import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { sendOtpEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    // 1. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 2. Set Expiry (5 minutes from now)
    const expiresAt = new Date(Date.now() + 5 * 60000);

    // 3. Save to Firestore
    await adminDb.collection('otp_requests').doc(email).set({
      otp: otp,
      expiresAt: expiresAt.toISOString(),
      attempts: 0
    });

    // 4. Send Email
    await sendOtpEmail(email, otp);

    return NextResponse.json({ success: true, message: "OTP Sent Successfully" });
  } catch (error: any) {
    console.error("OTP Generation Error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}