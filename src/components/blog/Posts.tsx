import { getPosts } from "@/app/utils/utils";
import { getNotionPosts } from "@/app/utils/notion";
import { Grid } from "@/once-ui/components";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
}

export async function Posts({ range, columns = "1", thumbnail = false }: PostsProps) {
  const localBlogs = getPosts(["src", "app", "blog", "posts"]);
  let notionBlogs: any[] = [];
  try {
    notionBlogs = await getNotionPosts();
  } catch (err) {
    console.error("[Posts Component] Erreur Notion:", err);
  }

  const allBlogs = [...localBlogs, ...notionBlogs];

  const sortedBlogs = allBlogs.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid columns={2} mobileColumns="1" fillWidth marginBottom="40" gap="m" align="center">
          {displayedBlogs.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} />
          ))}
        </Grid>
      )}
    </>
  );
}
