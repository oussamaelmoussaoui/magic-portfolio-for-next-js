"use client";

import {
  Button,
  Flex,
  Heading,
  Icon,
  Line,
  SmartLink,
  Text,
  ToggleButton,
} from "@/once-ui/components";
import { person, social, about, work, blog, home } from "@/app/resources/content";
import styles from "./Footer.module.scss";
import { routes } from "@/app/resources";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname() ?? "";

  const emailLink =
    social.find((s) => s.name.toLowerCase() === "email")?.link || "mailto:oelmoussawi@gmail.com";

  return (
    <Flex
      as="footer"
      direction="column"
      fillWidth
      paddingTop="xl"
      paddingX="l"
      horizontal="center"
      className={styles.footer}
    >
      <Flex direction="column" fillWidth fillHeight maxWidth="xl" gap="xl">
        <Flex
          fillWidth
          horizontal="center"
          mobileDirection="column"
          className="py-48"
          direction="column"
        >
          <Flex
            className={styles.mobile}
            fillWidth
            gap="l"
            vertical="start"
            horizontal="space-between"
          >
            <Flex
              direction="column"
              vertical="space-between"
              gap="8"
              flex={6}
              maxWidth="m"
              fillHeight
            >
              <Flex direction="column" gap="8" flex={6} fillHeight vertical="start">
                <Text variant="body-strong-m" onBackground="brand-strong">
                  Disponible pour de nouveaux projets
                </Text>
                <Heading as="h1" variant="display-strong-xl" wrap="balance">
                  Donnons vie à vos <br /> idées ensemble.
                </Heading>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  Que ce soit pour du développement web, du machine learning ou de l'IA, n'hésitez
                  pas à me contacter.
                </Text>
              </Flex>
              {/* Info perso */}
              <Flex direction="column" gap="8" flex={6} fillHeight vertical="end">
                <Heading as="h3" variant="heading-strong-m">
                  {person.name}
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {person.role}
                </Text>
              </Flex>
            </Flex>

            {/* Réseaux sociaux avec flèches */}
            <Flex direction="column" flex={1}>
              <Flex wrap direction="column" fillHeight fillWidth className="w-full h-full">
                {social
                  .filter((s) => s.link)
                  .map((item) => (
                    <a
                      key={item.name}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.socialLink} flex items-center gap-2 text-[var(--neutral-weak)] transition-colors border border-[var(--neutral-alpha-weak)] w-full h-full p-28`}
                    >
                      <span>{item.name}</span>
                      <span className={styles.arrow}>↗</span>
                    </a>
                  ))}
              </Flex>
            </Flex>
          </Flex>

          <Flex
            fillWidth
            horizontal="space-between"
            vertical="center"
            className="border-t border-[var(--neutral-alpha-weak)]"
            mobileDirection="column"
            gap="8"
            paddingTop="m"
          >
            <Text variant="body-default-xs" onBackground="neutral-weak">
              © {currentYear} {person.name}. Tous droits réservés.
            </Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              Moving with passion
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {/* Espace supplémentaire sur mobile pour ne pas chevaucher la barre de navigation basse */}
      {/* <Flex height="80" show="s" /> */}
    </Flex>
  );
};
