"use client";

import ContactSection from "@/components/contact";
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
          backgroundImage: "url('/images/contact.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* Navigation */}
        <NavBar />

        {/* Hero Content */}
        <div className="relative z-10 px-8 lg:px-16 pt-32 lg:pt-40 pb-32 flex h-[50vh] font-bricolage">
          <div className="max-w-3xl md:max-w-5xl">
            <h2 className="text-5xl text-[150px] font-bold text-white mb-6 leading-[1.1] relative -bottom-[80%]">
              CONTACT US
            </h2>
          </div>
        </div>
      </section>

 <ContactSection />

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
                  About us
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
                  Contact us
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
