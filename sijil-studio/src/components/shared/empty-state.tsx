import { FileSearch } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FileSearch className="mb-4 h-10 w-10 text-muted-foreground" />

      <h2 className="font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
