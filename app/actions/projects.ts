"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { requiresApproval } from "@/lib/admin-roles";

export async function createProject(data: {
    title: string;
    description: string;
    image: string;
    tags: string[];
}) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    const projectData = {
        title: data.title,
        description: data.description,
        image: data.image,
        tags: data.tags,
    };

    if (requiresApproval(user.role)) {
        await prisma.pendingChange.create({
            data: {
                type: "CREATE",
                resource: "project",
                payload: projectData,
                submittedById: user.id,
            },
        });
        revalidatePath("/admin/dashboard");
        return { pending: true, message: "Project submitted for approval." };
    }

    const project = await prisma.project.create({ data: projectData });
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
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    if (requiresApproval(user.role)) {
        await prisma.pendingChange.create({
            data: {
                type: "DELETE",
                resource: "project",
                resourceId: id,
                payload: { id },
                submittedById: user.id,
            },
        });
        revalidatePath("/admin/dashboard");
        return { pending: true, message: "Deletion submitted for approval." };
    }

    await prisma.project.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/dashboard");
}
