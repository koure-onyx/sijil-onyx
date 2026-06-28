"use client";

import { PasswordResetForm } from "@/components/forms/auth-forms";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">SIJIL</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Reset your password
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold">Forgot Password?</h2>
            <p className="text-sm text-muted-foreground">
              Enter your email to receive reset instructions
            </p>
          </div>
          <PasswordResetForm />
        </div>

        <p className="text-center text-sm">
          Remember your password?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
