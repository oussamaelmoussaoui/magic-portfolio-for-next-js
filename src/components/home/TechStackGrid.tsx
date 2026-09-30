"use client";

import React from "react";
import { Flex, Heading, Text } from "@/once-ui/components";
import { Icons } from "@/components/ui/icons";
import styles from "./TechStack.module.scss";

import { cn } from "@/lib/utils";

interface TechItem {
  name: string;
  category: string;
  href?: string;
  component: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

const featuredTechs: TechItem[] = [
  {
    name: "Python",
    category: "ML & Backend",
    href: "https://www.python.org/",
    component: Icons.ml.icons.python.component,
  },
  {
    name: "Next.js",
    category: "Full Stack",
    href: "https://nextjs.org/",
    component: Icons.web.icons.nextjs.component,
  },
  {
    name: "React",
    category: "Frontend",
    href: "https://react.dev/",
    component: Icons.web.icons.react.component,
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    href: "https://tailwindcss.com/",
    component: Icons.web.icons.tailwind.component,
  },
  {
    name: "TensorFlow",
    category: "Deep Learning",
    href: "https://www.tensorflow.org/",
    component: Icons.ml.icons.tensorflow.component,
  },
  {
    name: "Hugging Face",
    category: "AI & LLM",
    href: "https://huggingface.co/",
    component: Icons.ml.icons.huggingface.component,
  },
  {
    name: "MySQL",
    category: "Database",
    href: "https://www.mysql.com/",
    component: Icons.db.icons.mysql.component,
  },
  {
    name: "Supabase",
    category: "Backend & DB",
    href: "https://supabase.com/",
    component: Icons.db.icons.supabase.component,
  },
  {
    name: "OpenCV",
    category: "Computer Vision",
    href: "https://opencv.org/",
    component: Icons.ml.icons.opencv.component,
  },
  {
    name: "Pandas",
    category: "Data Science",
    href: "https://pandas.pydata.org/",
    component: Icons.ml.icons.pandas.component,
  },
  {
    name: "Ollama",
    category: "Local LLM",
    href: "https://ollama.com/",
    component: Icons.ai.icons.ollama.component,
  },
  {
    name: "GitHub",
    category: "Version Control",
    href: "https://github.com/",
    component: Icons.git.icons.gitHub.component,
  },
];

export function TechStackGrid() {
  return (
    <Flex fillWidth direction="column" gap="m" paddingY="m" className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
        {featuredTechs.map((tech) => {
          const IconComponent = tech.component;
          return (
            <a
              key={tech.name}
              href={tech.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialLink} group relative flex flex-col items-start 
              w-full h-full border transition-all duration-300 gap-1 p-6
              border-[var(--neutral-alpha-weak)] `}
              style={{
                borderRadius: "0px",
                boxShadow: "none",
              }}
            >
              <div className="transform-gpu flex flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-6">
                <div
                  className="w-12 h-12 flex items-center justify-center mb-2 transition-transform duration-300"
                  style={{ color: "var(--neutral-on-background-strong)" }}
                >
                  <IconComponent className="h-12 w-12 group-hover:text-blue-700 transition-colors transition-all duration-300" />
                </div>
                <span
                  className="text-ll font-semibold text-left leading-tight group-hover:text-white transition-colors"
                  style={{ color: "var(--neutral-on-background-strong)" }}
                >
                  {tech.name}
                </span>
                <span
                  className="text-sm text-left mt-0.5 group-hover:text-white transition-colors"
                  style={{ color: "var(--neutral-on-background-weak)" }}
                >
                  {tech.category}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </Flex>
  );
}
