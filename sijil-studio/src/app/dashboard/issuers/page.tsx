"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle, XCircle } from "lucide-react";
import { useIssuers } from "@/hooks/use-issuers";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function IssuersPage() {
  const [search, setSearch] = useState("");
  const { data: issuers, isLoading } = useIssuers();

  const filteredIssuers = issuers?.filter((issuer) =>
    issuer.name.toLowerCase().includes(search.toLowerCase()) ||
    issuer.organization?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Issuers</h1>
        <p className="text-muted-foreground">
          Manage and verify certificate issuers
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search issuers..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))
        ) : (
          filteredIssuers?.map((issuer) => (
            <Card key={issuer.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{issuer.name}</CardTitle>
                  {issuer.verified ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {issuer.organization || "Independent"}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Created:</span>{" "}
                    {new Date(issuer.createdAt).toLocaleDateString()}
                  </p>
                  {!issuer.verified && (
                    <Button size="sm" className="w-full">
                      Verify Issuer
                    </Button>
                  )}
                  {issuer.verified && (
                    <Button size="sm" variant="outline" className="w-full">
                      View Details
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
