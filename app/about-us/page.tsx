"use client";

import ConstructionBanner from "@/components/construction-banner";
import Footer from "@/components/footer";
import GuidingPrinciplesSection from "@/components/GuidingPrinciples";
import MissionVisionSection from "@/components/mission";
import NavBar from "@/components/navbar";
import TeamSection from "@/components/team";
import Image from "next/image";
import { usePageBuilder } from "@/hooks/use-page-builder";

function readString(value: string | string[] | undefined, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function readList(value: string | string[] | undefined) {
  return Array.isArray(value) ? value : [];
}

export default function AboutUsPage() {
  const sections = usePageBuilder("about");
  const hero = sections.hero || {};
  const intro = sections.intro || {};
  const missionVision = sections.missionVision || {};
  const guidingPrinciples = sections.guidingPrinciples || {};
  const team = sections.team || {};

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      <ConstructionBanner />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-end pb-24 lg:pb-32 bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={readString(hero.image, "/images/about.jpg")} 
            alt="About TADLab" 
            fill 
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        </div>
        
        <div className="absolute top-0 w-full z-30">
          <NavBar />
        </div>

        <div className="relative z-20 container mx-auto px-6 lg:px-8 mt-auto pt-40">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 overflow-hidden group">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse relative z-10" />
              <span className="text-sm font-medium text-white tracking-wide uppercase relative z-10 transition-transform duration-500 group-hover:translate-x-1">Discover TADLab</span>
              <div className="absolute inset-0 bg-white/5 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white tracking-tighter leading-[0.9] font-bricolage whitespace-pre-line drop-shadow-lg">
              {readString(hero.title, "ABOUT US")}
            </h1>
          </div>
        </div>
      </section>

      {/* Intro Section - Redesigned */}
      <section className="bg-white py-24 sm:py-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1 lg:max-w-lg">
                <div className="flex items-center gap-x-4 mb-8">
                  <div className="h-px w-12 bg-black" />
                  <h2 className="text-sm font-bold tracking-widest text-black uppercase">
                    {readString(intro.sectionTitle, "Intro")}
                  </h2>
                </div>
                <h3 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-8 font-bricolage whitespace-pre-line leading-[1.1]">
                  {readString(intro.heading)}
                </h3>
                <p className="text-lg leading-relaxed text-gray-600 whitespace-pre-line font-medium border-l-4 border-gray-100 pl-6 h-full">
                  {readString(intro.description)}
                </p>
              </div>
              
              <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div className="relative h-[300px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <Image
                    src={readString(intro.image1, "/images/about/1.jpg")}
                    alt="About image 1"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="grid grid-rows-2 gap-4 sm:gap-6 lg:gap-8 translate-y-8 sm:translate-y-12">
                  <div className="relative h-[140px] sm:h-[235px] rounded-3xl overflow-hidden shadow-xl group">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <Image
                      src={readString(intro.image2, "/images/about/2.jpg")}
                      alt="About image 2"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="relative h-[140px] sm:h-[235px] rounded-3xl overflow-hidden shadow-xl group">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <Image
                      src={readString(intro.image3, "/images/about/3.jpg")}
                      alt="About image 3"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MissionVisionSection
        content={{
          missionTitle: readString(missionVision.missionTitle, "Our Mission"),
          missionBody: readString(missionVision.missionBody),
          missionImage: readString(missionVision.missionImage, "/images/mission.jpg"),
          missionPoints: readList(missionVision.missionPoints),
          visionTitle: readString(missionVision.visionTitle, "Our Vision"),
          visionBody: readString(missionVision.visionBody),
        }}
      />

      <GuidingPrinciplesSection
        content={{
          sectionTitle: readString(guidingPrinciples.sectionTitle, "Guiding Principles"),
          principle1Title: readString(guidingPrinciples.principle1Title),
          principle1Description: readString(guidingPrinciples.principle1Description),
          principle2Title: readString(guidingPrinciples.principle2Title),
          principle2Description: readString(guidingPrinciples.principle2Description),
          principle3Title: readString(guidingPrinciples.principle3Title),
          principle3Description: readString(guidingPrinciples.principle3Description),
          principle4Title: readString(guidingPrinciples.principle4Title),
          principle4Description: readString(guidingPrinciples.principle4Description),
        }}
      />

      <TeamSection
        content={{
          sectionTitle: readString(team.sectionTitle, "Our Team"),
          description: readString(team.description),
          member1Name: readString(team.member1Name),
          member1Role: readString(team.member1Role),
          member1Image: readString(team.member1Image),
          member1Bio: readString(team.member1Bio),
          member2Name: readString(team.member2Name),
          member2Role: readString(team.member2Role),
          member2Image: readString(team.member2Image),
          member2Bio: readString(team.member2Bio),
          member3Name: readString(team.member3Name),
          member3Role: readString(team.member3Role),
          member3Image: readString(team.member3Image),
          member3Bio: readString(team.member3Bio),
          member4Name: readString(team.member4Name),
          member4Role: readString(team.member4Role),
          member4Image: readString(team.member4Image),
          member4Bio: readString(team.member4Bio),
          member5Name: readString(team.member5Name),
          member5Role: readString(team.member5Role),
          member5Image: readString(team.member5Image),
          member5Bio: readString(team.member5Bio),
          member6Name: readString(team.member6Name),
          member6Role: readString(team.member6Role),
          member6Image: readString(team.member6Image),
          member6Bio: readString(team.member6Bio),
        }}
      />

      <Footer />
    </div>
  );
}
