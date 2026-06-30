interface Props {
  title?: string;
  children: React.ReactNode;
}

export function Section({
  title,
  children,
}: Props) {
  return (
    <section className="space-y-4">
      {title && (
        <h2 className="text-xl font-semibold">
          {title}
        </h2>
      )}

      {children}
    </section>
  );
}
