"use client";

import ConstructionBanner from "@/components/construction-banner";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Search, Users, Copy, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { getProjects } from "@/app/actions/projects";
import { usePageBuilder } from "@/hooks/use-page-builder";

const defaultProjects = [
  {
    id: "1",
    image: "/africa-map-political-disruption-concept.jpg",
    tags: ["Governance", "Political Change"],
    title: "Governance Under Pressure: Institutional Responses to Political Disruption",
    description: "This research project examines how digital platforms and social media shape youth political engagement, protest movements, and new forms focusing...",
  },
  {
    id: "2",
    image: "/african-woman-scholar-with-books-library.jpg",
    tags: ["Migration", "Research"],
    title: "Ìrìnkèrindò: A Journal of African Migration",
    description: "Ìrìnkèrindò is a peer-reviewed journal dedicated to advancing scholarly understanding of African migration, mobility, and displacement.",
  },
  {
    id: "3",
    image: "/african-people-with-water-containers-migration.jpg",
    tags: ["Policy", "Migration"],
    title: "Mobility, Borders, and Belonging: Rethinking Migration Governance in Africa",
    description: "This publication explores contemporary migration governance frameworks across Africa, questioning existing policy assumptions and proposing alterna...",
  },
  {
    id: "4",
    image: "/african-people-with-water-containers-migration.jpg",
    tags: ["Technology", "Innovation"],
    title: "Digital Transformation and Social Change in African Cities",
    description: "Examining how rapid technological adoption is reshaping urban governance, economic opportunities, and social structures across major African cities...",
  },
];

