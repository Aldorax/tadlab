"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProject(data: {
    title: string;
    description: string;
    image: string;
    tags: string[];
}) {
    const project = await prisma.project.create({
        data: {
            title: data.title,
            description: data.description,
            image: data.image,
            tags: data.tags,
        },
    });
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/dashboard");
    return project;
}

export async function getProjects() {
    return await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function deleteProject(id: string) {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/dashboard");
}
