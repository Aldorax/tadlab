import prisma from "@/lib/prisma";
import {
  createDefaultPageSections,
  getBuilderPage,
  normalizeBuilderValue,
  type BuilderFieldValue,
} from "@/lib/site-builder-config";

export type PageSectionMap = Record<string, Record<string, BuilderFieldValue>>;

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

export async function getPageBuilderContent(pageId: string): Promise<PageSectionMap> {
  const page = getBuilderPage(pageId);

  if (!page) {
    throw new Error(`Unknown page: ${pageId}`);
  }

  const defaults = createDefaultPageSections(pageId);
  let storedSections: Array<{ sectionKey: string; content: unknown }> = [];

  try {
    storedSections = await prisma.siteSectionContent.findMany({
      where: { pageId },
    });
  } catch (error) {
    console.warn(
      `Falling back to default builder content for ${pageId}: ${getErrorMessage(error)}`,
    );
    return defaults;
  }

  for (const section of page.sections) {
    const stored = storedSections.find((entry: { sectionKey: string }) => entry.sectionKey === section.key);
    const storedContent =
      stored && typeof stored.content === "object" && stored.content !== null
        ? (stored.content as Record<string, unknown>)
        : {};

    defaults[section.key] = Object.fromEntries(
      section.fields.map((field) => [
        field.key,
        normalizeBuilderValue(field.type, storedContent[field.key], section.defaults[field.key]),
      ]),
    );
  }

  return defaults;
}

export async function savePageBuilderContent(pageId: string, sections: PageSectionMap) {
  const page = getBuilderPage(pageId);

  if (!page) {
    throw new Error(`Unknown page: ${pageId}`);
  }

  try {
    await prisma.$transaction(
      page.sections.map((section) =>
        prisma.siteSectionContent.upsert({
          where: {
            pageId_sectionKey: {
              pageId,
              sectionKey: section.key,
            },
          },
          update: {
            content: Object.fromEntries(
              section.fields.map((field) => [
                field.key,
                normalizeBuilderValue(
                  field.type,
                  sections[section.key]?.[field.key],
                  section.defaults[field.key],
                ),
              ]),
            ),
          },
          create: {
            pageId,
            sectionKey: section.key,
            content: Object.fromEntries(
              section.fields.map((field) => [
                field.key,
                normalizeBuilderValue(
                  field.type,
                  sections[section.key]?.[field.key],
                  section.defaults[field.key],
                ),
              ]),
            ),
          },
        }),
      ),
    );
  } catch (error) {
    throw new Error(
      `The website builder content table is not ready yet. ${getErrorMessage(error)}`,
    );
  }
}
