import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  SmartImage,
  Tag,
  Text,
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { person, about, social } from "@/app/resources/content";
import { about_page } from "@/app/resources/section_content";
import { StackGrid } from "@/components/StackGrid";
import Link from "next/link";
import * as React from "react";

export async function generateMetadata() {
  const title = about_page.title;
  const description = about_page.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/about`,
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

export default function About() {
  const structure = [
    {
      title: about_page.intro.title,
      display: about_page.intro.display,
      items: [],
    },
    {
      title: about_page.studies.title,
      display: about_page.studies.display,
      items: about_page.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about_page.work.title,
      display: about_page.work.display,
      items: about_page.work.experiences.map((experience) => experience.company),
    },
    {
      title: about_page.technical.title,
      display: about_page.technical.display,
      items: about_page.technical.skills.map((skill) => skill.title),
    },
    {
      title: about_page.activities.title,
      display: about_page.activities.display,
      items: about_page.activities.career.map((career) => career.role),
    },
  ];

  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            description: about_page.intro.description,
            url: `https://${baseURL}/about`,
            image: `${baseURL}/images/${person.avatar}`,
            sameAs: social
              .filter((item) => item.link && !item.link.startsWith("mailto:")) // Filter out empty links and email links
              .map((item) => item.link),
            worksFor: {
              "@type": "Organization",
              name: about_page.work.experiences[0].company || "",
            },
          }),
        }}
      />

      {about_page.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} about_page={about_page} />
        </Column>
      )}

      <Flex fillWidth mobileDirection="column" direction="column" horizontal="center">
        {about_page.avatar.display && (
          <Column
            className={styles.avatar}
            marginBottom="xl"
            paddingBottom="20"
            gap="m"
            flex={3}
            horizontal="center"
            zIndex={0}
            maxWidth="xl"
          >
            <Flex gap="16" direction="row" mobileDirection="column" horizontal="center" fillWidth>
              <Column gap="s" horizontal="start" vertical="space-between" flex={1}>
                <Avatar src={person.avatar} size="xl" />
              </Column>

              <Column
                id={about_page.intro.title}
                fillWidth
                vertical="space-between"
                flex={2}
                className={styles.blockAlign}
              >
                <Heading className={styles.textAlign} variant="display-strong-l">
                  {person.name}
                </Heading>
                <Text
                  className={styles.textAlign}
                  variant="display-default-xs"
                  onBackground="neutral-weak"
                >
                  {person.role}
                </Text>

                {social.length > 0 && (
                  <Flex
                    className={styles.blockAlign}
                    paddingTop="20"
                    gap="8"
                    wrap
                    horizontal="center"
                    fitWidth
                  >
                    {social.map(
                      (item) =>
                        item.link && (
                          <React.Fragment key={item.name}>
                            <Button
                              className="s-flex-hide"
                              href={item.link}
                              prefixIcon={item.icon}
                              label={item.name}
                              size="s"
                              variant="secondary"
                            />
                            <IconButton
                              className="s-flex-show"
                              size="l"
                              href={item.link}
                              icon={item.icon}
                              variant="secondary"
                            />
                          </React.Fragment>
                        )
                    )}
                  </Flex>
                )}
              </Column>
            </Flex>
          </Column>
        )}

        <Column className={styles.blockAlign} flex={9} fillWidth maxWidth="xl">
          {about_page.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about_page.intro.description}
            </Column>
          )}

          {about_page.studies.display && (
            <>
              <Heading
                as="h2"
                id={about_page.studies.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about_page.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about_page.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about_page.work.display && (
            <>
              <Heading
                as="h2"
                id={about_page.work.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about_page.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about_page.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Flex>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map(
                        (achievement: React.JSX.Element, index: number) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.company}-${index}`}
                          >
                            {achievement}
                          </Text>
                        )
                      )}
                    </Column>
                    {experience.images.length > 0 && (
                      <Flex fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                        {experience.images.map((image, index) => (
                          <Flex
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            //@ts-ignore
                            minWidth={image.width}
                            //@ts-ignore
                            height={image.height}
                          >
                            <SmartImage
                              enlarge
                              radius="m"
                              //@ts-ignore
                              sizes={image.width.toString()}
                              //@ts-ignore
                              alt={image.alt}
                              //@ts-ignore
                              src={image.src}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about_page.technical.display && (
            <>
              <Heading
                as="h2"
                id={about_page.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {about_page.technical.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                <StackGrid />
              </Column>
            </>
          )}

          {about_page.activities.career.map((career, index) => {
            const content = (
              <Column>
                <Text
                  id={career.role}
                  variant="heading-strong-l"
                  className={
                    career.link
                      ? "text-[var(--neutral-on-background-strong)] group-hover:text-blue-600 duration-300 ease-in-out no-underline"
                      : "text-[var(--neutral-on-background-strong)] no-underline"
                  }
                >
                  {career.role}
                </Text>
                <Text
                  variant="heading-default-xs"
                  onBackground="neutral-weak"
                  className="no-underline"
                >
                  {career.club}
                </Text>
                <Text
                  variant="heading-default-xs"
                  onBackground="neutral-weak"
                  className="no-underline"
                >
                  {career.year}
                </Text>
              </Column>
            );

            return (
              <Flex direction="row" key={`${career.role}-${index}`} fillWidth gap="8">
                {career.link ? (
                  <Link
                    href={career.link}
                    className="group py-8"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    {content}
                  </Link>
                ) : (
                  <div>{content}</div>
                )}
              </Flex>
            );
          })}
        </Column>
      </Flex>
    </Column>
  );
}
