"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPageContent(pageId: string) {
    return await prisma.pageContent.findUnique({
        where: { pageId },
    });
}

export async function updatePageContent(pageId: string, data: { heroTitle?: string; heroSub?: string; heroImage?: string }) {
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

    revalidatePath(`/${pageId === 'homepage' ? '' : pageId}`);
    revalidatePath("/admin/dashboard");
    return content;
}
