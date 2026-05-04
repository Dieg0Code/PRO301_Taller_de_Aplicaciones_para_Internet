import Search from "./Search";
import ListSidebar from "./ListSidebar";

export default function Cockpit({ supers }: { supers: string[] }) {
  return (
    <section id="app" className="bg-gray-50 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            Busca y arma tu lista
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Filtra por super o categoría. Tu lista compara los totales en vivo.
          </p>
        </div>

        <div id="buscador" className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Search supers={supers} />
          </div>
          <div id="mi-lista" className="lg:col-span-5">
            <ListSidebar supers={supers} />
          </div>
        </div>
      </div>
    </section>
  );
}
