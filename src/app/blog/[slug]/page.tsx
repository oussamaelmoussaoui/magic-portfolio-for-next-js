import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { getNotionPosts, Post as PostType } from "@/app/utils/notion";
import { Button, Column, Flex, Heading, Row, Tag, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";

export const revalidate = 3600;

interface BlogParams {
  params: Promise<{ slug: string }>;
}

async function getAllBlogPosts(): Promise<PostType[]> {
  const localBlogs = getPosts(["src", "app", "blog", "posts"]);
  let notionBlogs: PostType[] = [];
  try {
    notionBlogs = await getNotionPosts();
  } catch (err) {
    console.error("[Blog Article] Erreur Notion:", err);
  }
  return [...localBlogs, ...notionBlogs];
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogParams) {
  const { slug } = await params;
  const posts = await getAllBlogPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) return;

  const { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
  const ogImage = image ?? `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }: BlogParams) {
  const { slug } = await params;
  const posts = await getAllBlogPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const category = post.metadata.category || "Articles";

  return (
    <Column as="section" maxWidth="s" gap="l" fillWidth>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image ?? `https://${baseURL}/og?title=${post.metadata.title}`,
            url: `https://${baseURL}/blog/${post.slug}`,
            author: { "@type": "Person", name: person.name },
          }),
        }}
      />
      <Flex fillWidth horizontal="space-between" vertical="center">
        <Button href="/blog" weight="default" variant="tertiary" size="s" prefixIcon="chevronLeft">
          Tous les articles
        </Button>
        <Tag label={category} size="m" variant="brand" />
      </Flex>

      <Heading variant="display-strong-m" wrap="balance">
        {post.metadata.title}
      </Heading>

      <Row gap="12" vertical="center">
        <Text variant="body-default-s" onBackground="neutral-weak">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
      </Row>

      <Column as="article" fillWidth>
        <CustomMDX source={post.content} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
