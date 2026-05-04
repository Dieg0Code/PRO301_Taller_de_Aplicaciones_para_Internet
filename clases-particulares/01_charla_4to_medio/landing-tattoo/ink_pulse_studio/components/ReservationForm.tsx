"use client";

import { useEffect, useRef, useState } from "react";
import { artists } from "@/lib/artists";

const STORAGE_KEY = "ink_pulse_reservas";

const styleOptions = ["fine line", "blackwork", "tradicional", "minimalista", "lettering", "geométrico"];
const zoneOptions = ["brazo", "antebrazo", "pierna", "espalda", "pecho", "cuello", "mano", "costilla", "otro"];
const sizeOptions = ["pequeño", "mediano", "grande"];
const scheduleOptions = ["mañana", "tarde", "noche"];

type FormState = {
  nombre: string;
  contacto: string;
  artista: string;
  estilo: string;
  zona: string;
  tamano: string;
  presupuesto: string;
  fecha: string;
  horario: string;
  mensaje: string;
};

const initialState: FormState = {
  nombre: "",
  contacto: "",
  artista: "",
  estilo: "",
  zona: "",
  tamano: "",
  presupuesto: "",
  fecha: "",
  horario: "",
  mensaje: "",
};

export default function ReservationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [confirmed, setConfirmed] = useState<null | { ref: string; nombre: string }>(null);
  const [error, setError] = useState<string | null>(null);
  const artistaRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === "string") {
        setForm((f) => ({ ...f, artista: detail }));
        setTimeout(() => artistaRef.current?.focus({ preventScroll: true }), 600);
      }
    };
    window.addEventListener("reserve-with", handler as EventListener);
    return () => window.removeEventListener("reserve-with", handler as EventListener);
  }, []);

  const update =
    <K extends keyof FormState>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const required: (keyof FormState)[] = ["nombre", "contacto", "artista", "estilo", "zona", "tamano", "presupuesto", "fecha", "horario"];
    for (const f of required) {
      if (!form[f]) {
        setError("Falta completar algún campo. Revisa y vuelve a intentarlo.");
        return;
      }
    }
    const ref = `IPS-${Date.now().toString(36).toUpperCase()}`;
    const record = {
      ...form,
      presupuesto: Number(form.presupuesto),
      ref,
      timestamp: new Date().toISOString(),
    };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      arr.push(record);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch {
      /* noop — modo demo */
    }
    setConfirmed({ ref, nombre: form.nombre });
    setForm(initialState);
  };

  return (
    <section id="reservar" className="relative bg-ink-black py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(230,57,70,0.18),_transparent_55%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.4fr] lg:gap-16">
          <div className="reveal flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.32em] text-accent-red">Reserva</span>
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">
              Cuéntanos tu idea.
              <br />
              <span className="text-ink-mute">Te respondemos en menos de 48 horas.</span>
            </h2>
            <p className="text-ink-mute">
              Mientras más detalle entregues, más rápido podemos proponerte una primera dirección. Si todavía no tienes claro el estilo o el artista, igual escríbenos.
            </p>
            <ul className="mt-6 grid gap-4 text-sm text-ink-mute">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-red" />
                Lo que envíes queda guardado como solicitud (no agenda confirmada).
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-red" />
                Antes de la sesión coordinamos diseño, presupuesto y abono.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-red" />
                Si eres menor de edad, necesitamos autorización presencial.
              </li>
            </ul>
          </div>

          <form
            onSubmit={onSubmit}
            className="reveal relative flex flex-col gap-5 rounded-3xl border border-white/8 bg-ink-graphite/80 p-6 backdrop-blur md:p-10"
          >
            {confirmed ? (
              <div className="flex flex-col items-start gap-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-6 text-emerald-100">
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs uppercase tracking-[0.22em] text-emerald-200">
                  Solicitud recibida
                </span>
                <p className="font-display text-2xl text-ink-bone">
                  Gracias, {confirmed.nombre.split(" ")[0]}.
                </p>
                <p className="text-sm text-emerald-100/90">
                  Tu solicitud quedó registrada con la referencia{" "}
                  <span className="font-mono text-emerald-200">{confirmed.ref}</span>. El equipo revisará tu idea y te contactará para coordinar la hora.
                </p>
                <button
                  type="button"
                  onClick={() => setConfirmed(null)}
                  className="mt-2 rounded-full border border-emerald-300/30 px-5 py-2 text-xs uppercase tracking-[0.2em] text-emerald-100 transition hover:bg-emerald-400/10"
                >
                  Hacer otra solicitud
                </button>
              </div>
            ) : (
              <>
                <Field label="Nombre completo">
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={update("nombre")}
                    placeholder="Valentina Rojas"
                    className={inputCls}
                  />
                </Field>
                <Field label="Contacto (Instagram o WhatsApp)">
                  <input
                    type="text"
                    value={form.contacto}
                    onChange={update("contacto")}
                    placeholder="@vale.ink o +56 9 ..."
                    className={inputCls}
                  />
                </Field>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Artista preferido">
                    <select
                      ref={artistaRef}
                      value={form.artista}
                      onChange={update("artista")}
                      className={inputCls}
                    >
                      <option value="">Elige un artista</option>
                      {artists.map((a) => (
                        <option key={a.id} value={a.name}>
                          {a.name} · {a.specialty}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Estilo">
                    <select value={form.estilo} onChange={update("estilo")} className={inputCls}>
                      <option value="">Elige un estilo</option>
                      {styleOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  <Field label="Zona del cuerpo">
                    <select value={form.zona} onChange={update("zona")} className={inputCls}>
                      <option value="">Selecciona</option>
                      {zoneOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Tamaño">
                    <select value={form.tamano} onChange={update("tamano")} className={inputCls}>
                      <option value="">Selecciona</option>
                      {sizeOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Horario preferido">
                    <select value={form.horario} onChange={update("horario")} className={inputCls}>
                      <option value="">Selecciona</option>
                      {scheduleOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Presupuesto estimado (CLP)">
                    <input
                      type="number"
                      min={0}
                      value={form.presupuesto}
                      onChange={update("presupuesto")}
                      placeholder="80000"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Fecha tentativa">
                    <input
                      type="date"
                      value={form.fecha}
                      onChange={update("fecha")}
                      className={inputCls}
                    />
                  </Field>
                </div>
                <Field label="Mensaje (opcional)">
                  <textarea
                    rows={3}
                    value={form.mensaje}
                    onChange={update("mensaje")}
                    placeholder="Referencias, ideas, dudas..."
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                {error && (
                  <p className="text-sm text-rose-300">{error}</p>
                )}

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent-red px-7 py-3.5 font-semibold tracking-wide text-ink-bone shadow-[0_0_40px_-10px_rgba(230,57,70,0.7)] transition hover:bg-accent-rose"
                >
                  Solicitar reserva →
                </button>
                <p className="text-xs text-ink-mute">
                  Esta solicitud se guarda localmente para esta demo. En un proyecto real iría a un backend o CRM.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/8 bg-ink-smoke/60 px-4 py-3 text-sm text-ink-bone placeholder:text-ink-mute focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/30 transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-[0.18em] text-ink-mute">{label}</span>
      {children}
    </label>
  );
}
