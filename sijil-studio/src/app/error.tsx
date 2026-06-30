"use client";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2>Something went wrong.</h2>

      <button
        onClick={() => reset()}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Retry
      </button>
    </div>
  );
}
