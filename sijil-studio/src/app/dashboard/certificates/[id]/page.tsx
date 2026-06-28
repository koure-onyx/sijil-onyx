"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Trash2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useCertificate } from "@/hooks/use-certificates";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { RevokeCertificateDialog } from "@/components/forms/certificate-forms";
import { useState } from "react";

export default function CertificateDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [revokeOpen, setRevokeOpen] = useState(false);

  const { data: certificate, isLoading } = useCertificate(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold">Certificate not found</h2>
        <p className="text-muted-foreground mt-2">
          The certificate you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/dashboard/certificates">
          <Button className="mt-4">Back to Certificates</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/certificates">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Certificate Details</h1>
            <p className="text-muted-foreground">{certificate.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => setRevokeOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Revoke
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Certificate Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge
                variant={
                  certificate.status === "active"
                    ? "default"
                    : certificate.status === "revoked"
                      ? "destructive"
                      : "secondary"
                }
              >
                {certificate.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Issue Date</p>
              <p className="font-medium">
                {new Date(certificate.issueDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expiry Date</p>
              <p className="font-medium">
                {new Date(certificate.expiryDate).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Parties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Issuer</p>
              <p className="font-medium">{certificate.issuerName || "Unknown"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Recipient</p>
              <p className="font-medium">{certificate.recipientName || "Unknown"}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Blockchain Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Transaction Hash</p>
              <p className="font-mono text-sm break-all bg-muted p-2 rounded mt-1">
                {certificate.blockchainHash || "Not yet recorded on blockchain"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Verification URL</p>
              <a
                href="#"
                className="text-primary hover:underline text-sm"
              >
                View on Blockchain Explorer
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <RevokeCertificateDialog
        certificateId={certificate.id}
        open={revokeOpen}
        onOpenChange={setRevokeOpen}
      />
    </div>
  );
}
