import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="mb-4 font-display text-5xl">404</h1>
      <p className="mb-2 text-[var(--color-graphite)]">Página no encontrada</p>
      <p className="mb-8 text-sm text-[var(--color-steel)]">
        La página que buscas no existe o ha sido movida.
      </p>
      <Link href="/" className="text-sm text-[var(--color-deep-royal-blue)] hover:underline">
        Volver al inicio
      </Link>
      <Link
        href="/productos"
        className="mt-4 text-sm text-[var(--color-deep-royal-blue)] hover:underline"
      >
        Explorar productos
      </Link>
    </div>
  );
}
