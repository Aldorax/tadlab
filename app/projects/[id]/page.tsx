import { getProject } from "@/app/actions/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

type ProjectDetails = {
  id: string;
  image: string;
  tags: string[];
  title: string;
  description: string;
  fullDescription?: string | null;
  status?: string | null;
  team?: string | null;
  featuredLink?: string | null;
  featuredLinkLabel?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const defaultProjects = [
  {
    id: "1",
    image: "/images/about/1.jpg",
    tags: ["Tech", "Political Change"],
    title: "Governance Under Pressure: Institutional Responses to Political Disruption",
    description: "This research project examines how digital platforms and social media shape youth political engagement, protest movements, and new forms Focusing...",
    fullDescription:
      "This project examines how institutional systems respond when rapid political and social disruptions reshape public life. It brings together research, field insight, and practical engagement to understand where governance breaks down and where reform becomes possible.",
    status: "Active / Ongoing",
    team: "TADLab Research Division",
    featuredLink: "",
    featuredLinkLabel: "",
  },
  {
    id: "2",
    image: "/images/about/2.jpg",
    tags: ["Tech", "Political Change"],
    title: "Irinkérindó: A Journal of African Migration",
    description: "Irinkérindó is a peer-reviewed journal dedicated to advancing scholarly understanding of African migration, mobility, and displacement.",
    fullDescription:
      "Irinkérindó convenes scholarship, dialogue, and evidence on migration across Africa. The work combines editorial curation with wider public-facing engagement so research can circulate beyond the academy.",
    status: "Published",
    team: "TADLab Editorial Team",
    featuredLink: "",
    featuredLinkLabel: "",
  },
  {
    id: "3",
    image: "/images/about/3.jpg",
    tags: ["Tech", "Political Change"],
    title: "Mobility, Borders, and Belonging: Rethinking Migration Governance in Africa",
    description: "This publication explores contemporary migration governance frameworks across Africa, questioning existing policy assumptions and proposing alterna...",
    fullDescription:
      "The project explores mobility, displacement, and governance through interdisciplinary analysis. It focuses on how policy frameworks affect lived experiences and how alternative approaches can better address mobility across African contexts.",
    status: "Active / Ongoing",
    team: "Migration and Mobility Unit",
    featuredLink: "",
    featuredLinkLabel: "",
  },
  {
    id: "4",
    image: "/images/about/4.jpg",
    tags: ["Tech", "Political Change"],
    title: "Governance Under Pressure: Institutional Responses to Political Disruption",
    description: "This research project examines how digital platforms and social media shape youth political engagement, protest movements, and new forms Focusing...",
    fullDescription:
      "This initiative tracks institutional adaptation during periods of rapid change. It documents emerging governance practices, contested civic spaces, and opportunities for more accountable responses.",
    status: "Active / Ongoing",
    team: "TADLab Research Division",
    featuredLink: "",
    featuredLinkLabel: "",
  },
  {
    id: "5",
    image: "/images/about/5.jpg",
    tags: ["Tech", "Political Change"],
    title: "Irinkérindó: A Journal of African Migration",
    description: "Irinkérindó is a peer-reviewed journal dedicated to advancing scholarly understanding of African migration, mobility, and displacement.",
    fullDescription:
      "This body of work curates strong scholarship on African migration, displacement, and belonging, while also building a stronger bridge between researchers, policy actors, and the wider public.",
    status: "Published",
    team: "TADLab Editorial Team",
    featuredLink: "",
    featuredLinkLabel: "",
  },
  {
    id: "6",
    image: "/images/about/6.jpg",
    tags: ["Tech", "Political Change"],
    title: "Mobility, Borders, and Belonging: Rethinking Migration Governance in Africa",
    description: "This publication explores contemporary migration governance frameworks across Africa, questioning existing policy assumptions and proposing alterna...",
    fullDescription:
      "The work studies how border regimes, migration systems, and local communities interact in practice. It is designed to produce clearer evidence for more humane and grounded policy choices.",
    status: "Active / Ongoing",
    team: "Migration and Mobility Unit",
    featuredLink: "",
    featuredLinkLabel: "",
  },
  {
    id: "7",
    image: "/images/about/7.jpg",
    tags: ["Tech", "Political Change"],
    title: "Governance Under Pressure: Institutional Responses to Political Disruption",
    description: "This research project examines how digital platforms and social media shape youth political engagement, protest movements, and new forms Focusing...",
    fullDescription:
      "This project focuses on the pressures institutions face as public expectations, technologies, and political realities shift. It looks for practical pathways to resilience and reform.",
    status: "Active / Ongoing",
    team: "TADLab Research Division",
    featuredLink: "",
    featuredLinkLabel: "",
  },
  {
    id: "8",
    image: "/images/about/8.jpg",
    tags: ["Tech", "Political Change"],
    title: "Irinkérindó: A Journal of African Migration",
    description: "Irinkérindó is a peer-reviewed journal dedicated to advancing scholarly understanding of African migration, mobility, and displacement.",
    fullDescription:
      "Irinkérindó develops rigorous, accessible conversations about migration and belonging. It creates space for scholarship that is regionally grounded and globally relevant.",
    status: "Published",
    team: "TADLab Editorial Team",
    featuredLink: "",
    featuredLinkLabel: "",
  },
  {
    id: "9",
    image: "/images/about/9.jpg",
    tags: ["Tech", "Political Change"],
    title: "Mobility, Borders, and Belonging: Rethinking Migration Governance in Africa",
    description: "This publication explores contemporary migration governance frameworks across Africa, questioning existing policy assumptions and proposing alterna...",
    fullDescription:
      "The research investigates the intersection of migration governance, border practices, and social belonging. It supports clearer interpretation of changing mobility patterns across the continent.",
    status: "Active / Ongoing",
    team: "Migration and Mobility Unit",
    featuredLink: "",
    featuredLinkLabel: "",
  }
];

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // Try to fetch from DB first
  let project = (await getProject(id)) as ProjectDetails | null;
  
  // If not found in DB, check mock data
  if (!project) {
    const defaultProject = defaultProjects.find(p => p.id === id);
    if (!defaultProject) {
      notFound();
    }
    // Typecast mock data to match project structure mostly
    project = {
        ...defaultProject,
        createdAt: new Date(),
        updatedAt: new Date()
    };
  }

  // Next.js hydration complains if we render a non-serializable Date implicitly so format it, but for our case it doesn't matter since project properties are just passed manually.
  const projectStatus = project?.status || "Active / Ongoing";
  const projectTeam = project?.team || "TADLab Research Division";
  const projectOverview = project?.fullDescription || project?.description;
  const projectLink = project?.featuredLink || "";
  const projectLinkLabel = project?.featuredLinkLabel || "Download Full Report";

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-black text-white px-4 py-2 text-center text-sm font-medium tracking-wide border-b border-white/10">
        Discover Our Work
      </div>
      
      {/* Navigation */}
      <div className="absolute top-10 w-full z-40">
        <NavBar />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-end pb-24 lg:pb-32 bg-black overflow-hidden pt-40">
        <div className="absolute inset-0 z-0">
          <Image 
            src={project?.image || "/images/projects.jpg"} 
            alt={project?.title || "Project Image"} 
            fill 
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
        
        <div className="relative z-20 container mx-auto px-6 lg:px-8 mt-auto">
          <div className="max-w-4xl">
            <Link href="/projects" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold mb-8 transition-colors group">
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {project?.tags?.map((tag: string) => (
                <span key={tag} className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] font-bricolage mb-6">
              {project?.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-8">
               <div className="prose prose-lg md:prose-xl prose-gray max-w-none">
                 <p className="text-2xl text-gray-900 leading-relaxed font-medium mb-12 border-l-4 border-emerald-500 pl-6 lg:pl-8">
                    {project?.description}
                 </p>
                 
                 {/* This handles any future rich-content parsing if needed */}
                 <div className="bg-gray-50 rounded-3xl p-8 sm:p-12 border border-gray-100">
                    <h3 className="text-sm font-bold tracking-widest text-emerald-600 uppercase mb-8">About This Initiative</h3>
                    <p className="text-gray-600 leading-loose whitespace-pre-line">{projectOverview}</p>
                 </div>
               </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-4 h-full relative">
               <div className="sticky top-12 bg-black rounded-3xl p-8 border border-gray-100/10 shadow-2xl text-white">
                  <h3 className="text-2xl font-bold font-bricolage mb-8">Project Details</h3>
                  
                  <div className="space-y-6">
                     <div className="flex flex-col gap-2">
                        <span className="text-gray-500 text-sm font-semibold uppercase tracking-widest">Status</span>
                        <div className="flex items-center gap-2 text-emerald-400">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                          </span>
                          <span className="font-bold">{projectStatus}</span>
                        </div>
                     </div>
                     
                     <div className="h-px w-full bg-white/10" />

                     <div className="flex flex-col gap-2">
                        <span className="text-gray-500 text-sm font-semibold uppercase tracking-widest">Category</span>
                        <span className="font-medium text-gray-300">
                           {project?.tags?.[0] || "Innovation"}
                        </span>
                     </div>
                     
                     <div className="h-px w-full bg-white/10" />

                     <div className="flex flex-col gap-2">
                        <span className="text-gray-500 text-sm font-semibold uppercase tracking-widest">Team</span>
                        <span className="font-medium text-gray-300">{projectTeam}</span>
                     </div>
                  </div>

                  {projectLink ? (
                    <Link
                      href={projectLink}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full mt-10 bg-white text-black hover:bg-emerald-50 hover:text-emerald-700 py-4 rounded-xl font-bold transition-colors text-center"
                    >
                      {projectLinkLabel}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full mt-10 bg-white/10 text-white/50 py-4 rounded-xl font-bold cursor-not-allowed"
                    >
                      No external project link yet
                    </button>
                  )}
               </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
