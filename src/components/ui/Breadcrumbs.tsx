import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.href} className="flex items-center gap-2">
          {index > 0 && <span className="text-[var(--color-steel)]">/</span>}
          {index < items.length - 1 ? (
            <Link href={item.href} className="text-[var(--color-graphite)] hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-[var(--color-ink)]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
