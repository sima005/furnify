import HeroSection from "@/components/HeroSection";
import Categories from "@/components/Categories";
import Inspirations from "@/components/Inspirations";
import OfferBanner from "@/components/OfferBanner";

export default function Home() {
  return (
    <div className="w-full bg-[#F7F3EC]">
      <HeroSection />
      <OfferBanner />
      <Categories />
      <Inspirations />
    </div>
  );
}
