"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-ink-black/70 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-red text-ink-bone font-display text-lg leading-none">
            IP
          </span>
          <span className="font-display text-xl tracking-[0.2em] text-ink-bone">
            INK PULSE
          </span>
        </a>
        <nav className="hidden gap-7 text-sm text-ink-mute md:flex">
          <a href="#artistas" className="hover:text-ink-bone transition">Artistas</a>
          <a href="#estilos" className="hover:text-ink-bone transition">Estilos</a>
          <a href="#galeria" className="hover:text-ink-bone transition">Galería</a>
          <a href="#proceso" className="hover:text-ink-bone transition">Proceso</a>
        </nav>
        <a
          href="#reservar"
          className="rounded-full bg-accent-red px-5 py-2 text-sm font-semibold tracking-wide text-ink-bone shadow-[0_0_24px_-6px_rgba(230,57,70,0.6)] transition hover:bg-accent-rose"
        >
          Reservar
        </a>
      </div>
    </header>
  );
}
