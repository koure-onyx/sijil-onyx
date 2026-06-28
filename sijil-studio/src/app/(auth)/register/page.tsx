"use client";

import { RegisterForm } from "@/components/forms/auth-forms";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">SIJIL</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your account
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold">Get Started</h2>
            <p className="text-sm text-muted-foreground">
              Join the blockchain certificate platform
            </p>
          </div>
          <RegisterForm />
        </div>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
