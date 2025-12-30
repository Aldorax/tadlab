"use client";

import NavBar from "@/components/navbar";
import PublicationsGrid from "@/components/publications";
import ResearchOverview from "@/components/research-overview";
import { Button } from "@/components/ui/button";
import { Search, Users, Copy, FileText, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function LandingPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -420, // card width (400px) + gap (20px)
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 420, // card width (400px) + gap (20px)
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative max-h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/projects.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* Navigation */}
        <NavBar />

        {/* Hero Content */}
        <div className="relative z-10 px-8 lg:px-16 pt-32 lg:pt-40 pb-32 flex items-center h-[90vh] font-bricolage">
          <div className="max-w-3xl md:max-w-5xl">
            <h2 className="text-5xl text-[180px] font-bold text-white mb-6 leading-[1.1]">
              PROJECTS
            </h2>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-[#fff] py-24">
        <div className="container mx-auto px-8">
          <div className="flex justify-between">
            <div className="flex items-start gap-4 mb-16">
              <div className="w-3 h-3 rounded-full bg-[#4ade80] mt-2" />
              <h2 className="text-4xl font-bold text-[#1a1a1a]">Intro</h2>
            </div>

            <div className="mb-6">
              <h3 className="text-5xl font-bold text-[#1a1a1a] text-right mb-8">
                Research and Initiatives
              </h3>
              <p className="text-[#767676] text-lg text-right max-w-3xl ml-auto leading-relaxed mb-8">
                The African Futures and Disruption Studies Lab conducts collaborative, solutions-driven research focused on understanding societal disruptions across Africa and translating evidence into practical insights for policy and practice.
<br />
<br />
Our research combines analytical rigor with participatory methods and real-world experimentation, allowing us to study change as it unfolds and to co-develop responses grounded in lived realities.
              </p>
            </div>
          </div>
        </div>
      </section>
 <ResearchOverview />

      {/* Footer */}
      <footer className="bg-[#000000] py-4 text-white">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-3 pb-16 border-b border-[#333333]">
            {/* Column 1 */}
            <div className="border p-4 border-[#333333]">
            <div className="flex gap-4 items-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="mb-4"
                priority
              />
              <div className="text-2xl font-bold">
                The Africa Disruptions Lab {" "} <br />
                <span className="text-lg">
                (TADLab)
                </span>
              </div>
            </div>
             <p className="text-[#d1d1d1] leading-relaxed">
                A collaborative research platform dedicated to understanding
                societal disruption across Africa and translating evidence into
                practical, policy-relevant solutions.
              </p>
</div>
            {/* Column 2 */}
            <div className="border p-4 border-[#333333]">
              <h3 className="text-[#767676] text-2xl font-semibold mb-6">
                Let's Talk
              </h3>
              <div className="space-y-3 mb-8">
                <p className="text-white text-lg">+971-5070-8100</p>
                <p className="text-white text-lg">hello@terahaus.com</p>
              </div>
              <div>
                <h4 className="text-[#767676] text-xl font-semibold mb-4">
                  Follow our socials
                </h4>
                <div className="space-y-2">
                  <p className="text-white">Instagram</p>
                  <p className="text-white">Twitter (X)</p>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="border p-4 border-[#333333]">
              <h3 className="text-[#767676] text-2xl font-semibold mb-6">
                Link
              </h3>
              <nav className="space-y-3">
                <Link
                  href="#home"
                  className="block text-white hover:text-[#d1d1d1] transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="#about"
                  className="block text-white hover:text-[#d1d1d1] transition-colors"
                >
                  ABout US
                </Link>
                <Link
                  href="#projects"
                  className="block text-white hover:text-[#d1d1d1] transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="#contact"
                  className="block text-white hover:text-[#d1d1d1] transition-colors"
                >
                  Contact US
                </Link>
              </nav>
            </div>
          </div>

          {/* Decorative pattern */}
          <div
            className="h-32 mt-8 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                #d1d1d1 10px,
                #d1d1d1 11px
              )`,
            }}
          />
        </div>
      </footer>
    </div>
  );
}
