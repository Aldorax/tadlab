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
        className="relative h-[50vh] min-h-[420px] bg-cover bg-center sm:h-[60vh]"
        style={{
          backgroundImage: `url('${readString(hero.image, "/images/contact.jpg")}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50" />
        <NavBar />

        <div className="relative z-10 flex h-full items-end px-4 pb-12 pt-28 sm:px-6 sm:pt-32 md:px-8 lg:px-16 lg:pb-16 lg:pt-40 font-bricolage">
          <div className="max-w-3xl md:max-w-5xl">
            <h2 className="mb-4 text-4xl font-bold leading-[1.1] text-white sm:text-5xl md:text-7xl lg:text-8xl">
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
