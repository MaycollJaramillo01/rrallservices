"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { ReelPlayer } from "./ReelPlayer";

const reels = [
  {
    id: "Decsms0Dhcp",
    title: "Conozca la plancha Innove",
    description: "La plancha Royal Prestige, de cerca.",
    duration: 16.139,
  },
  {
    id: "Dd6_IAlicUE",
    title: "¿Cuál es su plato estrella?",
    description: "Cocina y novedades desde New York.",
    duration: 21.247,
  },
  {
    id: "Ddj2w1rgopx",
    title: "Para quienes disfrutan cocinar",
    description: "Descubra nuestras publicaciones en Instagram.",
    duration: 20.69,
  },
];

export function InstagramCarousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ first: true, last: false });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) rail.scrollLeft = 0;
      setPosition({
        first: rail.scrollLeft <= 2,
        last: rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2,
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    rail.addEventListener("scroll", update, { passive: true });
    update();
    const visibility = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) (entry.target as HTMLVideoElement).pause();
        }
      },
      { threshold: 0.5 },
    );
    rail.querySelectorAll("video").forEach((video) => visibility.observe(video));
    return () => {
      observer.disconnect();
      visibility.disconnect();
      rail.removeEventListener("scroll", update);
    };
  }, []);

  function move(direction: number) {
    const rail = railRef.current;
    const slide = rail?.querySelector("article");
    if (!rail || !slide) return;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({
      left: direction * (slide.getBoundingClientRect().width + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <Section padding="lg" background="porcelain" aria-labelledby="instagram-title">
      <Container padding="md" maxWidth="full">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
              En Instagram · @kr.prestige
            </p>
            <Heading id="instagram-title" as="h2" size="h2" font="display" className="scroll-mt-28">
              Vea nuestros últimos videos
            </Heading>
            <a
              href="https://www.instagram.com/kr.prestige/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-[var(--color-deep-royal-blue)] underline underline-offset-4"
            >
              Seguir a @kr.prestige ↗
            </a>
          </div>
          <div className="flex gap-3 lg:hidden">
            <button
              type="button"
              aria-label="Video anterior"
              aria-controls="instagram-reels"
              disabled={position.first}
              onClick={() => move(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-steel)]/25 text-xl text-[var(--color-deep-royal-blue)] transition-colors hover:bg-[var(--color-water-tint)] focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-default disabled:opacity-30"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Video siguiente"
              aria-controls="instagram-reels"
              disabled={position.last}
              onClick={() => move(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-steel)]/25 text-xl text-[var(--color-deep-royal-blue)] transition-colors hover:bg-[var(--color-water-tint)] focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-default disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>
        <div
          id="instagram-reels"
          ref={railRef}
          role="region"
          aria-label="Carrusel de videos de Instagram"
          aria-roledescription="carrusel"
          tabIndex={0}
          className="reels-rail flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-5 focus-visible:outline-2 focus-visible:outline-offset-4 sm:gap-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible"
        >
          {reels.map((reel, index) => (
            <article
              key={reel.id}
              aria-label={`${index + 1} de ${reels.length}: ${reel.title}`}
              className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-auto lg:min-w-0"
            >
              <ReelPlayer
                id={reel.id}
                title={reel.title}
                duration={reel.duration}
                onPlay={(current) => {
                  railRef.current?.querySelectorAll("video").forEach((video) => {
                    if (video !== current) video.pause();
                  });
                }}
              />
              <h3 className="mt-5 font-display text-2xl text-[var(--color-ink)]">{reel.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-steel)]">{reel.description}</p>
              <a
                href={`https://www.instagram.com/reel/${reel.id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-[var(--color-deep-royal-blue)] underline underline-offset-4"
              >
                Ver publicación en Instagram ↗
              </a>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
