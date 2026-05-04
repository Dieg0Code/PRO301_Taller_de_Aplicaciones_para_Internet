import { getStats, topAhorros } from "@/lib/db";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductGrid from "@/components/ProductGrid";
import Cockpit from "@/components/Cockpit";
import Footer from "@/components/Footer";

export default function Page() {
  const stats = getStats();
  const featured = topAhorros(20);

  return (
    <>
      <Header />
      <main>
        <Hero
          totalProductos={stats.totalProductos}
          totalSupers={stats.totalSupers}
          ahorroPctMax={stats.ahorroPctMax}
          ahorroPctPromedio={stats.ahorroPctPromedio}
        />
        <Marquee supers={stats.supers} />
        <ProductGrid products={featured} />
        <Cockpit supers={stats.supers} />
      </main>
      <Footer />
    </>
  );
}
