import Hero from "./components/Hero";
import FeaturedJobs from "./components/FeaturedJobs";
import FeaturesSection from "./components/FeaturesSection";
import PricingSection from "./components/PricingSection";
import CtaBanner from "./components/CtaBanner";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#07070a] text-zinc-100 selection:bg-[#5c53fe] selection:text-white">
      <main className="flex-1">
        <Hero />
        <FeaturedJobs />
        <FeaturesSection />
        <PricingSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
