export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-graphite py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-red font-display text-lg text-ink-bone">
              IP
            </span>
            <span className="font-display text-2xl tracking-[0.2em]">INK PULSE</span>
          </div>
          <p className="max-w-sm text-sm text-ink-mute">
            Studio de tatuajes en Santiago. Diseño personalizado, artistas especializados, reserva online simple.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="text-xs uppercase tracking-[0.32em] text-accent-red">Studio</span>
          <span>Av. Italia 1450, Providencia</span>
          <span>Santiago, Chile</span>
          <span>Mar — Sáb · 11:00 a 20:00</span>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="text-xs uppercase tracking-[0.32em] text-accent-red">Contacto</span>
          <a href="#" className="hover:text-ink-bone transition">@inkpulse.studio</a>
          <a href="#" className="hover:text-ink-bone transition">hola@inkpulse.cl</a>
          <a href="#" className="hover:text-ink-bone transition">+56 9 1234 5678</a>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-white/5 px-6 pt-8 text-xs text-ink-mute md:flex-row md:items-center">
        <span>© 2026 Ink Pulse Studio · Sitio ficticio para demostración pedagógica.</span>
        <span className="font-display tracking-[0.32em] text-ink-mute/60">Charla AIEP · 4to medio</span>
      </div>
    </footer>
  );
}
