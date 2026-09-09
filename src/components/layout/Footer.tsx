import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/categories";

const infoLinks = [
  { href: "/nosotros", label: "Nuestra historia" },
  { href: "/demostraciones", label: "Demostraciones" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
];

const legalLinks = [
  { href: "/privacidad", label: "Privacidad" },
  { href: "/terminos", label: "Términos" },
];

export function Footer() {
  const tel = siteConfig.phone.replace(/[^0-9+]/g, "");

  return (
    <footer className="bg-[var(--color-deep-royal-blue)] text-[var(--color-pure-white)]">
      <div className="mx-auto max-w-[1480px] px-6 py-16 sm:px-8 lg:px-[64px] xl:px-[88px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Image
              src="/assets/brand/rr-logo-blanco.png"
              alt="RR All Services"
              width={152}
              height={182}
              className="mb-5 h-16 w-auto"
            />
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              {siteConfig.legalRelationship} en {siteConfig.serviceArea}.
            </p>
            <Link
              href="/demostraciones"
              className="mt-6 inline-flex items-center border border-white/40 px-6 py-3 text-sm font-medium transition-colors hover:border-[var(--color-pure-white)]"
            >
              Solicitar demostración
            </Link>
          </div>

          <div>
            <h4 className="font-ui mb-4 text-sm tracking-wider uppercase">Productos</h4>
            <nav className="space-y-2">
              <Link
                href="/productos"
                className="block text-sm text-white/70 transition-colors hover:text-[var(--color-pure-white)]"
              >
                Todos
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/productos?cat=${category.slug}`}
                  className="block text-sm text-white/70 transition-colors hover:text-[var(--color-pure-white)]"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-ui mb-4 text-sm tracking-wider uppercase">Información</h4>
            <nav className="space-y-2">
              {infoLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/70 transition-colors hover:text-[var(--color-pure-white)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-ui mb-4 text-sm tracking-wider uppercase">Contacto</h4>
            <address className="space-y-2 text-sm text-white/70 not-italic">
              <a
                href={`tel:${tel}`}
                className="block transition-colors hover:text-[var(--color-pure-white)]"
              >
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block break-all transition-colors hover:text-[var(--color-pure-white)]"
              >
                {siteConfig.email}
              </a>
              <p>{siteConfig.address}</p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/70">
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados. Royal
            Prestige® es marca registrada de su titular.
          </p>
          <nav className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/70 transition-colors hover:text-[var(--color-pure-white)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
