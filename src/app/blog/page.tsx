import { Column, Heading, Text } from "@/once-ui/components";
import { Mailchimp } from "@/components";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { getPosts } from "@/app/utils/utils";
import { getNotionPosts, Post as PostType } from "@/app/utils/notion";
import { baseURL } from "@/app/resources";
import { blog, person, newsletter } from "@/app/resources/content";

export const revalidate = 3600;

export async function generateMetadata() {
  const title = blog.title;
  const description = blog.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/blog`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog() {
  const localBlogs = getPosts(["src", "app", "blog", "posts"]);
  let notionBlogs: PostType[] = [];

  try {
    notionBlogs = await getNotionPosts();
  } catch (error) {
    console.error("[Blog Page] Erreur lors de la récupération Notion:", error);
  }

  const allBlogs = [...localBlogs, ...notionBlogs].sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  return (
    <Column maxWidth="xl" fillWidth gap="l">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            headline: blog.title,
            description: blog.description,
            url: `https://${baseURL}/blog`,
            image: `${baseURL}/og?title=${encodeURIComponent(blog.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />

      <Column gap="8" marginBottom="m" className="max-w-110 h-60">
        <Heading variant="display-strong-l">{blog.title}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Articles, retours d'expériences, tutoriels et astuces en Data Science, Cloud et IA.
        </Text>
      </Column>

      <Column fillWidth flex={1}>
        <CategoryFilter posts={allBlogs} />
      </Column>

      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
