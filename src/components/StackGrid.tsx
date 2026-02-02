import { Icons } from "@/components/ui/icons";

function StackGrid() {
  return (
    <div className="space-y-10 p-4">
      {Object.entries(Icons)
        .filter(([, cat]) => Object.keys(cat.icons).length > 0)
        .map(([catKey, category]) => (
          <section key={catKey}>
            <h3 className="mb-4 text-lg font-semibold">{category.name}</h3>

            <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {Object.entries(category.icons).map(([name, item]) => {
                const Icon = item.component;

                return (
                  <a
                    key={`${catKey}-${name}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 rounded-lg border p-6 transition 
                    hover:shadow-lg hover:border-blue-500 bg-white duration-300 ease-in-out "
                  >
                    <Icon className="h-8 w-8 text-gray-800 group-hover:text-blue-600" />
                    <span className="text-xs text-gray-600 no-underline">{name}</span>
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
