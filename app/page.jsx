import Navbar from "@/components/navbar/navbar";
import HomeHeroSection from "./(home)/_components/sections/home-hero-section";
import SectionWrapper from "@/components/animation/sectionWrapper";
import HomePartnerSection from "./(home)/_components/sections/home-partner-section";
import HomeProjectSection from "./(home)/_components/sections/home-projects-section";
import HomeDonateSection from "./(home)/_components/sections/home-donate-section";

export default function Home() {
  return (
    <div className="h-fit bg-[whitesmoke]">
      <Navbar />
      <HomeHeroSection />
      <SectionWrapper className="w-[90%] mx-auto md:w-full min-h-[calc(100vh-85px)] py-[80px] md:pt-[85px] relative">
        <HomePartnerSection />
      </SectionWrapper>
      <SectionWrapper>
        <HomeProjectSection />
      </SectionWrapper>
      <SectionWrapper>
        <HomeDonateSection />
      </SectionWrapper>
    </div>
  );
}
