"use client";

import { Construction } from "lucide-react";

export default function ConstructionBanner() {
  return (
    <div className="relative overflow-hidden bg-linear-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-b border-[#4ade80]/20">
      <div className="animate-scroll-left whitespace-nowrap py-3">
        <div className="inline-flex items-center gap-8 text-sm font-medium text-[#d1d1d1]">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="inline-flex items-center gap-3">
              <Construction className="w-4 h-4 text-[#4ade80]" />
              <span className="text-white/80">
                Website Under Development
              </span>
              <span className="text-[#4ade80]">•</span>
              <span className="text-white/60">
                Some features may be in progress
              </span>
              <span className="text-[#4ade80]">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient fade on edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-[#1a1a1a] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-[#1a1a1a] to-transparent pointer-events-none" />
    </div>
  );
}
