import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) return NextResponse.json({ error: "Session ID required" }, { status: 400 });

    const docSnap = await adminDb.collection('qr_sessions').doc(sessionId).get();
    if (!docSnap.exists) return NextResponse.json({ error: "Invalid session" }, { status: 404 });

    const data = docSnap.data()!;
    
    if (new Date(data.expiresAt) < new Date()) {
      return NextResponse.json({ status: 'expired' });
    }

    // If mobile approved it, send success and the agent's details
    if (data.status === 'approved' && data.agentEmail) {
      const userSnap = await adminDb.collection('users').where('email', '==', data.agentEmail).limit(1).get();
      
      // Clean up session after successful login
      await adminDb.collection('qr_sessions').doc(sessionId).delete();
      
      return NextResponse.json({ 
        success: true, 
        status: 'approved', 
        agent: userSnap.docs[0]?.data() 
      });
    }

    // Still waiting
    return NextResponse.json({ success: true, status: data.status });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
