import * as React from "react";
import Image from "next/image";
import styles from "./StickyScrollReveal.module.scss";
import type { StickyScrollItem } from "./StickyScrollReveal";

// Pas de "use client" ici : ce fichier ne contient ni hooks ni
// interactivité, il peut donc être importé et exécuté depuis un
// Server Component (ex: page.tsx) sans erreur.

export interface IconGridEntry {
  key: string;
  href: string;
  // Soit un composant SVG inline (icônes de dev)...
  component?: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  // ...soit un chemin d'image statique (ex: "/clients/acme.png").
  image?: string;
  // Label optionnel : si absent, généré depuis `key`.
  label?: string;
}

function formatLabel(key: string): string {
  // reactNative -> React Native / gitHub -> Git Hub
  const withSpaces = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

export function IconsGrid({ icons }: { icons: IconGridEntry[] }) {
  return (
    <div className={styles.iconsGrid}>
      {icons.map(({ key, href, component: Icon, image, label }) => {
        const displayLabel = label ?? formatLabel(key);
        const card = (
          <span className={styles.iconCard}>
            {image ? (
              <span className={styles.iconImageWrapper}>
                <Image
                  src={image}
                  alt={displayLabel}
                  fill
                  className={styles.iconImage}
                  sizes="64px"
                />
              </span>
            ) : Icon ? (
              <Icon className={styles.iconSvg} />
            ) : null}
            <span className={styles.iconLabel}>{displayLabel}</span>
          </span>
        );
        return href ? (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            {card}
          </a>
        ) : (
          <span key={key} className={styles.iconLink}>
            {card}
          </span>
        );
      })}
    </div>
  );
}

type IconsSource = Record<
  string,
  {
    name: string;
    // Image de la catégorie (affichée dans le panneau fixe de gauche),
    image?: string;
    icons: Record<
      string,
      {
        href: string;
        component?: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
        image?: string;
        label?: string;
      }
    >;
  }
>;

/**
 * Convertit l'objet `Icons` (categorie -> { name, image?, icons }) en
 * items directement utilisables par <StickyScrollReveal items={...} />.
 * Chaque icône peut être un composant SVG (`component`) OU une image
 * statique (`image`, ex: "/clients/acme.png"). Le champ `image` au
 * niveau de la catégorie s'affiche dans le panneau fixe de gauche.
 */
export function buildStickyItemsFromIcons(source: IconsSource): StickyScrollItem[] {
  return Object.entries(source).map(([categoryKey, category]) => {
    const iconEntries: IconGridEntry[] = Object.entries(category.icons).map(([iconKey, icon]) => ({
      key: iconKey,
      href: icon.href,
      component: icon.component,
      image: icon.image,
      label: icon.label,
    }));

    return {
      id: categoryKey,
      title: category.name,
      image: category.image,
      content: <IconsGrid icons={iconEntries} />,
    };
  });
}
