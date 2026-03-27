import { BellIcon, CalendarIcon, FileTextIcon, GlobeIcon, InputIcon } from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

const features = [
  {
    Icon: FileTextIcon,
    name: "Web Development",
    description: "Build modern, responsive websites and web applications.",
    href: "/work",
    cta: "See projects",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "UI/UX Design",
    description: "Design intuitive and engaging user interfaces.",
    href: "/work",
    cta: "See projects",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "ML Engineering searcher",
    description: "Looking for ML engineering updates and concepts.",
    href: "/about#Technical Skills",
    cta: "View skills",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "AI Solutions ",
    description: "Explore cutting-edge AI solutions for daily problems.",
    href: "/blog",
    cta: "Read articles",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Cloud Computing",
    description: "Leverage cloud platforms for scalable and efficient applications.",
    href: "/about#Technical Skills",
    cta: "View skills",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export function CarouselCards() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
