import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { isMasterAdminRole } from "@/lib/admin-roles";
import { getPublicPagePath } from "@/lib/site-paths";
import { savePageBuilderContent } from "@/lib/site-builder";

// Apply a pending change to the actual database
async function applyChange(change: any) {
    const payload = change.payload as any;

    switch (change.resource) {
        case "event":
            if (change.type === "CREATE") {
                await prisma.event.create({ data: payload });
                revalidatePath("/events");
            } else if (change.type === "UPDATE" && change.resourceId) {
                await prisma.event.update({ where: { id: change.resourceId }, data: payload });
                revalidatePath("/events");
            } else if (change.type === "DELETE" && change.resourceId) {
                await prisma.event.delete({ where: { id: change.resourceId } });
                revalidatePath("/events");
            }
            break;

        case "project":
            if (change.type === "CREATE") {
                await prisma.project.create({ data: payload });
                revalidatePath("/projects");
                revalidatePath("/");
            } else if (change.type === "UPDATE" && change.resourceId) {
                await prisma.project.update({ where: { id: change.resourceId }, data: payload });
                revalidatePath("/projects");
                revalidatePath("/");
            } else if (change.type === "DELETE" && change.resourceId) {
                await prisma.project.delete({ where: { id: change.resourceId } });
                revalidatePath("/projects");
                revalidatePath("/");
            }
            break;

        case "blog":
            if (change.type === "CREATE") {
                await prisma.blogPost.create({ data: payload });
                revalidatePath("/blog");
                revalidatePath("/");
            } else if (change.type === "UPDATE" && change.resourceId) {
                await prisma.blogPost.update({ where: { id: change.resourceId }, data: payload });
                revalidatePath("/blog");
                revalidatePath("/");
            } else if (change.type === "DELETE" && change.resourceId) {
                await prisma.blogPost.delete({ where: { id: change.resourceId } });
                revalidatePath("/blog");
                revalidatePath("/");
            }
            break;

        case "content":
            if (change.type === "UPDATE") {
                const pageId = payload.pageId;
                const contentData = { heroTitle: payload.heroTitle, heroSub: payload.heroSub, heroImage: payload.heroImage };
                await prisma.pageContent.upsert({
                    where: { pageId },
                    update: contentData,
                    create: { pageId, ...contentData },
                });
                revalidatePath(getPublicPagePath(pageId));
            }
            break;

        case "siteContent":
            if (change.type === "UPDATE") {
                const pageId = String(payload.pageId);
                await savePageBuilderContent(pageId, payload.sections as Record<string, Record<string, string | string[]>>);
                revalidatePath(getPublicPagePath(pageId));
            }
            break;
    }

    revalidatePath("/admin/dashboard");
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!isMasterAdminRole(user.role)) {
            return NextResponse.json({ error: "Only master control accounts can review changes." }, { status: 403 });
        }

        const { id } = await params;
        const { action, note } = await req.json();

        if (!["approve", "reject"].includes(action)) {
            return NextResponse.json({ error: "Action must be 'approve' or 'reject'." }, { status: 400 });
        }

        const change = await prisma.pendingChange.findUnique({
            where: { id },
        });

        if (!change) {
            return NextResponse.json({ error: "Pending change not found." }, { status: 404 });
        }

        if (change.status !== "PENDING") {
            return NextResponse.json({ error: "This change has already been reviewed." }, { status: 400 });
        }

        if (action === "approve") {
            // Apply the change to the actual database
            await applyChange(change);
        }

        const updated = await prisma.pendingChange.update({
            where: { id },
            data: {
                status: action === "approve" ? "APPROVED" : "REJECTED",
                reviewedById: user.id,
                reviewedAt: new Date(),
                note: note || null,
            },
        });

        return NextResponse.json({ success: true, change: updated });
    } catch (error: any) {
        console.error("Review change error:", error);
        return NextResponse.json({ error: "Failed to review change." }, { status: 500 });
    }
}
