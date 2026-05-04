import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import Styles from "@/components/Styles";
import Artists from "@/components/Artists";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import ReservationForm from "@/components/ReservationForm";
import Footer from "@/components/Footer";
import RevealHost from "@/components/RevealHost";

export default function Page() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <Hero />
        <ValueProps />
        <Styles />
        <Artists />
        <Gallery />
        <Process />
        <ReservationForm />
      </main>
      <Footer />
      <RevealHost />
    </>
  );
}
