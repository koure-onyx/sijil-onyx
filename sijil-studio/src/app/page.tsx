'use client';

import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Zap, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { useCertificates } from "@/hooks/use-certificates";
import { SkeletonCard } from "@/components/ui/skeleton";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorBoundaryWrapper } from "@/components/error-boundary";

function CertificateStats() {
  const { data, isLoading, error } = useCertificates({ limit: 1 });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <SkeletonCard />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-muted-foreground">
        <p>Unable to load statistics</p>
      </div>
    );
  }

  const totalCertificates = data?.pagination?.total ?? 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div>
        <p className="font-bold text-3xl md:text-4xl">{totalCertificates > 0 ? totalCertificates.toLocaleString() : '10K+'}</p>
        <p className="text-muted-foreground text-sm">Certificates Issued</p>
      </div>
      <div>
        <p className="font-bold text-3xl md:text-4xl">500+</p>
        <p className="text-muted-foreground text-sm">Organizations</p>
      </div>
      <div>
        <p className="font-bold text-3xl md:text-4xl">99.9%</p>
        <p className="text-muted-foreground text-sm">Uptime</p>
      </div>
      <div>
        <p className="font-bold text-3xl md:text-4xl">24/7</p>
        <p className="text-muted-foreground text-sm">Support</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ErrorBoundaryWrapper>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="container py-24 md:py-32 lg:py-40">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Digital Certificates Made{" "}
              <span className="text-primary">Simple & Secure</span>
            </h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              {siteConfig.description} Issue, verify, and manage digital credentials
              with blockchain-backed security and instant verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" className="text-base px-8">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-16 md:py-24 bg-muted/50 rounded-3xl">
          <div className="mx-auto max-w-[980px]">
            <div className="text-center mb-12">
              <h2 className="font-bold text-3xl md:text-4xl mb-4">
                Why Choose SIJIL?
              </h2>
              <p className="text-muted-foreground text-lg max-w-[700px] mx-auto">
                Built for modern organizations that need secure, verifiable, and
                scalable certificate management.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-2xl border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Secure & Verified</h3>
                <p className="text-muted-foreground">
                  Blockchain-backed verification ensures your certificates are
                  tamper-proof and instantly verifiable.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-2xl border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Instant Issuance</h3>
                <p className="text-muted-foreground">
                  Create and issue certificates in seconds with our intuitive
                  dashboard and API integrations.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-2xl border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Global Recognition</h3>
                <p className="text-muted-foreground">
                  Certificates that are recognized and trusted worldwide with
                  multi-language support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-[700px] text-center">
            <h2 className="font-bold text-3xl md:text-4xl mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of organizations already using SIJIL to issue and
              manage digital certificates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>

        {/* Trust Indicators with Live Data */}
        <section className="container py-16 border-t">
          <div className="mx-auto max-w-[980px]">
            <ErrorBoundaryWrapper
              fallback={
                <div className="text-center text-muted-foreground">
                  <p>Loading statistics...</p>
                </div>
              }
            >
              <CertificateStats />
            </ErrorBoundaryWrapper>
          </div>
        </section>
      </div>
    </ErrorBoundaryWrapper>
  );
}
