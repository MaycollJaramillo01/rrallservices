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

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=61580707661906",
    label: "Facebook de RR All Services",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.12-2.41-.12-2.38 0-4.01 1.45-4.01 4.12v2.3H7.5V13h2.78v8h3.22z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/kr.prestige/",
    label: "Instagram de KR Prestige",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.44c-3.14 0-3.51.01-4.75.07-1.15.05-1.77.24-2.18.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.15.24 1.77.4 2.18.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.18.4 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.15-.05 1.77-.24 2.18-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.15-.24-1.77-.4-2.18a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.61-.07-4.75-.07zm0 2.45a5.95 5.95 0 1 1 0 11.9 5.95 5.95 0 0 1 0-11.9zm0 9.81a3.86 3.86 0 1 0 0-7.72 3.86 3.86 0 0 0 0 7.72zm7.58-10.05a1.39 1.39 0 1 1-2.78 0 1.39 1.39 0 0 1 2.78 0z" />
      </svg>
    ),
  },
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
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-[var(--color-pure-white)]"
              >
                WhatsApp
              </a>
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
          <nav className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-white/70 transition-colors hover:text-[var(--color-pure-white)]"
              >
                {link.icon}
              </a>
            ))}
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
