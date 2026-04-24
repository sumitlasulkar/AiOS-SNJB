"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase-client";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { ShieldCheck, XCircle } from "lucide-react";
import { useParams } from "next/navigation";

export default function MobileAuth() {
  const params = useParams();
  const sessionId = params.sessionId as string;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("loading"); // loading, valid, expired, approved, error

  useEffect(() => {
    // 1. Check karo ki QR code expire toh nahi ho gaya
    const checkSession = async () => {
      try {
        const docRef = doc(db, "qr_sessions", sessionId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setStatus("error");
          return;
        }

        const data = docSnap.data();
        if (new Date(data.expiresAt) < new Date()) {
          setStatus("expired");
        } else if (data.status === "approved") {
          setStatus("approved");
        } else {
          setStatus("valid");
        }
      } catch (error) {
        setStatus("error");
      }
    };
    checkSession();
  }, [sessionId]);

  const handleApprove = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("approving");
    try {
      // 2. Firebase me status update karo taaki Desktop app unlock ho jaye
      const docRef = doc(db, "qr_sessions", sessionId);
      await updateDoc(docRef, {
        status: "approved",
        agentEmail: email
      });
      setStatus("approved");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "loading") return <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">Scanning Session...</div>;
  if (status === "expired") return <div className="min-h-screen bg-slate-950 text-red-500 flex flex-col justify-center items-center"><XCircle size={64}/> <h1 className="text-2xl mt-4">Session Expired</h1></div>;
  if (status === "error") return <div className="min-h-screen bg-slate-950 text-red-500 flex flex-col justify-center items-center"><XCircle size={64}/> <h1 className="text-2xl mt-4">Invalid QR Code</h1></div>;
  
  if (status === "approved") return (
    <div className="min-h-screen bg-slate-950 text-emerald-500 flex flex-col justify-center items-center text-center p-6">
      <ShieldCheck size={80}/> 
      <h1 className="text-3xl mt-4 font-black tracking-tighter">ACCESS GRANTED!</h1>
      <p className="text-slate-400 mt-2">Desktop system is unlocking. You can close this window.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white font-mono">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl w-full max-w-md shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <ShieldCheck size={48} className="text-emerald-500 mb-2" />
          <h1 className="text-2xl font-bold text-center tracking-tighter">AIOS MOBILE AUTH</h1>
          <p className="text-slate-400 text-sm mt-2 text-center">Enter your Agent Email to approve desktop access.</p>
        </div>

        <form onSubmit={handleApprove} className="space-y-4">
          <input
            type="email"
            placeholder="agent@aios.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded bg-black border border-slate-700 text-white outline-none focus:border-emerald-500 text-center tracking-wider"
          />
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded transition-colors"
          >
            AUTHORIZE DESKTOP
          </button>
        </form>
      </div>
    </div>
  );
}