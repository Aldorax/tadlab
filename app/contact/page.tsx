"use client";

import ConstructionBanner from "@/components/construction-banner";
import ContactSection from "@/components/contact";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Construction Banner */}
      <ConstructionBanner />

      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/contact.jpg')",
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
              CONTACT US
            </h2>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
