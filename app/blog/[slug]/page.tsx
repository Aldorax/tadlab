import ConstructionBanner from "@/components/construction-banner";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { getBlogPostBySlug, getBlogPosts } from "@/app/actions/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type Props = {
    params: Promise<{ slug: string }>
};

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found | TADLab' };
    }

    return {
        title: post.metaTitle || `${post.title} | TADLab Blog`,
        description: post.metaDescription || post.excerpt,
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            images: post.image ? [{ url: post.image, width: 1200, height: 630 }] : [],
        },
    };
}

export async function generateStaticParams() {
    const posts = await getBlogPosts(true);
    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <ConstructionBanner />
            <div className="bg-black py-4 sticky top-0 z-50 shadow-md">
                <NavBar />
            </div>

            <main className="flex-grow pt-16 pb-24">
                <article className="max-w-4xl mx-auto px-6 lg:px-8">
                    <Link href="/blog" className="inline-flex items-center text-green-600 hover:text-green-800 font-medium mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                    </Link>

                    <header className="mb-12">
                        <div className="flex gap-2 flex-wrap mb-6">
                            {post.tags.map((tag: string) => (
                                <span key={tag} className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-800 rounded-full uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 font-bricolage">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4 text-gray-500 mb-8 pb-8 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-sm">
                                    {(post.author || "T").charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-900">{post.author || "TADLab Team"}</span>
                                    <span className="text-sm">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>

                        {post.image && (
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-12">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </header>

                    <div className="prose prose-lg md:prose-xl text-gray-800 leading-relaxed max-w-none">
                        <p className="text-xl md:text-2xl font-light text-gray-600 mb-10 leading-relaxed italic border-l-4 border-green-500 pl-6 not-prose">
                            {post.excerpt}
                        </p>

                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
