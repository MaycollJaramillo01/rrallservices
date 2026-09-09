"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="mb-4 font-display text-4xl">Algo salió mal</h1>
      <p className="mb-8 max-w-md text-[var(--color-graphite)]">
        Ocurrió un error inesperado. Por favor, inténtelo de nuevo.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-sm bg-[var(--color-ink)] px-6 py-3 text-[var(--color-pure-white)] transition-opacity hover:opacity-90"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
