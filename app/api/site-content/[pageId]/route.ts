import { NextResponse } from "next/server";
import { getPageBuilderContent } from "@/lib/site-builder";
import { getBuilderPage } from "@/lib/site-builder-config";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ pageId: string }> },
) {
  try {
    const { pageId } = await params;
    const page = getBuilderPage(pageId);

    if (!page) {
      return NextResponse.json({ error: "Page not found." }, { status: 404 });
    }

    const sections = await getPageBuilderContent(pageId);
    return NextResponse.json({ page, sections });
  } catch (error: any) {
    console.error("Public site content error:", error);
    return NextResponse.json({ error: "Failed to load page content." }, { status: 500 });
  }
}
