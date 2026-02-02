import React from "react";
import { Images, Snail } from 'lucide-react';

import Image from "next/image";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Arrow, Column } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";

import { baseURL, routes } from "@/app/resources";
import { home, about, person, newsletter, work_sec, about_sec } from "@/app/resources/content";
import { home_page, about_page, work_page } from "@/app/resources/section_content"

import { Posts } from "@/components/blog/Posts";
import { CarouselCards } from "@/components/CarouselCards";
import { Orbits } from "@/components/Orbits";
import { AnimatedListDemo } from "@/components/AnimatedListDemo"


export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
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

export default function Home() {
  return (
    <Column maxWidth="l" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
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
      
      <Column fillWidth paddingY="l" gap="m" height={40} >
        <Column maxWidth="xl" fillWidth fillHeight vertical="center">

          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="m">
            <Heading wrap="balance" align="center" className="text-6xl font-semibold"> 
              {home_page.hero_sec.sec_title}
            </Heading>
          </RevealFx>

          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="m">
            <Text wrap="balance" align="center" onBackground="neutral-medium" variant="body-default-xl">
              {home_page.hero_sec.sec_description}
            </Text>
          </RevealFx>

          <RevealFx translateY="12" delay={0.4} horizontal="center">
            <Flex gap="12" vertical="center">
              <Button
                id="about"
                data-border="rounded"
                href="/about"
                variant="primary"
                size="m"
              >
                <Flex gap="8" vertical="center">
                  {about.avatar.display && (
                    <Avatar
                      style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                      src={person.avatar}
                      size="m"
                    />
                  )}
                  {about.title}
                </Flex>
              </Button>

              <Button
                id="resume-download"
                data-border="rounded"
                href="/about"
                variant="secondary"
                size="m"
              >
                <Flex gap="8" vertical="center">
                  Download resume 
                </Flex>
              </Button>
            </Flex>
          </RevealFx>


        </Column>
      </Column>

      <CarouselCards/>

      <RevealFx translateY="16" delay={0.6}>
        <Column fitWidth vertical="center"  padding="m" radius="l" marginX="s" >
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="m">
            <Heading wrap="balance" align="center" className="text-6xl font-semibold"> 
              {home_page.work_sec.sec_title}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="m">
            <Text wrap="balance" align="center" onBackground="neutral-medium" variant="body-default-xl">
              {home_page.work_sec.sec_description}
            </Text>
          </RevealFx>
          <Projects range={[1, 1]} />
          <RevealFx translateY="12" delay={0.4} horizontal="center">
            <Flex gap="12" vertical="center">
              <Button
                id="about"
                data-border="rounded"
                href="/about"
                variant="primary"
                size="m"
                
              >
                <Flex gap="8" vertical="center">
                  {home_page.work_sec.cta}
                </Flex>
              </Button>
            </Flex>
          </RevealFx>
        </Column>
      </RevealFx>

      <Column fillWidth paddingY="xl" gap="m" height={40} >
        
        <Flex maxWidth="xl" fillWidth fillHeight vertical="center" gap="32">
          <RevealFx translateY="4" horizontal="center" >
            <Image
              src="/images/mwa.jpg"
              alt="About me image"
              width={500}
              height={700}
              className="rounded-lg shadow-lg"
            />
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth fillHeight vertical="center" horizontal="start">
            <Flex gap="16" direction="column">
              <Heading wrap="balance" align="start" className="text-6xl font-semibold text-blue ">
                {home_page.about_sec.sec_title}
              </Heading>
              <Text wrap="balance" align="start" onBackground="neutral-medium" variant="body-default-xl">
                {home_page.about_sec.sec_description}
              </Text>
            </Flex>
          </RevealFx>
        </Flex>

        

      </Column>

      <Flex align="center" vertical="center" horizontal="space-between" fillWidth mobileDirection="column">
        
        <Flex flex={2} gap="16" direction="column">
          <Heading wrap="balance" align="start"  className="text-6xl font-semibold"> 
            {home_page.skills_sec.sec_title}
          </Heading>
          <Text wrap="balance" align="start" onBackground="neutral-medium" variant="body-default-xl">
            {home_page.skills_sec.sec_description}
          </Text>
          <Button
            id="skills"
            data-border="rounded"
            href="/about"
            variant="primary"
            size="m"
          >
            {home_page.skills_sec.cta}
          </Button>
        </Flex>

        <Flex flex={1}>
          <Orbits/>
        </Flex>
        
      </Flex>

      <Flex align="center" vertical="center" horizontal="space-between" fillWidth mobileDirection="column" gap="32">
        <Flex flex={1}>
          <AnimatedListDemo/>
        </Flex>
        <Flex flex={1} gap="16" direction="column">
          <Heading wrap="balance" align="start"  className="text-6xl font-semibold"> 
            {home_page.activities_sec.sec_title}
          </Heading>
          <Text wrap="balance" align="start" onBackground="neutral-medium" variant="body-default-xl">
            {home_page.activities_sec.sec_description}
          </Text>
          <Button
            id="skills"
            data-border="rounded"
            href="/about"
            variant="primary"
            size="m"
          >
            {home_page.activities_sec.cta}
          </Button>
        </Flex>
        
      </Flex>

      <Column fillWidth paddingY="xl" gap="l" align="center" height={60} >
        {routes["/blog"] && (
          <Flex fillWidth gap="24" mobileDirection="column" horizontal="space-between">
            <Flex flex={2} direction="column">
              <RevealFx translateY="4" horizontal="start">
                <Heading wrap="balance" align="start"  className="text-6xl font-semibold">
                  {home_page.blog_sec.sec_title}
                </Heading>
              </RevealFx>
              <RevealFx translateY="4" horizontal="start">
                <Text wrap="balance" align="start" variant="body-default-xl">
                  {home_page.blog_sec.sec_description}
                </Text>
              </RevealFx>
            </Flex>
            <Flex flex={3} paddingX="20">
              <RevealFx translateY="4" horizontal="start">
                <Posts range={[1, 2]} columns="2" />
              </RevealFx>
            </Flex>
          </Flex>
        )} 
      </Column>

      

      {/* <Projects range={[1, 2]} /> */}
{/*       {newsletter.display && <Mailchimp newsletter={newsletter} />} */}
    </Column>
  );
}
