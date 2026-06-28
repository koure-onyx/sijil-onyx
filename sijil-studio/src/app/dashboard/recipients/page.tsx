"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRecipients } from "@/hooks/use-recipients";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function RecipientsPage() {
  const [search, setSearch] = useState("");
  const { data: recipients, isLoading } = useRecipients();

  const filteredRecipients = recipients?.filter((recipient) =>
    recipient.name.toLowerCase().includes(search.toLowerCase()) ||
    recipient.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Recipients</h1>
        <p className="text-muted-foreground">
          View and manage certificate recipients
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search recipients..."
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
          filteredRecipients?.map((recipient) => (
            <Card key={recipient.id}>
              <CardHeader>
                <CardTitle className="text-lg">{recipient.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{recipient.email}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Certificates:</span>{" "}
                    <span className="font-medium">{recipient.certificateCount || 0}</span>
                  </p>
                  {recipient.walletAddress && (
                    <p className="text-xs text-muted-foreground break-all">
                      Wallet: {recipient.walletAddress.slice(0, 10)}...
                    </p>
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
