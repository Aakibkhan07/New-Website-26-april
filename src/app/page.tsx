import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Comparison from "@/components/sections/Comparison";
import Solutions from "@/components/sections/Solutions";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <Hero />
      <Features />
      <Comparison />
      <Solutions />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
