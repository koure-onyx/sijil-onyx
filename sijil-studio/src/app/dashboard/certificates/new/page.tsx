"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateCertificateForm } from "@/components/forms/certificate-forms";
import { useRouter } from "next/navigation";

export default function NewCertificatePage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Issue New Certificate</h1>
        <p className="text-muted-foreground">
          Create and issue a new blockchain certificate
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Certificate Details</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateCertificateForm onSuccess={() => router.push("/dashboard/certificates")} />
        </CardContent>
      </Card>
    </div>
  );
}
