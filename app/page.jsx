import Navbar from "@/components/navbar/navbar";
import HomeHeroSection from "./(home)/_components/sections/home-hero-section";
import SectionWrapper from "@/components/animation/sectionWrapper";
import HomePartnerSection from "./(home)/_components/sections/home-partner-section";

export default function Home() {
  return (
    <div className="h-fit bg-[whitesmoke]">
      <Navbar />
      <HomeHeroSection />
      <SectionWrapper className="w-full h-full md:h-[calc(100vh-85px)] py-[80px] md:pt-[85px] relative bg-[green]">
        <HomePartnerSection />
      </SectionWrapper>
    </div>
  );
}
