"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCertificates } from "@/hooks/use-certificates";
import { RevokeCertificateDialog } from "@/components/forms/certificate-forms";
import { Skeleton } from "@/components/ui/skeleton";

export default function CertificatesPage() {
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
  });
  const [revokeId, setRevokeId] = useState<string | null>(null);
  const [revokeOpen, setRevokeOpen] = useState(false);

  const { data: certificates, isLoading, pagination } = useCertificates({
    limit: 10,
    status: filters.status !== "all" ? filters.status as any : undefined,
  });

  const handleRevoke = (id: string) => {
    setRevokeId(id);
    setRevokeOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
          <p className="text-muted-foreground">
            Manage and track all issued certificates
          </p>
        </div>
        <Link href="/dashboard/certificates/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Issue New
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search certificates..."
                className="pl-10"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters({ ...filters, status: value })}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted/50">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Recipient</th>
                    <th className="px-6 py-3">Issuer</th>
                    <th className="px-6 py-3">Issue Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates?.map((cert) => (
                    <tr key={cert.id} className="bg-background border-b hover:bg-muted/50">
                      <td className="px-6 py-4 font-medium">{cert.id.slice(0, 8)}...</td>
                      <td className="px-6 py-4">{cert.recipientName || "Unknown"}</td>
                      <td className="px-6 py-4">{cert.issuerName || "Unknown"}</td>
                      <td className="px-6 py-4">
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            cert.status === "active"
                              ? "bg-green-100 text-green-800"
                              : cert.status === "revoked"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {cert.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/certificates/${cert.id}`}
                            className="text-primary hover:underline"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRevoke(cert.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!isLoading && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {certificates?.length || 0} of {pagination?.total || 0} certificates
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={!pagination?.hasPrev}>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled={!pagination?.hasNext}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {revokeId && (
        <RevokeCertificateDialog
          certificateId={revokeId}
          open={revokeOpen}
          onOpenChange={setRevokeOpen}
        />
      )}
    </div>
  );
}
