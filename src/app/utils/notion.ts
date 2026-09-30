import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

/**
 * Catégories officielles du Blog (5 catégories fixes)
 * À configurer côté Notion : Propriété "Category" (type Select)
 * Valeurs acceptées : 'Expérience', 'Articles', 'News', 'Tools', 'Cheatsheets'
 *
 * Note Quotas Notion (Plan gratuit) :
 * - Rate limit : 3 requêtes par seconde
 * - Limite de blocs par page et par appel API paginé (100 blocs max par page de résultats)
 * - La mise en cache et le revalidate de Next.js (ISR) permettent de limiter les requêtes directes.
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

let _notion: Client | null = null;
function getClient(): Client | null {
  if (!process.env.NOTION_TOKEN) {
    return null;
  }
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

type Team = {
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

let cachedDataSourceId: string | null = null;

async function getDataSourceId(client: Client): Promise<string | null> {
  if (cachedDataSourceId) return cachedDataSourceId;
  if (!DATABASE_ID) return null;

  try {
    const database = await client.databases.retrieve({ database_id: DATABASE_ID });
    const dataSourceId = (database as any).data_sources?.[0]?.id;

    if (dataSourceId) {
      cachedDataSourceId = dataSourceId;
      return dataSourceId;
    }
  } catch (err) {
    console.error("[Notion CMS] Erreur lors de la récupération de la data source :", err);
  }

  return null;
}

export async function getNotionPosts(): Promise<Post[]> {
  const client = getClient();
  const n2m = getN2M();

  if (!client || !n2m || !DATABASE_ID) {
    // Si la configuration Notion n'est pas présente, on retourne un tableau vide sans casser le site
    return [];
  }

  try {
    const dataSourceId = await getDataSourceId(client);
    let results: any[] = [];

    if (dataSourceId) {
      const response = await client.dataSources.query({
        data_source_id: dataSourceId,
        filter: {
          property: "Status",
          select: { equals: "Published" },
        },
        sorts: [{ property: "PublishedAt", direction: "descending" }],
      });
      results = response.results;
    } else {
      // Fallback query standard sur databases.query
      const response = await (client.databases as any).query({
        database_id: DATABASE_ID,
        filter: {
          property: "Status",
          select: { equals: "Published" },
        },
        sorts: [{ property: "PublishedAt", direction: "descending" }],
      });
      results = response.results;
    }

    const posts = await Promise.all(
      results.map(async (page: any) => {
        const props = page.properties;

        const slug = props.Slug?.rich_text[0]?.plain_text ?? page.id;
        const title = props.Title?.title[0]?.plain_text ?? "Untitled";
        const publishedAt = props.PublishedAt?.date?.start ?? "";
        const summary = props.Summary?.rich_text[0]?.plain_text ?? "";
        const image =
          props.Cover?.files[0]?.file?.url ?? props.Cover?.files[0]?.external?.url ?? undefined;

        const tagList = props.Tags?.multi_select?.map((t: any) => t.name) ?? [];
        const tag = tagList.join(", ");

        // Récupération et normalisation de la catégorie Notion
        const rawCategory =
          props.Category?.select?.name ??
          props.Category?.name ??
          props.category?.select?.name ??
          "Articles";
        const category = normalizeCategory(rawCategory);

        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const { parent: content } = n2m.toMarkdownString(mdBlocks);

        return {
          slug,
          metadata: {
            title,
            publishedAt,
            summary,
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
      })
    );

    return posts;
  } catch (error) {
    // Gestion d'erreur gracieuse : log serveur sans impact utilisateur
    console.error("[Notion CMS API Error] Échec de la récupération des articles Notion :", error);
    return [];
  }
}

export async function getNotionPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getNotionPosts();
  return posts.find((post) => post.slug === slug);
}
