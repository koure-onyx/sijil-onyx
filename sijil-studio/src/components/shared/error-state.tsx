"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title?: string;
  description?: string;
  retry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again.",
  retry,
}: Props) {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <AlertTriangle className="mb-4 h-10 w-10 text-destructive" />

      <h2 className="font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-muted-foreground">
        {description}
      </p>

      {retry && (
        <Button
          onClick={retry}
          className="mt-6"
        >
          Retry
        </Button>
      )}
    </div>
  );
}
