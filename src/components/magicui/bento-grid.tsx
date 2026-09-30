import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: ReactNode;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div className={cn("grid w-full auto-rows-[22rem] grid-cols-3", className)} {...props}>
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden border transition-all duration-300",
      "bg-[var(--surface-background)] border-[var(--neutral-alpha-weak)] hover:border-[var(--brand-alpha-medium)]",
      className
    )}
    style={{ borderRadius: "0px", boxShadow: "none" }}
    {...props}
  >
    <div>{background}</div>
    <div className="p-6">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-6">
        <div className="h-12 w-12 origin-left transform-gpu text-[var(--brand-solid-strong)] transition-all duration-300 ease-in-out group-hover:scale-110">
          {Icon}
        </div>
        <h3 className="text-xl font-semibold text-[var(--neutral-on-background-strong)]">{name}</h3>
        <p className="max-w-lg text-sm text-[var(--neutral-on-background-weak)]">{description}</p>
      </div>

      <a
        href={href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold opacity-0 translate-y-4 transform-gpu transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 text-[var(--brand-solid-strong)] no-underline hover:underline"
      >
        {cta}
        <ArrowRightIcon className="ms-1 h-4 w-4" />
      </a>
    </div>

    <div className="hidden lg:flex pointer-events-none absolute bottom-0 w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
      <a
        href={href}
        className="inline-flex items-center gap-2 pointer-events-auto text-sm font-semibold text-[var(--brand-solid-strong)] no-underline hover:underline"
      >
        {cta}
        <ArrowRightIcon className="ms-1 h-4 w-4" />
      </a>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-[var(--neutral-alpha-weak)]" />
  </div>
);

export { BentoCard, BentoGrid };
