import ConstructionBanner from "@/components/construction-banner";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import PublicationsGrid from "@/components/publications";
import { getProjects } from "@/app/actions/projects";
import { getPageBuilderContent } from "@/lib/site-builder";
import Image from "next/image"

const defaultProjects = [
  {
    id: "1",
    image: "/images/about/1.jpg",
    tags: ["Tech", "Political Change"],
    title: "Governance Under Pressure: Institutional Responses to Political Disruption",
    description: "This research project examines how digital platforms and social media shape youth political engagement, protest movements, and new forms Focusing...",
  },
  {
    id: "2",
    image: "/images/about/2.jpg",
    tags: ["Tech", "Political Change"],
    title: "Irinkérindó: A Journal of African Migration",
    description: "Irinkérindó is a peer-reviewed journal dedicated to advancing scholarly understanding of African migration, mobility, and displacement.",
  },
  {
    id: "3",
    image: "/images/about/3.jpg",
    tags: ["Tech", "Political Change"],
    title: "Mobility, Borders, and Belonging: Rethinking Migration Governance in Africa",
    description: "This publication explores contemporary migration governance frameworks across Africa, questioning existing policy assumptions and proposing alterna...",
  },
  {
    id: "4",
    image: "/images/about/4.jpg",
    tags: ["Tech", "Political Change"],
    title: "Governance Under Pressure: Institutional Responses to Political Disruption",
    description: "This research project examines how digital platforms and social media shape youth political engagement, protest movements, and new forms Focusing...",
  },
  {
    id: "5",
    image: "/images/about/5.jpg",
    tags: ["Tech", "Political Change"],
    title: "Irinkérindó: A Journal of African Migration",
    description: "Irinkérindó is a peer-reviewed journal dedicated to advancing scholarly understanding of African migration, mobility, and displacement.",
  },
  {
    id: "6",
    image: "/images/about/6.jpg",
    tags: ["Tech", "Political Change"],
    title: "Mobility, Borders, and Belonging: Rethinking Migration Governance in Africa",
    description: "This publication explores contemporary migration governance frameworks across Africa, questioning existing policy assumptions and proposing alterna...",
  },
  {
    id: "7",
    image: "/images/about/7.jpg",
    tags: ["Tech", "Political Change"],
    title: "Governance Under Pressure: Institutional Responses to Political Disruption",
    description: "This research project examines how digital platforms and social media shape youth political engagement, protest movements, and new forms Focusing...",
  },
  {
    id: "8",
    image: "/images/about/8.jpg",
    tags: ["Tech", "Political Change"],
    title: "Irinkérindó: A Journal of African Migration",
    description: "Irinkérindó is a peer-reviewed journal dedicated to advancing scholarly understanding of African migration, mobility, and displacement.",
  },
  {
    id: "9",
    image: "/images/about/9.jpg",
    tags: ["Tech", "Political Change"],
    title: "Mobility, Borders, and Belonging: Rethinking Migration Governance in Africa",
    description: "This publication explores contemporary migration governance frameworks across Africa, questioning existing policy assumptions and proposing alterna...",
  }
];

export default async function ProjectsPage() {
  const dbProjects = await getProjects();
  const hasPublishedProjects = dbProjects.length > 0;
  const projects = dbProjects.length > 0 ? dbProjects : defaultProjects;
  const sections = await getPageBuilderContent("projects");
  const hero = sections.hero || {};
  const intro = sections.intro || {};

  return (
    <div className="min-h-screen bg-white">
      {/* Construction Banner */}
      <ConstructionBanner />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-end pb-24 lg:pb-32 bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={typeof hero.image === "string" && hero.image ? hero.image : "/images/projects.jpg"} 
            alt="Projects TADLab" 
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
              <span className="text-sm font-medium text-white tracking-wide uppercase relative z-10 transition-transform duration-500 group-hover:translate-x-1">Innovation Lab</span>
              <div className="absolute inset-0 bg-white/5 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold text-white tracking-tighter leading-[0.9] font-bricolage whitespace-pre-line drop-shadow-lg">
              {typeof hero.title === "string" && hero.title ? hero.title : "PROJECTS"}
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
                    {typeof intro.sectionTitle === "string" && intro.sectionTitle ? intro.sectionTitle : "Intro"}
                  </h2>
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl font-bricolage whitespace-pre-line leading-[1.1]">
                  {typeof intro.heading === "string" && intro.heading ? intro.heading : "Research and Initiatives"}
                </h3>
              </div>
              
              <div className="lg:pt-16">
                 <p className="text-lg sm:text-xl leading-relaxed text-gray-600 whitespace-pre-line font-medium border-l-4 border-emerald-500 pl-6 h-full">
                  {typeof intro.description === "string" && intro.description
                    ? intro.description
                    : "The Africa Disruptions Lab conducts collaborative, solutions-driven research focused on understanding societal disruptions across Africa and translating evidence into practical insights for policy and practice.\n\nOur research combines analytical rigor with participatory methods and real-world experimentation, allowing us to study change as it unfolds and to co-develop responses grounded in lived realities."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <PublicationsGrid
        projects={projects}
        explorationEnabled={hasPublishedProjects}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
