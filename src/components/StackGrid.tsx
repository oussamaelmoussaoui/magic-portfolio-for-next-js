import { Icons } from "@/components/ui/icons";
import styles from "./home/TechStack.module.scss";

function StackGrid() {
  return (
    <div className="space-y-10 p-4">
      {Object.entries(Icons)
        .filter(([, cat]) => Object.keys(cat.icons).length > 0)
        .map(([catKey, category]) => (
          <section key={catKey}>
            <h3 className="mb-4 text-lg font-semibold">{category.name}</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {Object.entries(category.icons).map(([name, item]) => {
                const Icon = item.component;

                return (
                  <a
                    key={`${catKey}-${name}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialLink} group relative flex flex-col items-start 
                    w-full h-full border transition-all duration-300 gap-1 p-6
                    border-[var(--neutral-alpha-weak)] `}
                    style={{ borderRadius: "0px", boxShadow: "none", textDecoration: "none" }}
                  >
                    <Icon className="h-12 w-12 text-[var(--neutral-on-background-strong)] group-hover:text-blue-700 transition-colors transition-all duration-300" />
                    <span className="text-ll font-semibold text-left leading-tight group-hover:text-black transition-colors text-[var(--neutral-on-background-medium)]">
                      {name}
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        ))}
    </div>
  );
}

export { StackGrid };
