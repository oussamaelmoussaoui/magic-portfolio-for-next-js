"use client";

import React, { Suspense, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Column, Flex, Grid, Heading, Text } from "@/once-ui/components";
import { BLOG_CATEGORIES, BlogCategory, Post as PostType } from "@/app/utils/blogTypes";
import Post from "./Post";

interface CategoryFilterProps {
  posts: PostType[];
}

const CATEGORY_SLUGS: Record<string, string> = {
  all: "all",
  expérience: "experience",
  articles: "articles",
  news: "news",
  tools: "tools",
  cheatsheets: "cheatsheets",
};

const SLUG_TO_CATEGORY: Record<string, string> = {
  all: "Tous",
  experience: "Expérience",
  articles: "Articles",
  news: "News",
  tools: "Tools",
  cheatsheets: "Cheatsheets",
};

function CategoryFilterContent({ posts }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategorySlug = searchParams?.get("category")?.toLowerCase() || "all";

  // Calcul du nombre d'articles par catégorie
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: posts.length };
    BLOG_CATEGORIES.forEach((cat) => {
      map[cat] = posts.filter(
        (p) => p.metadata.category?.toLowerCase() === cat.toLowerCase()
      ).length;
    });
    return map;
  }, [posts]);

  const handleSelectCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    const newQuery = params.toString();
    const basePath = pathname || "/blog";
    const targetUrl = newQuery ? `${basePath}?${newQuery}` : basePath;
    router.push(targetUrl, { scroll: false });
  };

  // Filtrage des articles
  const filteredPosts = useMemo(() => {
    if (currentCategorySlug === "all") {
      return posts;
    }
    const targetCategoryName = SLUG_TO_CATEGORY[currentCategorySlug];
    if (!targetCategoryName) return posts;

    return posts.filter(
      (p) => p.metadata.category?.toLowerCase() === targetCategoryName.toLowerCase()
    );
  }, [posts, currentCategorySlug]);

  const tabs = [
    { label: "Tous", slug: "all", count: counts.all },
    ...BLOG_CATEGORIES.map((cat) => ({
      label: cat,
      slug: CATEGORY_SLUGS[cat.toLowerCase()] || cat.toLowerCase(),
      count: counts[cat] || 0,
    })),
  ];

  return (
    <Column fillWidth gap="l">
      {/* Barre de pills horizontale avec scroll fluide sur mobile */}
      <div className="w-full overflow-x-auto no-scrollbar py-2">
        <Flex gap="8" vertical="center" className="min-w-max">
          {tabs.map((tab) => {
            const isSelected = currentCategorySlug === tab.slug;
            return (
              <button
                key={tab.slug}
                type="button"
                onClick={() => handleSelectCategory(tab.slug)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? "bg-[var(--brand-solid-strong)] text-[var(--brand-on-solid-strong)] border-[var(--brand-solid-strong)]"
                    : "bg-[var(--surface-background)] text-[var(--neutral-on-background-medium)] border-[var(--neutral-alpha-weak)] hover:border-[var(--brand-alpha-medium)] hover:text-[var(--brand-on-background-strong)] hover:bg-[var(--brand-background-weak)]"
                }`}
                style={{ borderRadius: "0px", boxShadow: "none" }}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[var(--neutral-background-weak)] text-[var(--neutral-on-background-weak)]"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </Flex>
      </div>

      {/* Grille des articles ou État vide */}
      {filteredPosts.length > 0 ? (
        <Grid columns={3} mobileColumns="1" fillWidth gap="m" align="start">
          {filteredPosts.map((post) => (
            <Post key={post.slug} post={post} thumbnail={true} />
          ))}
        </Grid>
      ) : (
        <Flex
          fillWidth
          direction="column"
          horizontal="center"
          vertical="center"
          paddingY="xl"
          gap="12"
          border="neutral-alpha-weak"
          background="surface"
          className="text-center my-8"
          style={{ borderRadius: "0px", boxShadow: "none" }}
        >
          <Text variant="heading-strong-m" onBackground="neutral-strong">
            Aucun article dans cette catégorie pour le moment
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak" className="max-w-xs">
            Les nouveaux articles et tutoriels sur cette thématique seront publiés prochainement.
          </Text>
          <button
            type="button"
            onClick={() => handleSelectCategory("all")}
            className="mt-2 text-xs font-semibold text-[var(--brand-solid-strong)] underline hover:opacity-80 cursor-pointer"
          >
            Afficher tous les articles ({posts.length})
          </button>
        </Flex>
      )}
    </Column>
  );
}

export function CategoryFilter({ posts }: CategoryFilterProps) {
  return (
    <Suspense
      fallback={
        <Grid columns={3} mobileColumns="1" fillWidth gap="m">
          {posts.map((post) => (
            <Post key={post.slug} post={post} thumbnail={true} />
          ))}
        </Grid>
      }
    >
      <CategoryFilterContent posts={posts} />
    </Suspense>
  );
}
