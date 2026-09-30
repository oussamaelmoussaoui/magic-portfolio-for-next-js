import React from "react";

import Image from "next/image";
import styles from "@/app/page.module.scss";

import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Arrow,
  Column,
  Row,
} from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { IconButton } from "@/once-ui/components";

import { baseURL, routes } from "@/app/resources";
import {
  home,
  about,
  person,
  newsletter,
  work_sec,
  about_sec,
  social,
} from "@/app/resources/content";
import { home_page, about_page, work_page } from "@/app/resources/section_content";
import { Icons } from "@/components/ui/icons"; // ton fichier collé

import { Posts } from "@/components/blog/Posts";
import { CarouselCards } from "@/components/CarouselCards";
import { Orbits } from "@/components/Orbits";
import { AnimatedListDemo } from "@/components/AnimatedListDemo";
import { Globe } from "@/components/ui/globe";
import { LogoSlider } from "@/components/LogoSlider";
import { ExperienceCarousel } from "@/components/ExpCarousel";
import { Container } from "lucide-react";
import { StickyScrollReveal } from "@/components/StickyScrollReveal";
import { buildStickyItemsFromIcons } from "@/components/StickyScrollHelpers";
import Hero from "@/components/home/Hero";
import BeyondCode from "@/components/home/BeyondCode";
import { KeyStats } from "@/components/home/KeyStats";
import { TechStackGrid } from "@/components/home/TechStackGrid";
import { SectionTitleBar } from "@/components/SectionTitleBar";

export async function generateMetadata() {
  const title = `${person.name} — Web Developer & Data Science Engineer`;
  const description = `Portfolio of ${person.name}, engineering student in Data Science & Cloud Computing at ENSA Oujda...`;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
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

const items = buildStickyItemsFromIcons(Icons);

export default function Home() {
  return (
    <Column maxWidth="xl" className={styles.mainCont} horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            sameAs: ["https://github.com/...", "https://linkedin.com/..."],
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
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

      <Hero />

      <Column fillWidth>
        <LogoSlider />
      </Column>

      {/* Section Chiffres clés animée */}
      <KeyStats />

      {/* Section Services Bento */}
      <Column fillWidth gap="m" vertical="center">
        <SectionTitleBar title="Services & Domaines" cta="Tous les projets" href="/work" />
        <CarouselCards />
      </Column>

      {/* Section Technologies & Stack Grid */}
      <Column fillWidth gap="m" vertical="center" paddingY="l">
        <SectionTitleBar title="Technologies & Outils" cta="En savoir plus" href="/about" />
        <TechStackGrid />
      </Column>

      {/* Projets & Expériences récentes */}
      <ExperienceCarousel
        title="Expériences & Réalisations"
        description="Un aperçu de mes projets récents en développement, machine learning et IA."
        items={[
          {
            id: "alienture",
            title: "Alienture",
            description:
              "Startup marocaine d'IA pour déployer et sécuriser des solutions IA en local.",
            href: "/work/watiq-agent",
            image: "/images/blogs_covers/Architecture.jpg",
          },
          {
            id: "Watiq",
            title: "Watiq - Agent Juridique IA",
            description:
              "Système multi-agents pour des consultations et recherches juridiques marocaines.",
            href: "/work/watiq-agent",
            image: "/images/gallery/ai4m.png",
          },
          {
            id: "SecuredMLOps",
            title: "SecuredMLOps Platform",
            description:
              "Plateforme MLOps complète avec suivi des expériences, registry de modèles et sécurité.",
            href: "/blog/concevoir-plateforme-mlops",
            image: "/images/blogs_covers/SecuredMLOPS_cover.png",
          },
        ]}
      />

      <BeyondCode />

      {/* Section Derniers Articles */}
      <Column fillWidth paddingY="xl" gap="l" align="center" horizontal="center">
        {routes["/blog"] && (
          <Flex
            fillWidth
            gap="24"
            mobileDirection="column"
            horizontal="space-between"
            align="center"
          >
            <Flex flex={2} direction="column">
              <RevealFx translateY="4" horizontal="start">
                <Heading
                  wrap="balance"
                  align="start"
                  variant="display-strong-m"
                  className="font-bold"
                >
                  {home_page.blog_sec.sec_title}
                </Heading>
              </RevealFx>
              <RevealFx translateY="4" horizontal="start">
                <Text
                  wrap="balance"
                  align="start"
                  variant="body-default-l"
                  onBackground="neutral-weak"
                >
                  {home_page.blog_sec.sec_description}
                </Text>
              </RevealFx>
            </Flex>
            <Flex flex={3} paddingX="20" fillWidth>
              <RevealFx translateY="4" horizontal="start">
                <Posts range={[1, 2]} columns="2" />
              </RevealFx>
            </Flex>
          </Flex>
        )}
      </Column>
    </Column>
  );
}
