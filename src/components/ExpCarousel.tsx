"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, MoveRight } from "lucide-react";
import styles from "./ExperienceCarousel.module.scss";

export interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface ExperienceCarouselProps {
  title?: string;
  description?: string;
  items: ExperienceItem[];
}

export function ExperienceCarousel({
  title = "Experience",
  description,
  items,
}: ExperienceCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous slide"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next slide"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {items.map((item) => (
            <div className={styles.slide} key={item.id}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.card}>
                <div className={styles.image} style={{ backgroundImage: `url(${item.image})` }} />
                <div className={styles.overlay} />
                <div className={styles.content}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDescription}>{item.description}</p>
                  <span className={styles.readMore}>
                    Read more
                    <MoveRight className={styles.readMoreIcon} size={16} />
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {items.map((_, index) => (
          <button
            type="button"
            key={index}
            className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ""}`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
