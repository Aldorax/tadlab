"use client";

import ConstructionBanner from "@/components/construction-banner";
import Footer from "@/components/footer";
import GuidingPrinciplesSection from "@/components/GuidingPrinciples";
import MissionVisionSection from "@/components/mission";
import NavBar from "@/components/navbar";
import TeamSection from "@/components/team";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen">
      {/* Construction Banner */}
      <ConstructionBanner />

      {/* Hero Section */}
      <section
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/about.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50" />

        {/* Navigation */}
        <NavBar />

        {/* Hero Content */}
        <div className="relative z-10 px-8 lg:px-16 pt-32 lg:pt-40 pb-16 flex items-end h-full font-bricolage">
          <div className="max-w-3xl md:max-w-5xl">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1]">
              ABOUT US
            </h2>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-[#fff] py-24">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-16">
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-[#4ade80] mt-2" />
              <h2 className="text-4xl font-bold text-[#1a1a1a]">Intro</h2>
            </div>

            <div className="flex-1 md:max-w-3xl">
              <h3 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] md:text-right mb-8">
                About the African Futures <br />
                and Disruption Studies Lab
              </h3>
              <p className="text-[#767676] text-lg md:text-right leading-relaxed">
                The African Futures and Disruption Studies Lab is a collaborative research platform dedicated to understanding how large-scale social, political, economic, and technological disruptions shape societies across Africa — and how evidence-based responses can be developed in real time.
                <br />
                <br />
                Our work bridges research, policy, and practice by grounding inquiry in real-world contexts and engaging those most affected by change as active contributors to the research process.
              </p>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Image
              src="/images/1.jpg"
              alt="African research and collaboration"
              width={400}
              height={400}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
            <Image
              src="/images/2.jpg"
              alt="African community engagement"
              width={400}
              height={400}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
            <Image
              src="/images/3.jpg"
              alt="African innovation and development"
              width={400}
              height={400}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <MissionVisionSection />

      {/* Guiding Principles */}
      <GuidingPrinciplesSection />

      {/* Team Section */}
      <TeamSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
