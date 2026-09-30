/**
 * Définitions de types et constantes partagées pour le blog (Client & Server)
 */

export const BLOG_CATEGORIES = ["Expérience", "Articles", "News", "Tools", "Cheatsheets"] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export function normalizeCategory(category?: string | null): BlogCategory {
  if (!category) return "Articles";
  const normalized = category.trim().toLowerCase();

  if (normalized === "expérience" || normalized === "experience") return "Expérience";
  if (normalized === "articles" || normalized === "article") return "Articles";
  if (normalized === "news" || normalized === "actualités" || normalized === "actualites")
    return "News";
  if (normalized === "tools" || normalized === "outils" || normalized === "tool") return "Tools";
  if (normalized === "cheatsheets" || normalized === "cheatsheet" || normalized === "aide-mémoire")
    return "Cheatsheets";

  return "Articles";
}

export type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  category: BlogCategory;
  team: Team[];
  link?: string;
};

export type Post = {
  slug: string;
  metadata: Metadata;
  content: string;
  source: "notion" | "mdx";
};
