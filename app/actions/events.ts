"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
    const event = await prisma.event.create({
        data: {
            title: data.title,
            date: data.date,
            location: data.location || "Online",
            shortDescription: data.shortDescription || (data.fullDescription.substring(0, 150) + "..."),
            fullDescription: data.fullDescription,
            image: data.image,
            link: data.link,
            tags: data.tags,
        },
    });
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
    await prisma.event.delete({ where: { id } });
    revalidatePath("/events");
    revalidatePath("/admin/dashboard");
}
