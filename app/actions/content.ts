"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { requiresApproval } from "@/lib/admin-roles";

function getPublicPagePath(pageId: string) {
    if (pageId === "homepage") return "/";
    if (pageId === "about") return "/about-us";
    return `/${pageId}`;
}

export async function getPageContent(pageId: string) {
    return await prisma.pageContent.findUnique({
        where: { pageId },
    });
}

export async function updatePageContent(pageId: string, data: { heroTitle?: string; heroSub?: string; heroImage?: string }) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    if (requiresApproval(user.role)) {
        await prisma.pendingChange.create({
            data: {
                type: "UPDATE",
                resource: "content",
                payload: { pageId, ...data },
                submittedById: user.id,
            },
        });
        revalidatePath("/admin/dashboard");
        return { pending: true, message: "Content change submitted for approval." };
    }

    const content = await prisma.pageContent.upsert({
        where: { pageId },
        update: {
            heroTitle: data.heroTitle,
            heroSub: data.heroSub,
            heroImage: data.heroImage,
        },
        create: {
            pageId,
            heroTitle: data.heroTitle,
            heroSub: data.heroSub,
            heroImage: data.heroImage,
        },
    });

    revalidatePath(getPublicPagePath(pageId));
    revalidatePath("/admin/dashboard");
    return content;
}
