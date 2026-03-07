"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBlogPost(data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image?: string | null;
    author?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    published?: boolean;
    tags?: string[];
}) {
    const blogPost = await prisma.blogPost.create({
        data: {
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            image: data.image || null,
            author: data.author || null,
            metaTitle: data.metaTitle || null,
            metaDescription: data.metaDescription || null,
            published: data.published ?? false,
            tags: data.tags || [],
        },
    });
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/admin/dashboard");
    return blogPost;
}

export async function getBlogPosts(onlyPublished = false) {
    return await prisma.blogPost.findMany({
        where: onlyPublished ? { published: true } : undefined,
        orderBy: { createdAt: "desc" },
    });
}

export async function getBlogPostBySlug(slug: string) {
    return await prisma.blogPost.findUnique({
        where: { slug },
    });
}

export async function updateBlogPost(
    id: string,
    data: {
        title?: string;
        slug?: string;
        excerpt?: string;
        content?: string;
        image?: string | null;
        author?: string | null;
        metaTitle?: string | null;
        metaDescription?: string | null;
        published?: boolean;
        tags?: string[];
    }
) {
    const blogPost = await prisma.blogPost.update({
        where: { id },
        data,
    });
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${blogPost.slug}`);
    revalidatePath("/admin/dashboard");
    return blogPost;
}

export async function deleteBlogPost(id: string) {
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/admin/dashboard");
}
