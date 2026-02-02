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
import {StackGrid} from "@/components/StackGrid"
import Link from "next/link";

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
            url: `https://${baseURL}/about_page`,
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
            paddingX="m"
            marginBottom="xl"
            paddingBottom="20"
            gap="m"
            flex={3}
            horizontal="center"
            zIndex={0}
            maxWidth={60}
          >
            <Flex gap="16" direction="row">
              <Column gap="s" horizontal="center" flex={1}>
                <Avatar src={person.avatar} size="xl" />
                {/* <Flex gap="8" vertical="center">
                  <Icon onBackground="accent-weak" name="globe" />
                  {person.location}
                </Flex> */}
                
                {/* <Flex direction="column" gap="16">
                  {Object.entries(person.skills).map(([category, items], index) => ( */}
                    {/* <div key={index}>
                      <Text variant="heading-default-s" onBackground="neutral-weak">
                        {category.toUpperCase()}
                      </Text>
                      <Flex wrap gap="8" style={{ marginTop: 4 }}>
                        {items.map((skill, i) => (
                          <Tag key={i} size="l">
                            {skill}
                          </Tag>
                        ))}
                      </Flex>
                    </div> */}
                  {/* ))}
                  
                </Flex> */}

                {person.languages.length > 0 && (
                  <Flex wrap gap="4">
                    {person.languages.map((language, index) => (
                      <Tag key={index} size="l">
                        {language}
                      </Tag>
                    ))}
                  </Flex>
                )}
              </Column>
              
              <Column
                id={about_page.intro.title}
                fillWidth
                minHeight="160"
                vertical="start"
                flex={2}
              >
                {/* {about_page.calendar.display && (
                  <Flex
                    fitWidth
                    border="brand-alpha-medium"
                    className={styles.blockAlign}
                    style={{
                      backdropFilter: "blur(var(--static-space-1))",
                    }}
                    background="brand-alpha-weak"
                    radius="full"
                    padding="4"
                    gap="8"
                    marginBottom="m"
                    vertical="center"
                  >
                    <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                    <Flex paddingX="8">Schedule a call</Flex>
                    <IconButton
                      href={about_page.calendar.link}
                      data-border="rounded"
                      variant="secondary"
                      icon="chevronRight"
                    />
                  </Flex>
                )} */}

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
                  <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" wrap horizontal="center" fitWidth>
                    {social.map(
                      (item) =>
                        item.link && (
                            <>
                                <Button
                                    className="s-flex-hide"
                                    key={item.name}
                                    href={item.link}
                                    prefixIcon={item.icon}
                                    label={item.name}
                                    size="s"
                                    variant="secondary"
                                />
                                <IconButton
                                    className="s-flex-show"
                                    size="l"
                                    key={`${item.name}-icon`}
                                    href={item.link}
                                    icon={item.icon}
                                    variant="secondary"
                                />
                            </>
                        ),
                    )}
                  </Flex>
                )}
              </Column>
            </Flex>
          
          </Column>
        )}
        
        <Column className={styles.blockAlign} flex={9} fillWidth maxWidth={50}>
          
          {about_page.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about_page.intro.description}
            </Column>
          )}

          {about_page.studies.display && (
            <>
              <Heading as="h2" id={about_page.studies.title} variant="display-strong-s" marginBottom="m">
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
              <Heading as="h2" id={about_page.work.title} variant="display-strong-s" marginBottom="m">
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
                      {experience.achievements.map((achievement: JSX.Element, index: number) => (
                        <Text
                          as="li"
                          variant="body-default-m"
                          key={`${experience.company}-${index}`}
                        >
                          {achievement}
                        </Text>
                      ))}
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
                {/* {about_page.technical.skills.map((skill, index) => (
                  <Column key={`${skill}-${index}`} fillWidth gap="4">
                    <Text variant="heading-strong-l">{skill.title}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {skill.description}
                    </Text>
                    {skill.images && skill.images.length > 0 && (
                      <Flex fillWidth paddingTop="m" gap="12" wrap>
                        {skill.images.map((image, index) => (
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
                ))} */}
                <StackGrid/>

              </Column>
            </>
          )}

          {about_page.activities.display && (
            <>
              <Heading as="h2" id={about_page.activities.title} variant="display-strong-s" marginBottom="m">
                {about_page.activities.title}
              </Heading>
              <Flex direction="column" fillWidth gap="l" marginBottom="40">
                {about_page.activities.career.map((career, index) => (
                  <Flex direction="row" key={`${career.role}-${index}`} fillWidth gap="8">
                    <Link href={career.link} className="group no-underline">
                      <Column>
                        <Text id={career.role} variant="heading-strong-l" className="text-black group-hover:text-blue-600 duration-300 easr-in-out no-underline">
                          {career.role}
                        </Text>
                        <Text variant="heading-default-xs" onBackground="neutral-weak" className="no-underline">
                          {career.club}
                        </Text>
                        <Text variant="heading-default-xs" onBackground="neutral-weak" className="no-underline">
                          {career.year}
                        </Text>
                      </Column>
                    </Link>
                  </Flex>
                ))}
              </Flex>
            </>
          )}
        </Column>

      </Flex>
    </Column>
  );
}
