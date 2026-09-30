"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./StickyScrollReveal.module.scss";
import { SectionTitleBar } from "./SectionTitleBar";

export interface StickyScrollItem {
  id: string;
  title: string;
  content: React.ReactNode;
  image?: string;
}

export interface StickyScrollRevealProps {
  items: StickyScrollItem[];
}

export function StickyScrollReveal({ items }: StickyScrollRevealProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        // se déclenche quand une section traverse le milieu du viewport
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const activeItem = items[activeIndex];

  return (
    <div className={styles.container}>
      <SectionTitleBar title="Tech Stack" />
      <div className={styles.wrapper}>
        <div className={styles.sticky}>
          <div className={styles.stickyInner}>
            <span className={styles.stickyTitle}>{activeItem.title}</span>
            {activeItem.image && (
              <div className={styles.imageWrapper}>
                {items.map((item, index) =>
                  item.image ? (
                    <img
                      key={item.id}
                      src={item.image}
                      alt={item.title}
                      className={`${styles.image} ${index === activeIndex ? styles.imageActive : ""}`}
                    />
                  ) : null
                )}
              </div>
            )}
            <div className={styles.progress}>
              {items.map((_, index) => (
                <span
                  key={index}
                  className={`${styles.progressDot} ${
                    index === activeIndex ? styles.progressDotActive : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.scrollColumn}>
          {/* Spacers invisibles : créent la distance de scroll qui pilote
            le changement de section, mais n'affichent rien eux-mêmes. */}
          <div className={styles.spacers}>
            {items.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className={styles.spacerSection}
              />
            ))}
          </div>

          {/* Calque fixe superposé : reste à la même position à l'écran,
            seul le contenu actif change (fondu). */}
          <div className={styles.contentSticky}>
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.contentLayer} ${
                  index === activeIndex ? styles.contentLayerActive : ""
                }`}
                aria-hidden={index !== activeIndex}
              >
                <h3 className={styles.mobileTitle}>{item.title}</h3>
                <div className={styles.text}>{item.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Note : la grille d'icônes (IconsGrid) et le helper
// buildStickyItemsFromIcons() vivent dans ./StickyScrollHelpers.tsx
// (sans "use client") afin de pouvoir être appelés depuis un
// Server Component. Ce fichier-ci reste "use client" uniquement
// pour la partie interactive (IntersectionObserver / useState).
