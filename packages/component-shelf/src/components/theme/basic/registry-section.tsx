import { ExternalLink } from "lucide-react";
import type { RegistrySectionProps, RegistryEntry } from "./types";

const defaultRegistries: RegistryEntry[] = [
  {
    name: "CRATE AND BARREL",
    description: "Home essentials and modern furniture",
    url: "https://www.crateandbarrel.com",
  },
  {
    name: "AMAZON",
    description: "Everything from kitchen to adventure gear",
    url: "https://www.amazon.com",
  },
  {
    name: "WILLIAMS SONOMA",
    description: "Kitchen tools and gourmet essentials",
    url: "https://www.williams-sonoma.com",
  },
  {
    name: "HONEYMOON FUND",
    description: "Help us create unforgettable memories",
    url: "",
  },
];

const defaultCustomization = {
  sectionNumberLabel: "06",
  titleLabel: "Registry",
  descriptionLabel:
    "Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we have registered at the following places.",
};

export function RegistrySection({
  data,
  customization = defaultCustomization,
  LinkComponent = "a",
}: RegistrySectionProps) {
  const labels = { ...defaultCustomization, ...customization };
  const registries = data?.registries && data.registries.length > 0 ? data.registries : defaultRegistries;

  return (
    <section
      id="registry"
      className="py-24 md:py-32 px-4 border-b-2 border-foreground"
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] mb-4">
          {labels.sectionNumberLabel}
        </p>
        <h2 className="font-serif text-5xl md:text-7xl mb-6">
          {labels.titleLabel}
        </h2>
        <p className="text-muted-foreground mb-16 md:mb-24 max-w-xl">
          {labels.descriptionLabel}
        </p>

        <div className="space-y-px">
          {registries.map((registry, index) => {
            const hasLink = registry.url && registry.url.trim() !== "";

            if (hasLink) {
              return (
                <LinkComponent
                  key={index}
                  href={registry.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-t-2 border-foreground py-8 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs tracking-[0.2em] mb-2">
                        {registry.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {registry.description}
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </LinkComponent>
              );
            }

            return (
              <div
                key={index}
                className="block border-t-2 border-foreground py-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs tracking-[0.2em] mb-2">
                      {registry.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {registry.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
