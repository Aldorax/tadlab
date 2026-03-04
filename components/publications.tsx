"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const tabs = ["All", "Ongoing Research Projects", "Publications", "Pilot Actions", "Social Experiments", "Journals"]

export interface ProjectItem {
  id: string;
  image: string;
  tags: string[];
  title: string;
  description: string;
}

export default function PublicationsGrid({ projects: initialProjects }: { projects: ProjectItem[] }) {
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

  const totalPages = Math.max(1, Math.ceil(projects.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto py-12">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${activeTab === tab ? "bg-[#000000] text-white" : "bg-[#f5f5f5] text-[#1a1a1a] hover:bg-[#e5e5e5]"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {paginatedProjects.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            {/* Image */}
            <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-3 flex-wrap">
              {item.tags.map((tag) => (
                <span key={tag} className="bg-[#000000] text-white px-3 py-1 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-[#000000] mb-2 leading-tight">{item.title}</h3>

            {/* Description */}
            <p className="text-sm text-[#484848] leading-relaxed line-clamp-3">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-5 py-2 border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#f5f5f5] bg-transparent disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${currentPage === page
                  ? "bg-black text-white"
                  : "bg-[#f5f5f5] text-[#1a1a1a] hover:bg-[#e5e5e5]"
                }`}
            >
              {page}
            </button>
          ))}

          <Button
            variant="outline"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-5 py-2 border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#f5f5f5] bg-transparent disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
