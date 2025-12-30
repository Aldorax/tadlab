"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const tabs = ["All", "Ongoing Research Projects", "Publications", "Pilot Actions", "Social Experiments", "Journals"]

const publications = [
  {
    id: 1,
    image: "/images/zebra.jpg",
    tags: ["Tech", "Political Change"],
    title: "Governance Under Pressure: Institutional Responses to Political Disruption",
    description:
      "This research project examines how digital platforms and social media shape youth political engagement, protest movements, and new forms Focusing...",
  },
  {
    id: 2,
    image: "/images/zebra.jpg",
    tags: ["Tech", "Political Change"],
    title: "Irinkérindó: A Journal of African Migration",
    description:
      "Irinkérindó is a peer-reviewed journal dedicated to advancing scholarly understanding of African migration, mobility, and displacement.",
  },
  {
    id: 3,
    image: "/images/zebra.jpg",
    tags: ["Tech", "Political Change"],
    title: "Mobility, Borders, and Belonging: Rethinking Migration Governance in Africa",
    description:
      "This publication explores contemporary migration governance frameworks across Africa, questioning existing policy assumptions and proposing alterna...",
  },
  {
    id: 4,
    image: "/images/zebra.jpg",
    tags: ["Tech", "Political Change"],
    title: "Governance Under Pressure: Institutional Responses to Political Disruption",
    description:
      "This research project examines how digital platforms and social media shape youth political engagement, protest movements, and new forms Focusing...",
  },
  {
    id: 5,
    image: "/images/zebra.jpg",
    tags: ["Tech", "Political Change"],
    title: "Irinkérindó: A Journal of African Migration",
    description:
      "Irinkérindó is a peer-reviewed journal dedicated to advancing scholarly understanding of African migration, mobility, and displacement.",
  },
  {
    id: 6,
    image: "/images/zebra.jpg",
    tags: ["Tech", "Political Change"],
    title: "Mobility, Borders, and Belonging: Rethinking Migration Governance in Africa",
    description:
      "This publication explores contemporary migration governance frameworks across Africa, questioning existing policy assumptions and proposing alterna...",
  },
  {
    id: 7,
    image: "/aerial-campus-buildings.jpg",
    tags: ["Tech", "Political Change"],
    title: "Governance Under Pressure: Institutional Responses to Political Disruption",
    description:
      "This research project examines how digital platforms and social media shape youth political engagement, protest movements, and new forms Focusing...",
  },
  {
    id: 8,
    image: "/african-community-group.jpg",
    tags: ["Tech", "Political Change"],
    title: "Irinkérindó: A Journal of African Migration",
    description:
      "Irinkérindó is a peer-reviewed journal dedicated to advancing scholarly understanding of African migration, mobility, and displacement.",
  },
  {
    id: 9,
    image: "/library-student-studying.jpg",
    tags: ["Tech", "Political Change"],
    title: "Mobility, Borders, and Belonging: Rethinking Migration Governance in Africa",
    description:
      "This publication explores contemporary migration governance frameworks across Africa, questioning existing policy assumptions and proposing alterna...",
  },
]

export default function PublicationsGrid() {
  const [activeTab, setActiveTab] = useState("All")

  return (
    <div className="container mx-auto py-12">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab ? "bg-[#000000] text-white" : "bg-[#f5f5f5] text-[#1a1a1a] hover:bg-[#e5e5e5]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {publications.map((item) => (
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
            <div className="flex gap-2 mb-3">
              {item.tags.map((tag) => (
                <span key={tag} className="bg-[#000000] text-white px-3 py-1 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-[#000000] mb-2 leading-tight">{item.title}</h3>

            {/* Description */}
            <p className="text-sm text-[#484848] leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          className="px-6 py-2 border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#f5f5f5] bg-transparent"
        >
          Prev
        </Button>
        <Button
          variant="outline"
          className="px-6 py-2 border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#f5f5f5] bg-transparent"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
