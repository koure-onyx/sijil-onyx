interface Props {
  title: string;
  description?: string;
}

export function PageHeader({
  title,
  description,
}: Props) {
  return (
    <div className="mb-8 space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">
        {title}
      </h1>

      {description && (
        <p className="text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
