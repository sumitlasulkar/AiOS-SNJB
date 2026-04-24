import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// 🔴 GET: Python Engine & Extension call this to fetch latest blocklist
export async function GET() {
  try {
    const docRef = adminDb.collection('system').doc('policies');
    const doc = await docRef.get();

    if (!doc.exists) {
      // Agar pehli baar chal raha hai toh khali list bhej do
      return NextResponse.json({ websites: [], apps: [], updatedAt: new Date().toISOString() });
    }

    return NextResponse.json(doc.data());
  } catch (error: any) {
    console.error("Policy Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch policies" }, { status: 500 });
  }
}

// 🟢 POST: Admin UI calls this to update the blocklist
export async function POST(req: Request) {
  try {
    const { websites, apps } = await req.json();

    if (!Array.isArray(websites) || !Array.isArray(apps)) {
      return NextResponse.json({ success: false, error: "Data format galat hai." }, { status: 400 });
    }

    // System collection mein 'policies' document ko update karo
    await adminDb.collection('system').doc('policies').set({
      websites: websites,
      apps: apps,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, message: "System Policies Update ho gayi hain!" });

  } catch (error: any) {
    console.error("Policy Update Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}