import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  try {
    // Firestore se live policies uthao
    const docRef = adminDb.collection("system_config").doc("blocklists");
    const docSnap = await docRef.get();
    
    let blockedList: string[] = [];
    if (docSnap.exists) {
      blockedList = docSnap.data()?.websites || [];
    }

    console.log(`📡 [API] Live Blocklist sent to Agent: ${email}`);

    return NextResponse.json(
      { success: true, email: email, blockedList: blockedList },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error("API Error fetching blocklist:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}