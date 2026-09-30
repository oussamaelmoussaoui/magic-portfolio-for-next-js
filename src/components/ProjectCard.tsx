import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  Icon,
  Row,
  SmartLink,
  Tag,
  Text,
} from "@/once-ui/components";

import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars?: { src: string }[];
  link?: string;
  tag?: string | string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars = [],
  link = "",
  tag,
}) => {
  const tagsList = Array.isArray(tag)
    ? tag
    : typeof tag === "string" && tag.trim()
      ? tag.split(",").map((t) => t.trim())
      : [];

  return (
    <Row fillWidth gap="s" position="relative" className={styles.control}>
      <Carousel
        sizes="(max-width: 1200px) 100vw, 1200px"
        images={images.map((image) => ({
          src: image,
          alt: title,
        }))}
        flex={8}
      />
      <Flex
        direction="column"
        fillWidth
        padding="m"
        gap="s"
        vertical="space-between"
        flex={2}
        position="relative"
        className={styles.content}
      >
        <Column gap="8" fillWidth>
          {tagsList.length > 0 && (
            <Flex gap="4" wrap marginBottom="4">
              {tagsList.map((t, i) => (
                <Tag key={i} size="s" variant="brand">
                  {t}
                </Tag>
              ))}
            </Flex>
          )}

          {title && (
            <Heading as="h3" wrap="balance" variant="heading-strong-l">
              {title}
            </Heading>
          )}

          {description?.trim() && (
            <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
              {description}
            </Text>
          )}
        </Column>

        <Flex gap="2" wrap vertical="center" horizontal="start" paddingTop="s">
          {content?.trim() && (
            <SmartLink
              style={{ margin: "0", width: "fit-content", textDecoration: "none" }}
              href={href}
            >
              <Flex gap="8" vertical="start">
                <Text variant="body-strong-s">Read case study</Text>
                <span className={styles.arrowIcon}>
                  <Icon name="arrowRight" size="xs" />
                </span>
              </Flex>
            </SmartLink>
          )}

          {link && (
            <SmartLink
              style={{ margin: "0", width: "fit-content", textDecoration: "none" }}
              href={link}
              target="_blank"
            >
              <Flex gap="8" vertical="start">
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Live Preview
                </Text>
                <span className={styles.arrowIcon}>
                  <Icon name="arrowUpRightFromSquare" size="xs" />
                </span>
              </Flex>
            </SmartLink>
          )}
        </Flex>
      </Flex>
    </Row>
  );
};
