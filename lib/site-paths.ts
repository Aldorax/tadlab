export function getPublicPagePath(pageId: string) {
  if (pageId === "homepage") return "/";
  if (pageId === "about") return "/about-us";
  return `/${pageId}`;
}
