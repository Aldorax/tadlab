"use client";

import ConstructionBanner from "@/components/construction-banner";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Search, Users, Copy, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function LandingPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -520, // card width (500px) + gap (20px)
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 520, // card width (500px) + gap (20px)
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen font-bricolage">
      {/* Construction Banner */}
      <ConstructionBanner />

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
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50" />

        {/* Navigation */}
        <NavBar />

        {/* Hero Content */}
        <div className="relative z-10 px-8 lg:px-16 pt-32 lg:pt-40 pb-32 flex items-center h-[90vh] font-bricolage">
          <div className="max-w-3xl md:max-w-5xl">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
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
            <Link href="/research">
              <Button className="bg-[#000000] hover:bg-[#1a1a1a] text-white rounded-lg px-8 py-4 md:py-6 text-base font-medium transition-all hover:scale-105">
                Explore Our Research
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-[#f5f5f5] py-24">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-start gap-4 mb-16">
              <div className="w-3 h-3 rounded-full bg-[#4ade80] mt-2" />
              <h2 className="text-4xl font-bold text-[#1a1a1a]">About Us</h2>
            </div>

            <div className="mb-16">
              <h3 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] text-right mb-8">
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
                <Link href="/about-us">
                  <Button className="bg-[#000000] hover:bg-[#1a1a1a] text-white rounded-lg px-8 py-3 md:py-6 transition-all hover:scale-105">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg">
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
            <h3 className="text-3xl md:text-5xl font-bold text-white text-right mb-8">
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
      <section className="bg-[#f5f5f5] py-24">
        <div className="container mx-auto px-8">
          <div className="flex items-start flex-col md:flex-row justify-between mb-16">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-black mt-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">Projects</h2>
            </div>
            <div className="flex flex-col gap-2 mt-8 md:mt-0">
              <h3 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] md:text-right mb-4">
                Featured Research and Initiatives
              </h3>
              <p className="text-[#767676] text-lg md:text-right max-w-2xl md:ml-auto leading-relaxed mb-4">
                A selection of current projects and recent outputs that illustrate
                the lab&apos;s focus and approach.
              </p>
              <Link href="/projects" className="md:ml-auto">
                <Button className="bg-[#000000] hover:bg-[#1a1a1a] text-white rounded-lg px-8 py-3 md:py-6 transition-all hover:scale-105">
                  View All
                </Button>
              </Link>
            </div>
          </div>

          {/* Projects Carousel with Overlay Navigation */}
          <div className="relative group">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white rounded-full p-3 shadow-xl transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white rounded-full p-3 shadow-xl transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

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
              <div className="min-w-[500px] shrink-0 overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image
                    src="/africa-map-political-disruption-concept.jpg"
                    alt="Political disruption research"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    <span className="bg-[#000000] text-white text-xs px-3 py-1 rounded-full">
                      Governance
                    </span>
                    <span className="bg-[#000000] text-white text-xs px-3 py-1 rounded-full">
                      Political Change
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-[#1a1a1a] mb-3">
                    Governance Under Pressure: Institutional Responses to
                    Political Disruption
                  </h4>
                  <p className="text-[#767676] text-sm leading-relaxed">
                    This research project examines how digital platforms and
                    social media shape youth political engagement, protest
                    movements, and new forms focusing...
                  </p>
                </div>
              </div>

              {/* Project 2 */}
              <div className="min-w-[500px] shrink-0 overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image
                    src="/african-woman-scholar-with-books-library.jpg"
                    alt="Migration research journal"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    <span className="bg-[#000000] text-white text-xs px-3 py-1 rounded-full">
                      Migration
                    </span>
                    <span className="bg-[#000000] text-white text-xs px-3 py-1 rounded-full">
                      Research
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-[#1a1a1a] mb-3">
                    Ìrìnkèrindò: A Journal of African Migration
                  </h4>
                  <p className="text-[#767676] text-sm leading-relaxed">
                    Ìrìnkèrindò is a peer-reviewed journal dedicated to advancing
                    scholarly understanding of African migration, mobility, and
                    displacement.
                  </p>
                </div>
              </div>

              {/* Project 3 */}
              <div className="min-w-[500px] shrink-0 overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image
                    src="/african-people-with-water-containers-migration.jpg"
                    alt="Migration governance research"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    <span className="bg-[#000000] text-white text-xs px-3 py-1 rounded-full">
                      Policy
                    </span>
                    <span className="bg-[#000000] text-white text-xs px-3 py-1 rounded-full">
                      Migration
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-[#1a1a1a] mb-3">
                    Mobility, Borders, and Belonging: Rethinking Migration
                    Governance in Africa
                  </h4>
                  <p className="text-[#767676] text-sm leading-relaxed">
                    This publication explores contemporary migration governance
                    frameworks across Africa, questioning existing policy
                    assumptions and proposing alterna...
                  </p>
                </div>
              </div>

              {/* Project 4 */}
              <div className="min-w-[500px] shrink-0 overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image
                    src="/african-people-with-water-containers-migration.jpg"
                    alt="Migration governance research"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    <span className="bg-[#000000] text-white text-xs px-3 py-1 rounded-full">
                      Technology
                    </span>
                    <span className="bg-[#000000] text-white text-xs px-3 py-1 rounded-full">
                      Innovation
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-[#1a1a1a] mb-3">
                    Digital Transformation and Social Change in African Cities
                  </h4>
                  <p className="text-[#767676] text-sm leading-relaxed">
                    Examining how rapid technological adoption is reshaping urban
                    governance, economic opportunities, and social structures
                    across major African cities...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Work Matters Section */}
      <section className="bg-[#f5f5f5] py-24">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-16">
            <div className="flex gap-4 items-start">
              <div className="w-3 h-3 rounded-full bg-[#4ade80] mt-2" />
              <h2 className="text-4xl font-bold text-[#1a1a1a]">
                Why This Work Matters
              </h2>
            </div>
            <div className="mb-16">
              <h3 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] md:text-right mb-4">
                Building Resilient Futures
              </h3>
              <p className="text-[#767676] text-lg md:text-right max-w-3xl md:ml-auto leading-relaxed">
                Societal disruptions rarely occur in isolation. By identifying
                shared patterns and testing practical responses, the lab supports
                evidence-based strategies that strengthen resilience, inclusion,
                and informed policy responses across Africa.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg">
            <Image
              src="/images/homelast.jpg"
              alt="African fishermen working together"
              width={1400}
              height={600}
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