function readString(value: string | string[] | undefined, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export default function LandingPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sections = usePageBuilder("homepage");
  const [projects, setProjects] = useState<any[]>(defaultProjects);

  const hero = sections.hero || {};
  const about = sections.about || {};
  const howWeWork = sections.howWeWork || {};
  const projectsShowcase = sections.projectsShowcase || {};
  const whyItMatters = sections.whyItMatters || {};

  useEffect(() => {
    async function fetchData() {
      const projectsData = await getProjects();
      if (projectsData && projectsData.length > 0) {
        if (projectsData.length < 4) {
          const needed = 4 - projectsData.length;
          setProjects([...projectsData, ...defaultProjects.slice(0, needed)]);
        } else {
          setProjects(projectsData);
        }
      }
    }

    void fetchData();

    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (data?.type === "PREVIEW_PROJECT") {
        setProjects((prev) => {
          const newPreview = { id: "preview-proj", ...data.payload };
          const others = prev.filter((project) => !project.id.toString().startsWith("preview-"));
          const combined = [newPreview, ...others];
          if (combined.length < 4) {
            const needed = 4 - combined.length;
            return [...combined, ...defaultProjects.slice(0, needed)];
          }
          return combined;
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -520,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 520,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen font-bricolage">
      <ConstructionBanner />

      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('${readString(hero.image, "/images/hero2.jpg")}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50" />
        <NavBar />

        <div className="relative z-10 px-8 lg:px-16 pt-32 lg:pt-40 pb-32 flex items-center h-[90vh] font-bricolage">
          <div className="max-w-3xl md:max-w-5xl">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] whitespace-pre-line">
              {readString(hero.title)}
            </h2>
            <p className="text-base md:text-xl text-white/90 mb-8 font-semibold leading-relaxed max-w-4xl whitespace-pre-line">
              {readString(hero.description)}
            </p>
            <Link href={readString(hero.ctaHref, "/research")}>
              <Button className="bg-[#000000] hover:bg-[#1a1a1a] text-white rounded-lg px-8 py-4 md:py-6 text-base font-medium transition-all hover:scale-105">
                {readString(hero.ctaLabel, "Explore Our Research")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-24">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-start gap-4 mb-16">
              <div className="w-3 h-3 rounded-full bg-[#4ade80] mt-2" />
              <h2 className="text-4xl font-bold text-[#1a1a1a]">{readString(about.sectionTitle, "About Us")}</h2>
            </div>

            <div className="mb-16">
              <h3 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] text-right mb-8 whitespace-pre-line">
                {readString(about.heading)}
              </h3>
              <p className="text-[#767676] text-lg text-right max-w-3xl ml-auto leading-relaxed mb-8 whitespace-pre-line">
                {readString(about.description)}
              </p>
              <div className="flex justify-end">
                <Link href={readString(about.ctaHref, "/about-us")}>
                  <Button className="bg-[#000000] hover:bg-[#1a1a1a] text-white rounded-lg px-8 py-3 md:py-6 transition-all hover:scale-105">
                    {readString(about.ctaLabel, "Learn More")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg">
            <Image
              src={readString(about.image, "/images/zebra.jpg")}
              alt={readString(about.sectionTitle, "About section")}
              width={1400}
              height={600}
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#000000] py-24">
        <div className="container mx-auto px-8">
          <div className="flex items-start gap-4 mb-16">
            <div className="w-3 h-3 rounded-full bg-[#4ade80] mt-2" />
            <h2 className="text-4xl font-bold text-[#d1d1d1]">{readString(howWeWork.sectionTitle, "How We Work")}</h2>
          </div>

          <div className="mb-20">
            <h3 className="text-3xl md:text-5xl font-bold text-white text-right mb-8 whitespace-pre-line">
              {readString(howWeWork.heading)}
            </h3>
            <p className="text-[#767676] text-lg text-right max-w-2xl ml-auto leading-relaxed whitespace-pre-line">
              {readString(howWeWork.description)}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="border-t border-[#333333] pt-6">
              <div className="text-[#767676] text-sm font-mono mb-6">01</div>
              <Search className="w-12 h-12 text-white mb-6" />
              <h4 className="text-xl font-bold text-white mb-4 whitespace-pre-line">{readString(howWeWork.step1Title)}</h4>
              <p className="text-[#767676] text-sm leading-relaxed whitespace-pre-line">{readString(howWeWork.step1Description)}</p>
            </div>

            <div className="border-t border-[#333333] pt-6">
              <div className="text-[#767676] text-sm font-mono mb-6">02</div>
              <Users className="w-12 h-12 text-white mb-6" />
              <h4 className="text-xl font-bold text-white mb-4 whitespace-pre-line">{readString(howWeWork.step2Title)}</h4>
              <p className="text-[#767676] text-sm leading-relaxed whitespace-pre-line">{readString(howWeWork.step2Description)}</p>
            </div>

            <div className="border-t border-[#333333] pt-6">
              <div className="text-[#767676] text-sm font-mono mb-6">03</div>
              <Copy className="w-12 h-12 text-white mb-6" />
              <h4 className="text-xl font-bold text-white mb-4 whitespace-pre-line">{readString(howWeWork.step3Title)}</h4>
              <p className="text-[#767676] text-sm leading-relaxed whitespace-pre-line">{readString(howWeWork.step3Description)}</p>
            </div>

            <div className="border-t border-[#333333] pt-6">
              <div className="text-[#767676] text-sm font-mono mb-6">04</div>
              <FileText className="w-12 h-12 text-white mb-6" />
              <h4 className="text-xl font-bold text-white mb-4 whitespace-pre-line">{readString(howWeWork.step4Title)}</h4>
              <p className="text-[#767676] text-sm leading-relaxed whitespace-pre-line">{readString(howWeWork.step4Description)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-24">
        <div className="container mx-auto px-8">
          <div className="flex items-start flex-col md:flex-row justify-between mb-16">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-black mt-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">{readString(projectsShowcase.sectionTitle, "Projects")}</h2>
            </div>
            <div className="flex flex-col gap-2 mt-8 md:mt-0">
              <h3 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] md:text-right mb-4 whitespace-pre-line">
                {readString(projectsShowcase.heading)}
              </h3>
              <p className="text-[#767676] text-lg md:text-right max-w-2xl md:ml-auto leading-relaxed mb-4 whitespace-pre-line">
                {readString(projectsShowcase.description)}
              </p>
              <Link href={readString(projectsShowcase.ctaHref, "/projects")} className="md:ml-auto">
                <Button className="bg-[#000000] hover:bg-[#1a1a1a] text-white rounded-lg px-8 py-3 md:py-6 transition-all hover:scale-105">
                  {readString(projectsShowcase.ctaLabel, "View All")}
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white rounded-full p-3 shadow-xl transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={scrollRight}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white rounded-full p-3 shadow-xl transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide"
              style={{
                scrollBehavior: "smooth",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {projects.map((project) => (
                <div key={project.id} className="max-w-[325px] md:max-w-[460px] shrink-0 overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <Image
                      src={project.image || "/images/about/1.jpg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {project.tags.map((tag: string) => (
                        <span key={tag} className="bg-[#000000] text-white text-xs px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-2xl font-bold text-[#1a1a1a] mb-3">{project.title}</h4>
                    <p className="text-[#767676] text-sm leading-relaxed line-clamp-3">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-24">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-16">
            <div className="flex gap-4 items-start">
              <div className="w-3 h-3 rounded-full bg-[#4ade80] mt-2" />
              <h2 className="text-4xl font-bold text-[#1a1a1a]">{readString(whyItMatters.sectionTitle, "Why This Work Matters")}</h2>
            </div>
            <div className="mb-16">
              <h3 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] md:text-right mb-4 whitespace-pre-line">
                {readString(whyItMatters.heading)}
              </h3>
              <p className="text-[#767676] text-lg md:text-right max-w-3xl md:ml-auto leading-relaxed whitespace-pre-line">
                {readString(whyItMatters.description)}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg">
            <Image
              src={readString(whyItMatters.image, "/images/homelast.jpg")}
              alt={readString(whyItMatters.sectionTitle, "Why it matters")}
              width={1400}
              height={600}
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
