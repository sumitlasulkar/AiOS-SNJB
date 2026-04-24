import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import crypto from 'crypto';

export async function GET() {
  try {
    // Generate a secure random session ID
    const sessionId = crypto.randomUUID();
    
    // Set expiry for the QR code (3 minutes)
    const expiresAt = new Date(Date.now() + 3 * 60000);

    // Save to Firestore
    await adminDb.collection('qr_sessions').doc(sessionId).set({
      status: 'pending',
      expiresAt: expiresAt.toISOString(),
      agentEmail: null // Mobile app se approve hone par ye update hoga
    });

    return NextResponse.json({ success: true, sessionId: sessionId });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to generate QR session" }, { status: 500 });
  }
}
