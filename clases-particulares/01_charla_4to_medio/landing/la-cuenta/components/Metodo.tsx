export default function Metodo({ totalRows, totalProductos }: { totalRows: number; totalProductos: number }) {
  return (
    <section id="metodo" className="relative bg-paper py-16 md:py-20">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mb-8">
          <h2 className="font-editorial text-3xl font-medium tracking-tightest md:text-4xl">
            Cómo se hizo
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Proyecto personal de Diego Obando. Datos scrapeados, normalizados por código de barra y servidos desde un CSV.
          </p>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line md:grid-cols-4">
          {[
            { n: "01", title: "Scraping", body: "Recorrer los sitios de los 6 supermercados guardando producto, marca y precio." },
            { n: "02", title: "Normalización", body: "Emparejar productos entre supers usando código de barra (EAN)." },
            { n: "03", title: "Cálculo", body: "Identificar el más barato, el más caro y calcular el ahorro en CLP y %." },
            { n: "04", title: "Web + Power BI", body: "El CSV alimenta esta web y un dashboard de Power BI con los mismos datos." },
          ].map((step) => (
            <li key={step.n} className="bg-paper p-6 md:p-7">
              <span className="font-editorial editorial-num text-2xl font-medium text-accent-oxblood md:text-3xl">
                {step.n}
              </span>
              <h3 className="mt-2 font-editorial text-xl font-medium tracking-tight text-ink md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        {/* Stats strip */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line md:grid-cols-4">
          {[
            ["Filas", totalRows.toLocaleString("es-CL")],
            ["Productos únicos", totalProductos.toLocaleString("es-CL")],
            ["Supermercados", "6"],
            ["Ciudad", "Osorno · Chile"],
          ].map(([label, value]) => (
            <div key={label} className="bg-paper-deep p-6 md:p-8">
              <span className="block text-[11px] uppercase tracking-widest text-ink-mute">
                {label}
              </span>
              <span className="mt-2 block font-editorial editorial-num text-3xl font-medium text-ink md:text-4xl">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
