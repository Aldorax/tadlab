import ConstructionBanner from "@/components/construction-banner";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { getBlogPosts } from "@/app/actions/blog";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: "Blog | TADLab",
    description: "Read the latest news, updates, and research from The African Futures and Disruption Studies Lab.",
};

export default async function BlogPage() {
    const blogPosts = await getBlogPosts(true); // onlyPublished = true

    return (
        <div className="min-h-screen">
            <ConstructionBanner />

            {/* Hero Section */}
            <section
                className="relative h-[60vh] bg-cover bg-center bg-[#1a1a1a]"
            >
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80" />
                <NavBar />

                <div className="relative z-10 px-8 lg:px-16 pt-32 lg:pt-40 pb-16 flex items-end h-full font-bricolage">
                    <div className="max-w-3xl md:max-w-5xl">
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1]">
                            BLOG & INSIGHTS
                        </h2>
                    </div>
                </div>
            </section>

            {/* Blog Grid Section */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-8 max-w-7xl">
                    {blogPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-semibold text-gray-500">No blog posts found. Check back later!</h3>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post: any) => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <div className="relative w-full h-64 overflow-hidden bg-gray-200">
                                        {post.image ? (
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex gap-2 flex-wrap mb-4">
                                            {post.tags.map((tag: string) => (
                                                <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-green-100 text-green-800 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-200">
                                            <span className="font-medium text-gray-900">{post.author || "TADLab Team"}</span>
                                            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
