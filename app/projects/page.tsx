import ConstructionBanner from "@/components/construction-banner";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import PublicationsGrid from "@/components/publications";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/app/actions/projects";

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
  const projects = dbProjects.length > 0 ? dbProjects : defaultProjects;

  return (
    <div className="min-h-screen">
      {/* Construction Banner */}
      <ConstructionBanner />

      {/* Hero Section */}
      <section
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/projects.jpg')",
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
              PROJECTS
            </h2>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-[#fff] py-24">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-[#4ade80] mt-2" />
              <h2 className="text-4xl font-bold text-[#1a1a1a]">Intro</h2>
            </div>

            <div className="flex-1 md:max-w-3xl">
              <h3 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] md:text-right mb-8">
                Research and Initiatives
              </h3>
              <p className="text-[#767676] text-lg md:text-right leading-relaxed">
                The African Futures and Disruption Studies Lab conducts collaborative, solutions-driven research focused on understanding societal disruptions across Africa and translating evidence into practical insights for policy and practice.
                <br />
                <br />
                Our research combines analytical rigor with participatory methods and real-world experimentation, allowing us to study change as it unfolds and to co-develop responses grounded in lived realities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <PublicationsGrid projects={projects} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
