"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type ReelPlayerProps = {
  id: string;
  title: string;
  duration: number;
  onPlay: (video: HTMLVideoElement) => void;
};

function timestamp(seconds: number) {
  const value = Math.max(0, Math.floor(seconds));
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}

function PlayerIcon({ name }: { name: "play" | "pause" | "sound" | "muted" | "expand" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "play" && <path d="m9 5 11 7-11 7Z" fill="currentColor" stroke="none" />}
      {name === "pause" && (
        <>
          <path d="M8 5v14M16 5v14" strokeWidth="3" />
        </>
      )}
      {(name === "sound" || name === "muted") && (
        <>
          <path d="M11 5 6 9H3v6h3l5 4Z" />
          {name === "sound" ? (
            <>
              <path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" />
            </>
          ) : (
            <path d="m16 9 6 6m0-6-6 6" />
          )}
        </>
      )}
      {name === "expand" && <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />}
    </svg>
  );
}

export function ReelPlayer({ id, title, duration: initialDuration, onPlay }: ReelPlayerProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const expandRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(initialDuration);

  async function togglePlay() {
    const video = videoRef.current;
    if (!video || failed) return;
    if (!video.paused) {
      video.pause();
      return;
    }
    setWaiting(true);
    try {
      await video.play();
    } catch (error) {
      setWaiting(false);
      if (error instanceof Error && error.name !== "AbortError") setFailed(true);
    }
  }

  useEffect(() => {
    if (!expanded) return;
    const overflow = document.body.style.overflow;
    const expandButton = expandRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
      if (event.key !== "Tab") return;
      const controls = frameRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled]), input:not([disabled]), a[href]",
      );
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", keyboard);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", keyboard);
      expandButton?.focus();
    };
  }, [expanded]);

  const playLabel = `${playing ? "Pausar" : "Reproducir"}: ${title}`;
  const controlClass =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <div
      ref={frameRef}
      role={expanded ? "dialog" : undefined}
      aria-modal={expanded ? true : undefined}
      aria-label={expanded ? `Reproductor: ${title}` : undefined}
      className={`reel-player group overflow-hidden bg-[#14243a] text-white shadow-[0_8px_28px_rgb(27_58_107/0.1)] ${expanded ? "fixed inset-0 z-[70] h-[100dvh] w-full" : "relative aspect-[9/16] rounded-[18px]"}`}
    >
      <video
        ref={videoRef}
        playsInline
        preload="none"
        muted={muted}
        poster={`/assets/instagram/${id}.jpg`}
        aria-label={title}
        className="absolute inset-0 h-full w-full object-contain"
        onLoadedMetadata={(event) => {
          const value = event.currentTarget.duration;
          if (Number.isFinite(value)) setDuration(value);
          setLoaded(true);
        }}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onPlay={(event) => {
          setPlaying(true);
          onPlay(event.currentTarget);
        }}
        onPlaying={() => setWaiting(false)}
        onWaiting={() => setWaiting(true)}
        onPause={() => {
          setPlaying(false);
          setWaiting(false);
        }}
        onEnded={() => {
          setPlaying(false);
          setWaiting(false);
        }}
        onError={() => {
          setFailed(true);
          setWaiting(false);
        }}
      >
        <source src={`/assets/instagram/${id}.mp4`} type="video/mp4" />
      </video>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex items-center gap-2 bg-gradient-to-b from-[#0c182b]/65 to-transparent px-4 pt-4 pb-10"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-[10px] font-semibold tracking-wide backdrop-blur-md">
          KR
        </span>
        <span className="text-xs font-medium tracking-wide">@kr.prestige</span>
      </div>

      <button
        type="button"
        aria-label={playLabel}
        onClick={togglePlay}
        disabled={failed}
        className="group/play absolute inset-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-white"
      >
        <span
          className={`flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/45 bg-[#152940]/35 text-white shadow-lg backdrop-blur-md transition duration-200 motion-reduce:transition-none ${playing && !waiting ? "opacity-0 group-hover:opacity-100 group-focus-visible/play:opacity-100" : "opacity-100"}`}
        >
          {waiting ? (
            <span
              aria-hidden="true"
              className="h-6 w-6 animate-spin rounded-full border-2 border-white/35 border-t-white"
            />
          ) : (
            <span className="scale-[1.4]">
              <PlayerIcon name={playing ? "pause" : "play"} />
            </span>
          )}
        </span>
      </button>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c182b]/95 via-[#0c182b]/70 to-transparent px-3 pt-12 pb-2">
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={Math.min(time, duration)}
          disabled={!loaded || failed}
          aria-label={`Progreso: ${title}`}
          aria-valuetext={`${timestamp(time)} de ${timestamp(duration)}`}
          className="reel-progress block h-6 w-full cursor-pointer disabled:cursor-default"
          style={{ "--reel-progress": `${(time / duration) * 100}%` } as CSSProperties}
          onChange={(event) => {
            if (videoRef.current) videoRef.current.currentTime = Number(event.target.value);
            setTime(Number(event.target.value));
          }}
        />
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={playLabel}
            onClick={togglePlay}
            disabled={failed}
            className={controlClass}
          >
            <PlayerIcon name={playing ? "pause" : "play"} />
          </button>
          <span className="mr-auto text-xs whitespace-nowrap text-white/85 tabular-nums">
            {timestamp(time)} <span className="text-white/40">/</span> {timestamp(duration)}
          </span>
          <button
            type="button"
            aria-label={`${muted ? "Activar sonido" : "Silenciar"}: ${title}`}
            aria-pressed={muted}
            onClick={() => setMuted((value) => !value)}
            className={controlClass}
          >
            <PlayerIcon name={muted ? "muted" : "sound"} />
          </button>
          <button
            ref={expandRef}
            type="button"
            aria-label={`${expanded ? "Salir de pantalla completa" : "Pantalla completa"}: ${title}`}
            onClick={() => setExpanded((value) => !value)}
            className={controlClass}
          >
            <PlayerIcon name="expand" />
          </button>
        </div>
      </div>
      {expanded && (
        <button
          ref={closeRef}
          type="button"
          aria-label="Cerrar pantalla completa"
          onClick={() => setExpanded(false)}
          className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur-md hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white"
        >
          ×
        </button>
      )}
      {waiting && (
        <span role="status" className="sr-only">
          Cargando video
        </span>
      )}
      {failed && (
        <div
          role="status"
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#14243a]/95 p-6 text-center"
        >
          <p className="text-sm leading-relaxed">No se pudo reproducir el video.</p>
          <a
            href={`https://www.instagram.com/reel/${id}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white underline underline-offset-4"
          >
            Ver en Instagram ↗
          </a>
        </div>
      )}
    </div>
  );
}
