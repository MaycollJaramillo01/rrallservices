"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandWordmark } from "./BrandWordmark";
import { Navigation } from "./Navigation";
import { navigationConfig } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-40 border-b border-[var(--color-steel)] bg-[var(--color-pure-white)]">
      <div className="mx-auto max-w-[1480px] px-6 sm:px-8 lg:px-[64px] xl:px-[88px]">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <BrandWordmark />
          <nav className="hidden items-center gap-8 lg:flex">
            {navigationConfig.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--color-graphite)] transition-colors duration-200 hover:text-[var(--color-ink)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
              className="hidden text-sm text-[var(--color-graphite)] transition-colors hover:text-[var(--color-ink)] sm:inline"
            >
              {siteConfig.phone}
            </a>
            <Link
              href={navigationConfig.cta.href}
              className="hidden items-center bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-pure-white)] transition-opacity duration-200 hover:opacity-90 sm:inline-flex"
            >
              {navigationConfig.cta.label}
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 text-[var(--color-graphite)] lg:hidden"
              aria-label="Menú"
              aria-expanded={menuOpen}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Navigation isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
