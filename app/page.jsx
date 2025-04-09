import HomeHeroSection from "./(home)/_components/sections/home-hero-section";
import SectionWrapper from "@/components/animation/sectionWrapper";
import HomePartnerSection from "./(home)/_components/sections/home-partner-section";
import HomeProjectSection from "./(home)/_components/sections/home-projects-section";
import HomeDonateSection from "./(home)/_components/sections/home-donate-section";
import HomeTeamSection from "./(home)/_components/sections/home-team-section";
import HomeBlogSection from "./(home)/_components/sections/home-blog-section";
import HomeFAQSection from "./(home)/_components/sections/home-faq-section";

export default function Home() {
  return (
    <div className="h-fit bg-[whitesmoke]">
      <SectionWrapper>
        <HomeHeroSection />
      </SectionWrapper>
      <SectionWrapper>
        <HomePartnerSection />
      </SectionWrapper>
      <SectionWrapper>
        <HomeProjectSection />
      </SectionWrapper>
      <SectionWrapper>
        <HomeDonateSection />
      </SectionWrapper>
      <SectionWrapper>
        <HomeTeamSection />
      </SectionWrapper>
      <SectionWrapper>
        <HomeBlogSection />
      </SectionWrapper>
      <SectionWrapper>
        <HomeFAQSection />
      </SectionWrapper>
    </div>
  );
}
