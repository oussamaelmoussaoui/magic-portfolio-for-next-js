"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: "DigiTalk",
    description: "E-commerce conference",
    time: "1yr ago",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "Forum des entreprises",
    description: "Networking event",
    time: "1yr ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "Festival International du Film",
    description: "Artistic event",
    time: "1month ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "Journée Scientifique du Sport",
    description: "Merging sports and science",
    time: "2yr ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
  {
    name: "DataThonX",
    description: "AI competition",
    time: "1yr ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
  {
    name: "Remise des diplomes",
    description: "AI competition",
    time: "1yr ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden p-12",
        "transition-all duration-200 ease-in-out hover:scale-[102%]",
        "bg-[var(--surface-background)] border border-[var(--neutral-alpha-weak)]"
      )}
      style={{ borderRadius: "0px", boxShadow: "none" }}
    >
      <div className="flex flex-row items-center gap-3 p-2">
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-base font-semibold whitespace-pre text-[var(--neutral-on-background-strong)]">
            <span className="text-sm sm:text-base">{name}</span>
            <span className="mx-2 text-[var(--neutral-on-background-weak)]">·</span>
            <span className="text-xs text-[var(--neutral-on-background-weak)]">{time}</span>
          </figcaption>
          <p className="text-xs sm:text-sm font-normal text-left text-[var(--neutral-on-background-medium)] mt-0.5">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex h-[500px] flex-col overflow-hidden p-2", className)}>
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
