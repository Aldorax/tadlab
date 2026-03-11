"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { requiresApproval } from "@/lib/admin-roles";

export async function createEvent(data: {
    title: string;
    date: string;
    link: string;
    image: string;
    tags: string[];
    fullDescription: string;
    shortDescription?: string;
    location?: string;
}) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    const eventData = {
        title: data.title,
        date: data.date,
        location: data.location || "Online",
        shortDescription: data.shortDescription || (data.fullDescription.substring(0, 150) + "..."),
        fullDescription: data.fullDescription,
        image: data.image,
        link: data.link,
        tags: data.tags,
    };

    if (requiresApproval(user.role)) {
        await prisma.pendingChange.create({
            data: {
                type: "CREATE",
                resource: "event",
                payload: eventData,
                submittedById: user.id,
            },
        });
        revalidatePath("/admin/dashboard");
        return { pending: true, message: "Event submitted for approval." };
    }

    const event = await prisma.event.create({ data: eventData });
    revalidatePath("/events");
    revalidatePath("/admin/dashboard");
    return event;
}

export async function getEvents() {
    return await prisma.event.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function deleteEvent(id: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    if (requiresApproval(user.role)) {
        await prisma.pendingChange.create({
            data: {
                type: "DELETE",
                resource: "event",
                resourceId: id,
                payload: { id },
                submittedById: user.id,
            },
        });
        revalidatePath("/admin/dashboard");
        return { pending: true, message: "Deletion submitted for approval." };
    }

    await prisma.event.delete({ where: { id } });
    revalidatePath("/events");
    revalidatePath("/admin/dashboard");
}
