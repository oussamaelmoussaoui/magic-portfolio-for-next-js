import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

/**
 * Notion CMS Integration
 *
 * Structure de la base Notion (data source) :
 *  - Title       : title        → titre de l'article
 *  - Slug        : rich_text    → identifiant URL (peut contenir des espaces → slugifié)
 *  - Status      : select       → "Published" | "Draft"  (majuscule)
 *  - Tags        : multi_select → ["News", "Article", "Journaling", ...]
 *  - Cover       : files        → image de couverture (upload S3 ou externe)
 *  - PublishedAt : date         → date de publication
 */

export const BLOG_CATEGORIES = [
  "Expérience",
  "Articles",
  "News",
  "Tools",
  "Cheatsheets",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export function normalizeCategory(category?: string | null): BlogCategory {
  if (!category) return "Articles";
  const normalized = category.trim().toLowerCase();

  if (normalized === "expérience" || normalized === "experience" || normalized === "journaling")
    return "Expérience";
  if (normalized === "articles" || normalized === "article") return "Articles";
  if (normalized === "news" || normalized === "actualités" || normalized === "actualites")
    return "News";
  if (normalized === "tools" || normalized === "outils" || normalized === "tool") return "Tools";
  if (
    normalized === "cheatsheets" ||
    normalized === "cheatsheet" ||
    normalized === "aide-mémoire"
  )
    return "Cheatsheets";

  return "Articles";
}

/**
 * Transforme un texte quelconque en slug URL-safe.
 * "Open Ai DevDay 2026" → "open-ai-devday-2026"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // retire les accents
    .replace(/[^a-z0-9\s-]/g, "")   // garde lettres, chiffres, espaces, tirets
    .trim()
    .replace(/\s+/g, "-")            // espaces → tirets
    .replace(/-+/g, "-");            // tirets multiples → un seul
}

let _notion: Client | null = null;
function getClient(): Client | null {
  if (!process.env.NOTION_TOKEN) return null;
  if (!_notion) {
    _notion = new Client({ auth: process.env.NOTION_TOKEN });
  }
  return _notion;
}

let _n2m: NotionToMarkdown | null = null;
function getN2M(): NotionToMarkdown | null {
  const client = getClient();
  if (!client) return null;
  if (!_n2m) {
    _n2m = new NotionToMarkdown({ notionClient: client });
  }
  return _n2m;
}

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

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

/** Récupère l'ID du premier data source attaché à la database */
async function getDataSourceId(client: Client): Promise<string | null> {
  if (!DATABASE_ID) return null;
  try {
    const database = await client.databases.retrieve({ database_id: DATABASE_ID });
    const sources = (database as any).data_sources as Array<{ id: string; name: string }> | undefined;
    if (sources && sources.length > 0) {
      // On prend le premier data source ("Blog Posts")
      return sources[0].id;
    }
  } catch (err) {
    console.error("[Notion CMS] Impossible de récupérer le data source :", err);
  }
  return null;
}

export async function getNotionPosts(): Promise<Post[]> {
  const client = getClient();
  const n2m = getN2M();

  if (!client || !n2m || !DATABASE_ID) {
    return [];
  }

  try {
    const dataSourceId = await getDataSourceId(client);
    if (!dataSourceId) {
      console.warn("[Notion CMS] Aucun data source trouvé pour la database", DATABASE_ID);
      return [];
    }

    // Requête SANS filtre pour récupérer toutes les pages,
    // puis on filtre côté serveur (Status = "Published", insensible à la casse)
    // car le filtre API peut être sensible à la casse
    const response = await client.dataSources.query({
      data_source_id: dataSourceId,
    });

    const allResults: any[] = response.results;

    // Filtre côté code : Status === "Published" (insensible à la casse)
    const published = allResults.filter((page: any) => {
      const statusName: string = page.properties?.Status?.select?.name ?? "";
      return statusName.toLowerCase() === "published";
    });

    console.log(
      `[Notion CMS] ${allResults.length} pages total, ${published.length} publiées`
    );

    // Récupère le contenu de chaque page publiée
    const posts = await Promise.all(
      published.map(async (page: any): Promise<Post | null> => {
        try {
          const props = page.properties;

          // --- Title ---
          const title =
            props.Title?.title?.[0]?.plain_text ??
            props.Name?.title?.[0]?.plain_text ??
            "Untitled";

          // --- Slug ---
          // Le champ Slug peut contenir le titre complet → on le slugifie
          const rawSlug =
            props.Slug?.rich_text?.[0]?.plain_text?.trim() ??
            props.slug?.rich_text?.[0]?.plain_text?.trim() ??
            "";
          // Si le raw slug ressemble à une phrase (contient des espaces), on le slugifie
          const slug = rawSlug ? slugify(rawSlug) : slugify(title) || page.id;

          // --- Date de publication ---
          const publishedAt =
            props.PublishedAt?.date?.start ??
            props.publishedAt?.date?.start ??
            props.Date?.date?.start ??
            page.created_time?.split("T")[0] ??
            "";

          // --- Cover image ---
          // Notion peut retourner des fichiers uploadés (S3 signé) ou externes
          const coverFiles: any[] = props.Cover?.files ?? props.cover?.files ?? [];
          const image =
            coverFiles[0]?.file?.url ??
            coverFiles[0]?.external?.url ??
            page.cover?.external?.url ??
            page.cover?.file?.url ??
            undefined;

          // --- Tags → catégorie principale ---
          const tagList: string[] =
            props.Tags?.multi_select?.map((t: any) => t.name) ??
            props.tags?.multi_select?.map((t: any) => t.name) ??
            [];
          const tag = tagList.join(", ");

          // Catégorie = premier tag normalisé
          const category = normalizeCategory(tagList[0] ?? null);

          // --- Contenu de la page (blocs Notion → Markdown) ---
          const mdBlocks = await n2m.pageToMarkdown(page.id);
          const { parent: content } = n2m.toMarkdownString(mdBlocks);

          return {
            slug,
            metadata: {
              title,
              publishedAt,
              summary: props.Summary?.rich_text?.[0]?.plain_text ?? "",
              image,
              images: image ? [image] : [],
              tag,
              category,
              team: [],
              link: "",
            },
            content,
            source: "notion" as const,
          };
        } catch (pageErr) {
          console.error(`[Notion CMS] Erreur lecture page ${page.id} :`, pageErr);
          return null;
        }
      })
    );

    return posts.filter((p): p is Post => p !== null);
  } catch (error) {
    console.error("[Notion CMS] Erreur globale :", error);
    return [];
  }
}

export async function getNotionPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getNotionPosts();
  const decoded = decodeURIComponent(slug);
  return (
    posts.find((p) => p.slug === decoded) ??
    posts.find((p) => p.slug === slug) ??
    posts.find((p) => p.slug.toLowerCase() === decoded.toLowerCase())
  );
}
