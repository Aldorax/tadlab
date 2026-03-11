import Image from "next/image";
import Link from "next/link";
import { createTeamMemberSlug, isPublishedTeamMember } from "@/lib/team-members";

type TeamSectionProps = {
  content: {
    sectionTitle: string
    description: string
    member1Name: string
    member1Role: string
    member1Image: string
    member1Bio: string
    member2Name: string
    member2Role: string
    member2Image: string
    member2Bio: string
    member3Name: string
    member3Role: string
    member3Image: string
    member3Bio: string
    member4Name: string
    member4Role: string
    member4Image: string
    member4Bio: string
    member5Name: string
    member5Role: string
    member5Image: string
    member5Bio: string
    member6Name: string
    member6Role: string
    member6Image: string
    member6Bio: string
  }
}

export default function TeamSection({ content }: TeamSectionProps) {
  const teamMembers = [
    {
      name: content.member1Name,
      role: content.member1Role,
      image: content.member1Image,
      bio: content.member1Bio,
    },
    {
      name: content.member2Name,
      role: content.member2Role,
      image: content.member2Image,
      bio: content.member2Bio,
    },
    {
      name: content.member3Name,
      role: content.member3Role,
      image: content.member3Image,
      bio: content.member3Bio,
    },
    {
      name: content.member4Name,
      role: content.member4Role,
      image: content.member4Image,
      bio: content.member4Bio,
    },
    {
      name: content.member5Name,
      role: content.member5Role,
      image: content.member5Image,
      bio: content.member5Bio,
    },
    {
      name: content.member6Name,
      role: content.member6Role,
      image: content.member6Image,
      bio: content.member6Bio,
    },
  ]

  return (
    <section className="py-24 sm:py-32 px-6 lg:px-8 bg-gray-50 flex justify-center">
      <div className="max-w-7xl w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-x-4 mb-6">
              <div className="h-px w-8 bg-black" />
              <h2 className="text-sm font-semibold tracking-widest text-gray-900 uppercase">
                {content.sectionTitle}
              </h2>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 font-bricolage leading-tight">
              The minds behind TADLab.
            </h2>
          </div>
          <div className="lg:max-w-md">
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              {content.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="group flex flex-col items-center">
              {isPublishedTeamMember({
                name: member.name,
                role: member.role,
                image: member.image,
                bio: member.bio,
                slug: createTeamMemberSlug(member.name),
              }) ? (
                <Link href={`/team/${createTeamMemberSlug(member.name)}`} className="block w-full">
                  <div className="w-full aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-xl group-hover:shadow-2xl transition-all duration-500 mb-6 relative border border-gray-100/50">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name || `Team member ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 gap-3">
                        <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm font-semibold tracking-widest uppercase">PROFILE</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>
              ) : (
                <div className="w-full aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 mb-6 relative border border-gray-100/50">
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 gap-3">
                    <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm font-semibold tracking-widest uppercase">COMING SOON</span>
                  </div>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-bricolage">{member.name || "Awaiting Info"}</h3>
                <p className="text-emerald-600 font-medium">{member.role || "TADLab Role"}</p>
                {member.bio ? (
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 line-clamp-4 max-w-sm">
                    {member.bio}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
