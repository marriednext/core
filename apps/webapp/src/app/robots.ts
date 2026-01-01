import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/engaged/"],
    },
    sitemap: "https://marriednext.com/sitemap.xml",
  };
}
