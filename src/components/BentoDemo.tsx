import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

const Icons = {
  ai: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="none"
        stroke="#888888"
        stroke-width="1.5"
        d="M9.6 6.112c.322-.816 1.478-.816 1.8 0l.91 2.31a5.8 5.8 0 0 0 3.268 3.268l2.31.91c.816.322.816 1.478 0 1.8l-2.31.91a5.8 5.8 0 0 0-3.268 3.268l-.91 2.31c-.322.816-1.478.816-1.8 0l-.91-2.31a5.8 5.8 0 0 0-3.268-3.268l-2.31-.91c-.816-.322-.816-1.478 0-1.8l2.31-.91A5.8 5.8 0 0 0 8.69 8.422zm8.563-3.382a.363.363 0 0 1 .674 0l.342.866c.221.56.665 1.004 1.225 1.225l.866.342a.363.363 0 0 1 0 .674l-.866.342a2.18 2.18 0 0 0-1.225 1.225l-.342.866a.363.363 0 0 1-.674 0l-.342-.866a2.18 2.18 0 0 0-1.225-1.225l-.867-.342a.363.363 0 0 1 0-.674l.867-.342a2.18 2.18 0 0 0 1.225-1.225z"
      />
    </svg>
  ),
  ml: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
      <path d="M0 0h2048v2048H0z" fill="none" />
      <path
        fill="currentColor"
        d="M1968 1095q38 36 59 84t21 101t-20 99t-55 82t-81 55t-100 20q-21 0-42-3l-471 235q1 6 1 12t0 12q0 53-20 99t-55 82t-81 55t-100 20q-52 0-98-20t-82-54t-56-81t-21-98v-13q0-6 2-14l-471-235q-21 3-42 3q-53 0-99-20t-82-55t-55-81t-20-100q0-71 36-131t99-94l175-642q-54-69-54-157q0-53 20-99t55-82t81-55T512 0q69 0 128 34t94 94h580q35-60 94-94t128-34q53 0 99 20t82 55t55 81t20 100q0 42-13 81t-39 73zm-432 185q0-55 22-105t64-86l-449-337l-663 497l2 31zM512 512q-47 0-92-17l-144 530q55 5 103 31t82 70l606-454l-350-262q-37 48-90 75t-115 27m1241 515q8-2 18-2t19-1h10q5 0 10 1l-177-532q-49 19-97 19q-20 0-39-3l-217 163zm-217-899q-27 0-50 10t-40 27t-28 41t-10 50q0 27 10 50t27 40t41 28t50 10q27 0 50-10t40-27t28-41t10-50q0-27-10-50t-27-40t-41-28t-50-10m-256 128H768l-2 31l407 305l193-145q-42-36-64-86t-22-105M512 128q-27 0-50 10t-40 27t-28 41t-10 50q0 27 10 50t27 40t41 28t50 10q27 0 50-10t40-27t28-41t10-50q0-27-10-50t-27-40t-41-28t-50-10M128 1280q0 27 10 50t27 40t41 28t50 10q27 0 50-10t40-27t28-41t10-50q0-27-10-50t-27-40t-41-28t-50-10q-27 0-50 10t-40 27t-28 41t-10 50m896 640q27 0 50-10t40-27t28-41t10-50q0-27-10-50t-27-40t-41-28t-50-10q-27 0-50 10t-40 27t-28 41t-10 50q0 27 10 50t27 40t41 28t50 10m0-384q63 0 119 29t92 82l375-187q-11-12-21-25t-19-27H478q-8 14-18 27t-22 25l375 187q35-52 91-81t120-30m768-128q27 0 50-10t40-27t28-41t10-50q0-33-16-62t-44-46l-1 1l-1-1l1-1q-32-19-67-19q-27 0-50 10t-40 27t-28 41t-10 50q0 27 10 50t27 40t41 28t50 10"
      />
    </svg>
  ),
  cloud: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path d="M6.657 16C4.085 16 2 13.993 2 11.517s2.085-4.482 4.657-4.482c.393-1.762 1.794-3.2 3.675-3.773c1.88-.572 3.956-.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486s-1.551 3.487-3.465 3.487H6.657M12 16v5" />
        <path d="M16 16v4a1 1 0 0 0 1 1h4M8 16v4a1 1 0 0 1-1 1H3" />
      </g>
    </svg>
  ),
  web: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      >
        <path d="M3 12c0-4.243 0-6.364 1.318-7.682S7.758 3 12 3s6.364 0 7.682 1.318S21 7.758 21 12s0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12m.5-4h17" />
        <path d="m9.5 12l-1.533 1.322C7.322 13.877 7 14.155 7 14.5s.322.623.967 1.178L9.5 17m5-5l1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.178L14.5 17" />
      </g>
    </svg>
  ),
  data: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14a9 3 0 0 0 18 0V5" />
        <path d="M3 12a9 3 0 0 0 18 0" />
      </g>
    </svg>
  ),
};

const features = [
  {
    Icon: Icons.web,
    name: "Web Development",
    description: "Build modern, responsive websites and web applications.",
    href: "/work",
    cta: "See projects",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Icons.data,
    name: "Data analysis",
    description: "Design intuitive and engaging user interfaces.",
    href: "/work",
    cta: "See projects",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Icons.ml,
    name: "ML Engineering searcher",
    description: "Looking for ML engineering updates and concepts.",
    href: "/about#Technical Skills",
    cta: "View skills",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Icons.ai,
    name: "AI Solutions ",
    description: "Explore cutting-edge AI solutions for daily problems.",
    href: "/blog",
    cta: "Read articles",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Icons.cloud,
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
