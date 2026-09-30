import Link from "next/link";
import styles from "./SectionTitleBar.module.scss";
import { Button } from "@/once-ui/components";

export interface SectionTitleBarProps {
  title: string;
  cta?: string;
  href?: string;
  secteur?: string;
  className?: string;
}

export function SectionTitleBar({ title, cta, href, secteur, className }: SectionTitleBarProps) {
  return (
    <div className={styles.bar || className}>
      <div className={styles.left}>
        {secteur && <span className={styles.secteur}>{secteur}</span>}
        <h2 className={styles.title}>{title}</h2>
      </div>

      {cta && href && (
        <Button
          href={href}
          className={styles.cta}
          id={title}
          data-border="conservative"
          variant="secondary"
          size="m"
        >
          {cta}
        </Button>
      )}
    </div>
  );
}
