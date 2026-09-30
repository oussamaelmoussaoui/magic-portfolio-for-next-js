"use client";

import { Column, Flex, Heading, SmartImage, SmartLink, Tag, Text } from "@/once-ui/components";
import styles from "./Posts.module.scss";
import { formatDate } from "@/app/utils/formatDate";

interface PostProps {
  post: any;
  thumbnail: boolean;
}

export default function Post({ post, thumbnail }: PostProps) {
  const tags = post.metadata.tag
    ? post.metadata.tag.split(",").map((tag: string) => tag.trim())
    : [];

  const category = post.metadata.category || "Articles";

  // Palette harmonieuse pour chaque catégorie
  const getCategoryVariant = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "expérience":
      case "experience":
        return "accent";
      case "news":
        return "accent";
      case "tools":
        return "info";
      case "cheatsheets":
        return "warning";
      case "articles":
        return "warning";
      default:
        return "neutral";
    }
  };

  return (
    <SmartLink
      fillWidth
      className={styles.hover}
      unstyled
      key={post.slug}
      href={`/blog/${post.slug}`}
    >
      <Flex
        position="relative"
        direction="column"
        fillWidth
        gap="16"
        background="surface"
        className="transition-all duration-300 hover:border-[var(--brand-alpha-medium)]"
        style={{
          borderRadius: "0px",
          boxShadow: "none",
        }}
      >
        {post.metadata.image && thumbnail && (
          <SmartImage
            priority
            fillWidth
            className={styles.image}
            sizes="640px"
            border="neutral-alpha-weak"
            cursor="interactive"
            src={post.metadata.image}
            alt={"Thumbnail of " + post.metadata.title}
            aspectRatio="16 / 9"
          />
        )}

        <Column position="relative" fillWidth gap="8" vertical="start">
          {/* Badge de catégorie et Date */}
          <Flex fillWidth horizontal="space-between" vertical="center" gap="8">
            <Tag label={category} size="m" variant={getCategoryVariant(category) as any} />
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt, false)}
            </Text>
          </Flex>

          <Heading
            as="h3"
            variant="heading-strong-m"
            wrap="balance"
            align="start"
            className="font-semibold"
          >
            {post.metadata.title}
          </Heading>

          {post.metadata.summary && (
            <Text
              variant="body-default-s"
              onBackground="neutral-weak"
              align="start"
              className="line-clamp-2"
            >
              {post.metadata.summary}
            </Text>
          )}
        </Column>
      </Flex>
    </SmartLink>
  );
}
