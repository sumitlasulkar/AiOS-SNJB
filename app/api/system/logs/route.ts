import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// CORS ke liye OPTIONS method (Agar Electron ya kisi aur jagah se call aaye toh block na ho)
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// 🟢 THE RECEIVER: Python firewall jab data bhejega toh yahan aayega
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { agentEmail, action, target, ip, reason, timestamp } = body;

    console.log(`📥 [API] Log Received from ${agentEmail}: ${action} -> ${target}`);

    // Data ko direct Firebase ke "security_logs" table mein save kar rahe hain
    await adminDb.collection('security_logs').add({
      agentEmail: agentEmail || "Unknown Agent",
      action: action || "UNKNOWN_ACTION",
      target: target || "Unknown Target",
      ip: ip || "Local",
      reason: reason || "No details provided",
      timestamp: timestamp || Date.now()
    });

    return NextResponse.json(
      { success: true, message: "Log saved to database" }, 
      { 
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*' } 
      }
    );
  } catch (error) {
    console.error("❌ [API] Error saving log to Firebase:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}