import type { BuilderFieldValue } from "@/lib/site-builder-config";

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
  slug: string;
};

function readString(value: BuilderFieldValue | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

export function createTeamMemberSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isPublishedTeamMember(member: TeamMember) {
  return Boolean(member.name) && member.name.toLowerCase() !== "coming soon";
}

export function extractTeamMembers(section: Record<string, BuilderFieldValue> | undefined): TeamMember[] {
  if (!section) return [];

  return Array.from({ length: 6 }, (_, index) => {
    const memberIndex = index + 1;
    const name = readString(section[`member${memberIndex}Name`]);
    const role = readString(section[`member${memberIndex}Role`]);
    const image = readString(section[`member${memberIndex}Image`]);
    const bio = readString(section[`member${memberIndex}Bio`]);

    return {
      name,
      role,
      image,
      bio,
      slug: createTeamMemberSlug(name),
    };
  });
}

export function findTeamMemberBySlug(
  section: Record<string, BuilderFieldValue> | undefined,
  slug: string,
) {
  return extractTeamMembers(section).find(
    (member) => isPublishedTeamMember(member) && member.slug === slug,
  );
}
