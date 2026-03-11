"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const tabs = ["All", "Ongoing Research Projects", "Publications", "Pilot Actions", "Social Experiments", "Journals"]

export interface ProjectItem {
  id: string;
  image: string;
  tags: string[];
  title: string;
  description: string;
}

export default function PublicationsGrid({
  projects: initialProjects,
  explorationEnabled = true,
}: {
  projects: ProjectItem[];
  explorationEnabled?: boolean;
}) {
  const [activeTab, setActiveTab] = useState("All");
  const [projects, setProjects] = useState(initialProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9; // 3x3 grid

  useEffect(() => {
    setProjects(initialProjects);
    setCurrentPage(1);
  }, [initialProjects]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (data?.type === 'PREVIEW_PROJECT') {
        setProjects(prev => {
          const newPreview = { id: 'preview-proj', ...data.payload };
          const others = initialProjects;
          return [newPreview, ...others.filter(p => p.id !== 'preview-proj')];
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [initialProjects]);

  // If we had actual tags on the backend we could filter here. Currently treating all as "All" unless mocked.
  const filteredProjects = activeTab === "All" 
    ? projects 
    : projects.filter(p => p.tags?.includes(activeTab) || (activeTab === "Publications" && p.tags?.includes("Research")));

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50/50 py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-16 items-center justify-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeTab === tab 
                  ? "bg-black text-white border-black shadow-md scale-105" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 mb-20">
          {paginatedProjects.map((item) => {
            const cardClasses = "group flex flex-col items-center";

            const cardContent = (
              <>
                <div className="w-full aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-xl group-hover:shadow-2xl transition-all duration-500 mb-6 relative border border-gray-100/50">
                 {item.image ? (
                   <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                 ) : (
                   <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 font-semibold tracking-widest uppercase text-sm">No Image</span>
                   </div>
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 
                 {/* Floating tags */}
                 <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    {item.tags.map((tag) => (
                      <span key={tag} className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        {tag}
                      </span>
                    ))}
                 </div>
              </div>
              
              <div className="w-full px-2">
                 <h3 className="text-2xl font-bold font-bricolage text-gray-900 mb-4 leading-tight group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
                   {item.title}
                 </h3>
                 <p className="text-gray-600 text-base leading-relaxed line-clamp-3 font-medium">
                   {item.description}
                 </p>
                 {explorationEnabled && (
                   <div className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                      Read Explore
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                   </div>
                 )}
              </div>
              </>
            );

            if (!explorationEnabled) {
              return (
                <div
                  key={item.id}
                  aria-disabled="true"
                  className={cardClasses}
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <Link href={`/projects/${item.id}`} key={item.id} className={cardClasses}>
                {cardContent}
              </Link>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3">
            <Button
              variant="outline"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-6 rounded-full border-gray-200 text-gray-900 hover:bg-gray-100 font-bold transition-all disabled:opacity-50"
            >
              <span className="sr-only">Previous page</span>
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </Button>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                    currentPage === page
                      ? "bg-black text-white shadow-md scale-110"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-6 py-6 rounded-full border-gray-200 text-gray-900 hover:bg-gray-100 font-bold transition-all disabled:opacity-50"
            >
              Next
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
