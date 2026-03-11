"use client";

import ConstructionBanner from "@/components/construction-banner";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import ResearchOverview from "@/components/research-overview";
import Image from "next/image";
import { usePageBuilder } from "@/hooks/use-page-builder";

function readString(value: string | string[] | undefined, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function readList(value: string | string[] | undefined) {
  return Array.isArray(value) ? value : [];
}

export default function ResearchPage() {
  const sections = usePageBuilder("research");
  const hero = sections.hero || {};
  const intro = sections.intro || {};
  const overview = sections.overview || {};

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      <ConstructionBanner />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-end pb-24 lg:pb-32 bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={readString(hero.image, "/images/projects.jpg")} 
            alt="Research TADLab" 
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
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse relative z-10" />
              <span className="text-sm font-medium text-white tracking-wide uppercase relative z-10 transition-transform duration-500 group-hover:translate-x-1">Our Insights</span>
              <div className="absolute inset-0 bg-white/5 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white tracking-tighter leading-[0.9] font-bricolage whitespace-pre-line drop-shadow-lg">
              {readString(hero.title, "RESEARCH")}
            </h1>
          </div>
        </div>
      </section>

      {/* Intro Section - Redesigned */}
      <section className="bg-white py-24 sm:py-32 overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="flex items-center gap-x-4 mb-8">
                  <div className="h-px w-12 bg-black" />
                  <h2 className="text-sm font-bold tracking-widest text-black uppercase">
                    {readString(intro.sectionTitle, "Intro")}
                  </h2>
                </div>
                <h3 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl font-bricolage whitespace-pre-line leading-[1.1]">
                  {readString(intro.heading, "Research and Initiatives")}
                </h3>
              </div>
              
              <div className="lg:pt-16">
                 <p className="text-xl leading-relaxed text-gray-600 whitespace-pre-line font-medium border-l-4 border-emerald-500 pl-6 h-full">
                  {readString(intro.description)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ResearchOverview
        content={{
          overviewTitle: readString(overview.overviewTitle, "Overview"),
          overviewParagraphs: readList(overview.overviewParagraphs),
          questionsTitle: readString(overview.questionsTitle, "Key Research Questions"),
          questionsIntro: readString(overview.questionsIntro),
          questionsList: readList(overview.questionsList),
          contextTitle: readString(overview.contextTitle, "Research Context and Rationale"),
          contextParagraphs: readList(overview.contextParagraphs),
          methodologyTitle: readString(overview.methodologyTitle, "Methodology"),
          designTitle: readString(overview.designTitle, "Research Design"),
          designParagraphs: readList(overview.designParagraphs),
          methodsList: readList(overview.methodsList),
          designClosing: readString(overview.designClosing),
          participatoryTitle: readString(overview.participatoryTitle, "Participatory Approach"),
          participatoryParagraphs: readList(overview.participatoryParagraphs),
        }}
      />

      <Footer />
    </div>
  );
}
