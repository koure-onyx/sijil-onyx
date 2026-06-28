"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { useCertificates } from "@/hooks/use-certificates";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data: certificates, isLoading } = useCertificates({ limit: 5 });

  const stats = [
    {
      name: "Total Certificates",
      value: "128",
      change: "+12%",
      icon: FileText,
    },
    {
      name: "Active Certificates",
      value: "96",
      change: "+4%",
      icon: CheckCircle,
    },
    {
      name: "Pending Verifications",
      value: "8",
      change: "-2",
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your certificates.
          </p>
        </div>
        <Link href="/dashboard/certificates/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Issue Certificate
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Certificates */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Certificates</CardTitle>
          <CardDescription>
            The latest certificates issued in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
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
                        <Link
                          href={`/dashboard/certificates/${cert.id}`}
                          className="text-primary hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
