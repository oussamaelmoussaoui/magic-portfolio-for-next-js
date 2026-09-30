import { Row, Flex, Column, Heading, Text, RevealFx, Button, Avatar } from "@/once-ui/components";
import { Projects } from "../work/Projects";

import {
  home,
  about,
  person,
  newsletter,
  work_sec,
  about_sec,
  social,
} from "@/app/resources/content";

export default function Hero() {
  return (
    <Flex
      fillWidth
      position="relative"
      vertical="start"
      gap="l"
      mobileDirection="column"
      tabletDirection="column"
      style={{ alignItems: "flex-start" }}
    >
      <Column
        flex={4}
        gap="24"
        style={{
          position: "sticky",
          top: "6rem",
          alignSelf: "flex-start",
          height: "fit-content",
        }}
        className="w-full"
      >
        <Column gap="8">
          <Heading wrap="balance" align="start" variant="display-strong-l" className="font-bold">
            {person.name}
          </Heading>
          <Text wrap="balance" align="start" onBackground="brand-strong" variant="heading-strong-s">
            {person.role}
          </Text>
          <Text
            wrap="balance"
            align="start"
            onBackground="neutral-medium"
            variant="body-default-m"
            className="mt-2"
          >
            {about_sec.description}
          </Text>
        </Column>

        <Flex gap="12" wrap vertical="center" horizontal="start">
          <Button
            id="about"
            data-border="conservative"
            href="/about"
            variant="primary"
            size="m"
            suffixIcon="arrowRight"
          >
            {about.title}
          </Button>

          <Button
            id="resume-download"
            data-border="conservative"
            href="/resume.pdf"
            variant="secondary"
            size="m"
            target="_blank"
            rel="noopener noreferrer"
            prefixIcon="download"
          >
            CV / Resume
          </Button>
        </Flex>
      </Column>

      <Flex flex={8} fillWidth>
        <Flex fillWidth direction="column" gap="s">
          <Projects range={[1, 3]} />
        </Flex>
      </Flex>
    </Flex>
  );
}
