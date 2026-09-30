"use client";

import React, { useEffect, useRef, useState } from "react";
import { Column, Flex, Heading, Text } from "@/once-ui/components";

interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    value: 15,
    suffix: "+",
    label: "Projets réalisés",
    description: "Web apps, plateformes MLOps & agents IA",
  },
  {
    value: 20,
    suffix: "+",
    label: "Technologies",
    description: "Python, Next.js, Cloud, Docker, SQL",
  },
  {
    value: 5,
    suffix: "+",
    label: "Rôles associatifs",
    description: "Leadership ADE, Club Sportif, DSCC, M&M",
  },
  {
    value: 100,
    suffix: "%",
    label: "Engagement & Rigueur",
    description: "Code propre, typé et orienté impact",
  },
];

function CountUp({
  target,
  duration = 1800,
  prefix = "",
  suffix = "",
}: {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const currentVal = Math.floor(easeProgress * target);

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <div ref={elementRef} style={{ display: "inline-flex", alignItems: "baseline" }}>
      {prefix}
      {count}
      {suffix}
    </div>
  );
}

export function KeyStats() {
  return (
    <Flex fillWidth direction="column" paddingY="l" gap="l" className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 w-full">
        {stats.map((stat, idx) => (
          <Flex
            key={idx}
            direction="column"
            padding="l"
            gap="8"
            border="neutral-alpha-weak"
            background="surface"
            className="transition-all duration-300 hover:border-brand-alpha-medium"
            style={{
              borderRadius: "0px",
              boxShadow: "none",
            }}
          >
            <Heading
              as="div"
              variant="display-strong-m"
              onBackground="brand-strong"
              className="font-bold tracking-tight"
            >
              <CountUp target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </Heading>
            <Text variant="heading-strong-s" onBackground="neutral-strong">
              {stat.label}
            </Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {stat.description}
            </Text>
          </Flex>
        ))}
      </div>
    </Flex>
  );
}
