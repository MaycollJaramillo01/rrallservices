"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const photos = [
  {
    file: "equipo-digital.png",
    alt: "Profesionales usando un teléfono y una tableta Royal Prestige",
  },
  { file: "frescapure-3500.jpg", alt: "Purificador FrescaPure 3500 con un vaso de agua y limón" },
  { file: "olla-presion.jpg", alt: "Olla de presión de acero inoxidable Royal Prestige" },
  { file: "accesorios-jugos.jpg", alt: "Accesorios para preparar jugos junto a frutas y jengibre" },
  {
    file: "momento-hogar.jpg",
    alt: "Una pareja sirve una bebida con una tetera de acero inoxidable",
  },
  { file: "arroz-coccion.jpg", alt: "Plato de arroz y huevos junto a una olla Royal Prestige" },
  {
    file: "olla-tostadas.jpg",
    alt: "Olla de presión Royal Prestige rodeada de tostadas e ingredientes",
  },
  { file: "sarten-salmon.jpg", alt: "Sartén Royal Prestige junto a un plato de salmón y verduras" },
  { file: "equipo-productos.jpg", alt: "Dos profesionales presentan ollas Royal Prestige" },
];
const slides = [photos[photos.length - 1], ...photos, photos[0]];

export function OpportunityHeroCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const moving = useRef(false);
  const [position, setPosition] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [resumeRequested, setResumeRequested] = useState(false);
  const current = (position - 1 + photos.length) % photos.length;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(preference.matches);
      setAnimate(false);
      setPosition((previous) => ((previous - 1 + photos.length) % photos.length) + 1);
      moving.current = false;
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  const advance = useCallback(
    (direction: number) => {
      if (moving.current) return;
      moving.current = !reduced;
      setAnimate(!reduced);
      setPosition((previous) => {
        const next = previous + direction;
        return reduced ? ((next - 1 + photos.length) % photos.length) + 1 : next;
      });
    },
    [reduced],
  );

  useEffect(() => {
    if (paused || reduced || ((hovered || focused) && !resumeRequested)) return;
    const timer = window.setInterval(() => {
      const bounds = rootRef.current?.getBoundingClientRect();
      if (!document.hidden && bounds && bounds.bottom > 0 && bounds.top < window.innerHeight)
        advance(1);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [advance, paused, hovered, focused, reduced, resumeRequested]);

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label="Fotografías de productos y personas de Royal Prestige"
      aria-roledescription="carrusel"
      onMouseEnter={() => {
        setHovered(true);
        setResumeRequested(false);
      }}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => {
        setFocused(true);
        setResumeRequested(false);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          advance(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
      className="overflow-hidden rounded-[18px] border border-[var(--color-steel)]/15 bg-white"
    >
      <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[6/5]">
        <div
          className={`flex h-full ${animate ? "transition-transform duration-500 ease-in-out motion-reduce:transition-none" : ""}`}
          style={{ transform: `translate3d(-${position * 100}%,0,0)` }}
          onTransitionEnd={(event) => {
            if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
            moving.current = false;
            if (position === 0 || position === photos.length + 1) {
              setAnimate(false);
              setPosition(position === 0 ? photos.length : 1);
            }
          }}
        >
          {slides.map((photo, index) => (
            <div
              key={`${photo.file}-${index}`}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${current + 1} de ${photos.length}`}
              aria-hidden={index !== position}
              className="relative h-full w-full shrink-0"
            >
              <Image
                src={`/assets/opportunity/${photo.file}`}
                alt={index === position ? photo.alt : ""}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                preload={index === 1}
                loading={index === 1 ? undefined : "eager"}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-[var(--color-steel)]/15 px-4 py-3">
        <span className="text-xs text-[var(--color-steel)] tabular-nums">
          {String(current + 1).padStart(2, "0")}{" "}
          <span className="text-[var(--color-steel)]/50">/</span> 09
        </span>
        <div className="flex items-center gap-2">
          {!reduced && (
            <button
              type="button"
              aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"}
              aria-pressed={paused}
              onClick={() => {
                setPaused((value) => !value);
                setResumeRequested(paused);
              }}
              className="min-h-10 px-3 text-xs text-[var(--color-deep-royal-blue)] hover:bg-[var(--color-water-tint)] focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {paused ? "Reanudar" : "Pausar"}
            </button>
          )}
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={() => advance(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-steel)]/25 text-[var(--color-deep-royal-blue)] hover:bg-[var(--color-water-tint)] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Foto siguiente"
            onClick={() => advance(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-steel)]/25 text-[var(--color-deep-royal-blue)] hover:bg-[var(--color-water-tint)] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
