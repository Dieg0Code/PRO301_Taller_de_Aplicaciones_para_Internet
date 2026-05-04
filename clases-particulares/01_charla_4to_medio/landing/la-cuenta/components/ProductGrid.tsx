import type { ProductGroup } from "@/lib/db";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: ProductGroup[] }) {
  return (
    <section id="destacados" className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Productos destacados
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Los 20 productos donde elegir el super correcto te ahorra más.
            </p>
          </div>
          <a
            href="#buscador"
            className="text-sm font-semibold text-brand transition hover:text-brand-dark"
          >
            Ver más →
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((p) => (
            <ProductCard key={p.ean} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
