"use client";

import { ExternalLink } from "lucide-react";

const registries = [
  {
    name: "Amazon",
    description: "Home essentials & everyday items",
    url: "#",
  },
  {
    name: "Crate & Barrel",
    description: "Kitchen & dining",
    url: "#",
  },
  {
    name: "Williams Sonoma",
    description: "Cookware & entertaining",
    url: "#",
  },
  {
    name: "Honeymoon Fund",
    description: "Help us create lasting memories",
    url: "#",
  },
];

export function RegistrySection() {
  return (
    <section id="registry" className="py-32 px-6 bg-[#faf9f6]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-base tracking-[0.3em] uppercase text-[#745656] mb-4">
            Gifts
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#2c2c2c] mb-6">
            Registry
          </h2>
          <p className="text-xl text-[#2c2c2c]/70 max-w-2xl mx-auto leading-relaxed">
            Your presence at our wedding is the greatest gift of all. However,
            if you wish to honor us with a gift, we have registered at the
            following places.
          </p>
        </div>

        {/* Registry List */}
        <div className="border-t border-[#2c2c2c]/10">
          {registries.map((registry) => (
            <a
              key={registry.name}
              href={registry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-8 border-b border-[#2c2c2c]/10 transition-colors duration-300 hover:bg-[#745656]/5 -mx-6 px-6"
            >
              <div className="flex-1">
                <h3 className="font-serif text-2xl md:text-3xl text-[#2c2c2c] mb-1 group-hover:text-[#745656] transition-colors duration-300">
                  {registry.name}
                </h3>
                <p className="text-lg text-[#2c2c2c]/60">
                  {registry.description}
                </p>
              </div>
              <div className="ml-6 flex items-center gap-2 text-[#745656] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-base tracking-wide">View Registry</span>
                <ExternalLink className="w-5 h-5" />
              </div>
            </a>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-lg text-[#2c2c2c]/50 mt-12 italic">
          For those who prefer, monetary gifts can be given at the reception.
        </p>
      </div>
    </section>
  );
}
