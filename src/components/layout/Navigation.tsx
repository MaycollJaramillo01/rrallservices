"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { navigationConfig } from "@/config/navigation";
import { siteConfig } from "@/config/site";

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Navigation({ isOpen, onClose }: NavigationProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Menú">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full w-full max-w-sm overflow-y-auto bg-[var(--color-pure-white)] shadow-xl">
        <div className="p-6">
          <div className="mb-8 flex items-center justify-between">
            <span className="font-display text-xl">Menú</span>
            <button onClick={onClose} className="p-2" aria-label="Cerrar menú">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="space-y-0">
            {navigationConfig.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block border-b border-[var(--color-steel)] py-4 text-base text-[var(--color-graphite)] transition-colors hover:text-[var(--color-ink)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={onClose}
              className="block border-b border-[var(--color-steel)] py-4 text-base text-[var(--color-graphite)] transition-colors hover:text-[var(--color-ink)]"
            >
              Contacto
            </Link>
          </nav>
          <div className="mt-6">
            <Link
              href={navigationConfig.cta.href}
              onClick={onClose}
              className="inline-flex w-full items-center justify-center bg-[var(--color-ink)] px-6 py-3 text-sm font-medium text-[var(--color-pure-white)]"
            >
              {navigationConfig.cta.label}
            </Link>
          </div>
          <a
            href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
            className="mt-6 block text-sm text-[var(--color-graphite)]"
          >
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
