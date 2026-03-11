import ConstructionBanner from "@/components/construction-banner";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { getPageBuilderContent } from "@/lib/site-builder";
import { extractTeamMembers, findTeamMemberBySlug, isPublishedTeamMember } from "@/lib/team-members";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type TeamMemberPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const sections = await getPageBuilderContent("about");
  return extractTeamMembers(sections.team)
    .filter(isPublishedTeamMember)
    .map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: TeamMemberPageProps) {
  const { slug } = await params;
  const sections = await getPageBuilderContent("about");
  const member = findTeamMemberBySlug(sections.team, slug);

  if (!member) {
    return { title: "Team Member Not Found | TADLab" };
  }

  return {
    title: `${member.name} | TADLab`,
    description: member.bio || `${member.name} serves as ${member.role} at TADLab.`,
  };
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug } = await params;
  const sections = await getPageBuilderContent("about");
  const member = findTeamMemberBySlug(sections.team, slug);

  if (!member) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <ConstructionBanner />

      <section className="relative min-h-[65vh] bg-black overflow-hidden">
        <div className="absolute inset-0">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover opacity-70"
              priority
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-gray-900 via-black to-gray-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>

        <div className="relative z-20">
          <NavBar />
        </div>

        <div className="relative z-20 container mx-auto px-6 lg:px-8 pt-24 pb-20 flex min-h-[55vh] items-end">
          <div className="max-w-4xl">
            <Link href="/about-us" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to About Us
            </Link>
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
              Team Profile
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white font-bricolage leading-[0.95]">
              {member.name}
            </h1>
            <p className="mt-6 text-xl text-white/85 font-medium">{member.role}</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[360px,1fr] items-start">
            <div className="rounded-3xl overflow-hidden border border-gray-200 bg-gray-50 shadow-xl">
              {member.image ? (
                <div className="relative aspect-[4/5]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[4/5] flex items-center justify-center text-gray-400">
                  No image uploaded
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-x-4 mb-8">
                <div className="h-px w-12 bg-black" />
                <p className="text-sm font-bold tracking-widest text-gray-900 uppercase">Biography</p>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700">
                {member.bio ? (
                  member.bio.split("\n").filter(Boolean).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))
                ) : (
                  <p>Biography coming soon.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
