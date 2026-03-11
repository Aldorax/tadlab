"use client";

import ConstructionBanner from "@/components/construction-banner";
import ContactSection from "@/components/contact";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { usePageBuilder } from "@/hooks/use-page-builder";

function readString(value: string | string[] | undefined, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export default function ContactPage() {
  const sections = usePageBuilder("contact");
  const hero = sections.hero || {};
  const contact = sections.contact || {};

  return (
    <div className="min-h-screen">
      <ConstructionBanner />

      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url('${readString(hero.image, "/images/contact.jpg")}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50" />
        <NavBar />

        <div className="relative z-10 px-8 lg:px-16 pt-32 lg:pt-40 pb-16 flex items-end h-full font-bricolage">
          <div className="max-w-3xl md:max-w-5xl">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1]">
              {readString(hero.title, "CONTACT US")}
            </h2>
          </div>
        </div>
      </section>

      <ContactSection
        content={{
          heading: readString(contact.heading, "Ready to Collaborate?\nLet's connect and Build"),
          generalTitle: readString(contact.generalTitle, "General Enquiries"),
          generalEmail: readString(contact.generalEmail, "info@africandisruptionslab.org"),
          emailTitle: readString(contact.emailTitle, "Email"),
          emailValue: readString(contact.emailValue, "info@africandisruptionslab.org"),
          phoneTitle: readString(contact.phoneTitle, "Phone Number"),
          phoneValue: readString(contact.phoneValue, "+971-5070-8100"),
          submitLabel: readString(contact.submitLabel, "Submit"),
          bottomImage: readString(contact.bottomImage, "/images/elephants.jpg"),
        }}
      />

      <Footer />
    </div>
  );
}
