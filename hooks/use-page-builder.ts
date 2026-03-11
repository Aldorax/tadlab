"use client";

import { useEffect, useState } from "react";
import {
  createDefaultPageSections,
  type BuilderFieldValue,
} from "@/lib/site-builder-config";

export type BuilderSectionMap = Record<string, Record<string, BuilderFieldValue>>;

export function usePageBuilder(pageId: string) {
  const [sections, setSections] = useState<BuilderSectionMap>(() =>
    createDefaultPageSections(pageId),
  );

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetch(`/api/site-content/${pageId}`);
        const data = await res.json();

        if (!ignore && res.ok && data.sections) {
          setSections(data.sections);
        }
      } catch (error) {
        console.error(`Failed to load site content for ${pageId}:`, error);
      }
    }

    void load();

    const handlePreview = (event: MessageEvent) => {
      const payload = event.data;
      if (payload?.type === "PREVIEW_SITE_PAGE" && payload?.pageId === pageId && payload?.sections) {
        setSections(payload.sections);
      }
    };

    window.addEventListener("message", handlePreview);

    return () => {
      ignore = true;
      window.removeEventListener("message", handlePreview);
    };
  }, [pageId]);

  return sections;
}
