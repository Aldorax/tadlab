"use client";

import NavBar from "@/components/navbar";
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
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero2.jpg')",
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
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Understanding Disruption.
              <br />
              Shaping Africa&apos;s Future.
            </h2>
            <p className="text-base md:text-xl text-white/90 mb-8 font-semibold leading-relaxed max-w-4xl">
              The African Futures and Disruption Studies Lab is a collaborative
              research platform dedicated to understanding social, political,
              economic, and technological disruptions across Africa — and
              translating evidence into practical, policy-relevant solutions.
            </p>
            <Button className="bg-[#000000] hover:bg-[#1a1a1a] text-white rounded-lg px-8 py-4 md:py-6 text-base font-medium transition-all">
              Explore Our Research
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-[#f5f5f5] py-24">
        <div className="container mx-auto px-8">
          <div className="flex justify-between">
            <div className="flex items-start gap-4 mb-16">
              <div className="w-3 h-3 rounded-full bg-[#4ade80] mt-2" />
              <h2 className="text-4xl font-bold text-[#1a1a1a]">About Us</h2>
            </div>

            <div className="mb-16">
              <h3 className="text-5xl font-bold text-[#1a1a1a] text-right mb-8">
                Understanding Change,
                <br />
                Designing Solutions
              </h3>
              <p className="text-[#767676] text-lg text-right max-w-3xl ml-auto leading-relaxed mb-8">
                The African Futures and Disruption Studies Lab was created to
                address a growing gap between research and real-world action.
                Across Africa, rapid societal change is often studied after the
                fact and in isolation. The lab brings together researchers,
                practitioners, policymakers, and communities to study
                disruptions as they unfold, identify shared patterns, and
                co-create solutions grounded in real-world contexts.
              </p>
              <div className="flex justify-end">
                <Button className="bg-[#000000] hover:bg-[#1a1a1a] text-white rounded-lg px-8 py-3 md:py-6">
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            <Image
              src="/images/zebra.jpg"
              alt="African landscape with acacia tree"
              width={1400}
              height={600}
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="bg-[#000000] py-24">
        <div className="container mx-auto px-8">
          <div className="flex items-start gap-4 mb-16">
            <div className="w-3 h-3 rounded-full bg-[#4ade80] mt-2" />
            <h2 className="text-4xl font-bold text-[#d1d1d1]">How We Work</h2>
          </div>

          <div className="mb-20">
            <h3 className="text-5xl font-bold text-white text-right mb-8">
              A Solutions-Driven
              <br />
              Research Approach
            </h3>
            <p className="text-[#767676] text-lg text-right max-w-2xl ml-auto leading-relaxed">
              Our methodology is rooted in participatory, action-oriented
              research. We work directly within real-world settings to ensure
              that research findings are grounded, relevant, and actionable.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="border-t border-[#333333] pt-6">
              <div className="text-[#767676] text-sm font-mono mb-6">01</div>
              <Search className="w-12 h-12 text-white mb-6" />
              <h4 className="text-xl font-bold text-white mb-4">
                Identify Disruptions and
                <br />
                Underlying Patterns
              </h4>
              <p className="text-[#767676] text-sm leading-relaxed">
                We analyze social and political change across regions to detect
                recurring mechanisms.
              </p>
            </div>

            {/* Step 2 */}
            <div className="border-t border-[#333333] pt-6">
              <div className="text-[#767676] text-sm font-mono mb-6">02</div>
              <Users className="w-12 h-12 text-white mb-6" />
              <h4 className="text-xl font-bold text-white mb-4">
                Co-Create Research
                <br />
                with Stakeholders
              </h4>
              <p className="text-[#767676] text-sm leading-relaxed">
                Participants actively shape research questions, methods, and
                outcomes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="border-t border-[#333333] pt-6">
              <div className="text-[#767676] text-sm font-mono mb-6">03</div>
              <Copy className="w-12 h-12 text-white mb-6" />
              <h4 className="text-xl font-bold text-white mb-4">
                Design and Test Pilot
                <br />
                Actions
              </h4>
              <p className="text-[#767676] text-sm leading-relaxed">
                Practical initiatives are developed and implemented in real
                contexts.
              </p>
            </div>

            {/* Step 4 */}
            <div className="border-t border-[#333333] pt-6">
              <div className="text-[#767676] text-sm font-mono mb-6">04</div>
              <FileText className="w-12 h-12 text-white mb-6" />
              <h4 className="text-xl font-bold text-white mb-4">
                Translate Evidence into
                <br />
                Policy and Practice
              </h4>
              <p className="text-[#767676] text-sm leading-relaxed">
                Findings are presented in accessible formats to support informed
                decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {/* I want a horizontal slider with more than 3 projects */}
      <section className="bg-[#f5f5f5] py-24">
        <div className="container mx-auto px-8">
          <div className="flex items-start  justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-[#000] mt-2" />
              <h2 className="text-4xl font-bold text-[#1a1a1a]">Projects</h2>
            </div>
          <div className="mb-16 flex flex-col gap-2">
            <h3 className="text-5xl font-bold text-[#1a1a1a] text-right mb-4">
              Featured Research and Initiatives
            </h3>
            <p className="text-[#767676] text-lg text-right max-w-2xl ml-auto leading-relaxed">
              A selection of current projects and recent outputs that illustrate
              the lab's focus and approach.
            </p>
            <Button className="bg-[#000000] hover:bg-[#1a1a1a] text-white rounded-lg px-8 py-3 md:py-6 ml-auto">
              View All
            </Button>
          </div>
          </div>




          {/* Projects Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide"
            style={{ 
              scrollBehavior: 'smooth',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Project 1 */}
            <div className="max-w-[500px] flex-shrink-0 overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/africa-map-political-disruption-concept.jpg"
                  alt="Political disruption research"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="py-6">
                <div className="flex gap-2 mb-4">
                  <span className="bg-[#000000] text-white text-xs md:text-lg px-3 md:px-5 py-1 rounded-full">
                    Tech
                  </span>
                  <span className="bg-[#000000] text-white text-xs md:text-lg px-3 md:px-5 py-1 rounded-full">
                    Political Change
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-[#1a1a1a] mb-3">
                  Governance Under Pressure: Institutional Responses to
                  Political Disruption
                </h4>
                <p className="text-[#767676] text-sm md:text-lg leading-relaxed">
                  This research project examines how digital platforms and
                  social media shape youth political engagement, protest
                  movements, and new forms focusing...
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="max-w-[500px] flex-shrink-0 overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/african-woman-scholar-with-books-library.jpg"
                  alt="Migration research journal"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="py-6">
                <div className="flex gap-2 mb-4">
                  <span className="bg-[#000000] text-white text-xs md:text-lg px-3 md:px-5 py-1 rounded-full">
                    Tech
                  </span>
                  <span className="bg-[#000000] text-white text-xs md:text-lg px-3 md:px-5 py-1 rounded-full">
                    Political Change
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-[#1a1a1a] mb-3">
                  Ìrìnkèrindò: A Journal of African Migration
                </h4>
                <p className="text-[#767676] text-sm md:text-lg leading-relaxed">
                  Ìrìnkèrindò is a peer-reviewed journal dedicated to advancing
                  scholarly understanding of African migration, mobility, and
                  displacement.
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="max-w-[500px] flex-shrink-0 overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/african-people-with-water-containers-migration.jpg"
                  alt="Migration governance research"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="py-6">
                <div className="flex gap-2 mb-4">
                  <span className="bg-[#000000] text-white text-xs md:text-lg px-3 md:px-5 py-1 rounded-full">
                    Tech
                  </span>
                  <span className="bg-[#000000] text-white text-xs md:text-lg px-3 md:px-5 py-1 rounded-full">
                    Political Change
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-[#1a1a1a] mb-3">
                  Mobility, Borders, and Belonging: Rethinking Migration
                  Governance in Africa
                </h4>
                <p className="text-[#767676] text-sm md:text-lg leading-relaxed">
                  This publication explores contemporary migration governance
                  frameworks across Africa, questioning existing policy
                  assumptions and proposing alterna...
                </p>
              </div>
            </div>

            {/* Project 4 */}
            <div className="max-w-[500px] flex-shrink-0 overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/african-people-with-water-containers-migration.jpg"
                  alt="Migration governance research"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="py-6">
                <div className="flex gap-2 mb-4">
                  <span className="bg-[#000000] text-white text-xs md:text-lg px-3 md:px-5 py-1 rounded-full">
                    Tech
                  </span>
                  <span className="bg-[#000000] text-white text-xs md:text-lg px-3 md:px-5 py-1 rounded-full">
                    Political Change
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-[#1a1a1a] mb-3">
                  Mobility, Borders, and Belonging: Rethinking Migration
                  Governance in Africa
                </h4>
                <p className="text-[#767676] text-sm md:text-lg leading-relaxed">
                  This publication explores contemporary migration governance
                  frameworks across Africa, questioning existing policy
                  assumptions and proposing alterna...
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows Below Projects */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={scrollLeft}
              className="bg-black hover:bg-gray-900 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-12 h-12" />
            </button>
            <button
              onClick={scrollRight}
              className="bg-black hover:bg-gray-900 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-12 h-12" />
            </button>
          </div>
        </div>
      </section>

      {/* Why This Work Matters Section */}
      <section className="bg-[#f5f5f5] py-24">
        <div className="container mx-auto px-8">
          <div className="flex justify-between gap-4 mb-16">
          <div className="flex gap-4 justify-center">
            <div className="w-3 h-3 rounded-full bg-[#4ade80] mt-2" />
            <h2 className="text-4xl font-bold text-[#1a1a1a]">
              Why This Work Matter
            </h2>
          </div>
          <div className="mb-16">
            <h3 className="text-5xl font-bold text-[#1a1a1a] text-right mb-4">
              Why This Work Matters
            </h3>
            <p className="text-[#767676] text-lg text-right max-w-3xl ml-auto leading-relaxed">
              Societal disruptions rarely occur in isolation. By identifying
              shared patterns and testing practical responses, the lab supports
              evidence-based strategies that strengthen resilience, inclusion,
              and informed policy responses across Africa.
            </p>
          </div>
          </div>


          <div className=" overflow-hidden">
            <Image
              src="/african-fishermen-on-traditional-boat-in-ocean.jpg"
              alt="African fishermen working together"
              width={1400}
              height={600}
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000000] py-16 text-white">
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
