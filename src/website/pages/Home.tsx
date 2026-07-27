import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Download from "../components/Download";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Pricing />
      <Download />
      <FAQ />
      <Footer />
    </>
  );
}