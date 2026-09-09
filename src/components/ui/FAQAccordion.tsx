"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`space-y-0 border-t border-[var(--color-steel)] ${className}`}>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
          className="w-full border-b border-[var(--color-steel)] py-6 text-left focus-visible:ring-2 focus-visible:ring-[var(--color-royal-accent-blue)] focus-visible:outline-none"
        >
          <div className="flex items-center justify-between gap-4">
            <h4 className="font-ui text-base font-medium">{item.question}</h4>
            <span
              className={`flex-shrink-0 text-[var(--color-steel)] transition-transform duration-300 ${openIndex === index ? "rotate-45" : ""}`}
            >
              +
            </span>
          </div>
          {openIndex === index && (
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-graphite)]">
              {item.answer}
            </p>
          )}
        </button>
      ))}
    </div>
  );
}
