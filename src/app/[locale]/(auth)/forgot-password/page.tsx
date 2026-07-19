"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to process request");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mb-4">
          <CheckCircle2 className="h-6 w-6 text-emerald-600" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">Check your email</h2>
        <p className="text-sm text-slate-600 mb-6">
          We've sent a password reset link to <span className="font-medium text-slate-900">{email}</span>.
        </p>
        <Link
          href={`/${locale}/login`}
          className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
        >
          Return to login
        </Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 mb-2">
        Reset your password
      </h2>
      <p className="text-center text-sm text-slate-600 mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700">Email address</label>
          <div className="mt-1">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2.5 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send reset link"}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center text-sm">
        <Link
          href={`/${locale}/login`}
          className="font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          &larr; Back to login
        </Link>
      </div>
    </>
  );
}
