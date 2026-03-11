import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { requiresApproval } from "@/lib/admin-roles";
import { getBuilderPage } from "@/lib/site-builder-config";
import { getPageBuilderContent, savePageBuilderContent } from "@/lib/site-builder";
import { getPublicPagePath } from "@/lib/site-paths";
import prisma from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ pageId: string }> },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pageId } = await params;
    const page = getBuilderPage(pageId);

    if (!page) {
      return NextResponse.json({ error: "Page not found." }, { status: 404 });
    }

    const sections = await getPageBuilderContent(pageId);
    return NextResponse.json({ page, sections });
  } catch (error: any) {
    console.error("Admin site content error:", error);
    return NextResponse.json({ error: "Failed to load page builder content." }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ pageId: string }> },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pageId } = await params;
    const page = getBuilderPage(pageId);

    if (!page) {
      return NextResponse.json({ error: "Page not found." }, { status: 404 });
    }

    const { sections } = await req.json();
    if (!sections || typeof sections !== "object") {
      return NextResponse.json({ error: "Sections payload is required." }, { status: 400 });
    }

    if (requiresApproval(user.role)) {
      await prisma.pendingChange.create({
        data: {
          type: "UPDATE",
          resource: "siteContent",
          resourceId: pageId,
          payload: { pageId, sections },
          submittedById: user.id,
        },
      });
      revalidatePath("/admin/dashboard");
      return NextResponse.json({
        pending: true,
        message: `${page.label} changes submitted for approval.`,
      });
    }

    await savePageBuilderContent(pageId, sections);
    revalidatePath(getPublicPagePath(pageId));
    revalidatePath("/admin/dashboard");

    return NextResponse.json({
      success: true,
      message: `${page.label} content updated successfully.`,
      sections: await getPageBuilderContent(pageId),
    });
  } catch (error: any) {
    console.error("Save site content error:", error);
    return NextResponse.json({ error: "Failed to save page content." }, { status: 500 });
  }
}
