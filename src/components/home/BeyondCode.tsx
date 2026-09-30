import { Row, Flex, Heading, Text, Button } from "@/once-ui/components";
import { AnimatedListDemo } from "../AnimatedListDemo";
import { home_page } from "@/app/resources/section_content";

export default function BeyondCode() {
  return (
    <Flex
      align="center"
      vertical="center"
      horizontal="space-between"
      fillWidth
      mobileDirection="column"
      gap="32"
    >
      <Flex flex={1}>
        <AnimatedListDemo />
      </Flex>
      <Flex flex={2} gap="16" direction="column">
        <Heading wrap="balance" align="start" className="text-6xl font-semibold">
          {home_page.activities_sec.sec_title}
        </Heading>
        <Text wrap="balance" align="start" onBackground="neutral-medium" variant="body-default-xl">
          {home_page.activities_sec.sec_description}
        </Text>
        <Button
          id="skills"
          href="/about#Beyond the Classroom"
          variant="primary"
          size="m"
          data-border="conservative"
          suffixIcon="arrowRight"
        >
          {home_page.activities_sec.cta}
        </Button>
      </Flex>
    </Flex>
  );
}
