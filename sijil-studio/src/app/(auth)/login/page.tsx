"use client";

import { useState } from "react";
import { LoginForm, RegisterForm } from "@/components/forms/auth-forms";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">SIJIL</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Blockchain Certificate Management
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          {isLogin ? (
            <>
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-semibold">Welcome back</h2>
                <p className="text-sm text-muted-foreground">
                  Sign in to your account
                </p>
              </div>
              <LoginForm />
              <p className="mt-6 text-center text-sm">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            </>
          ) : (
            <>
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-semibold">Create an account</h2>
                <p className="text-sm text-muted-foreground">
                  Get started with SIJIL
                </p>
              </div>
              <RegisterForm />
              <p className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
