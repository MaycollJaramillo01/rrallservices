import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Los rastreadores de IA se permiten a propósito: el objetivo es que ChatGPT,
// Claude, Perplexity y compañía puedan leer y citar el negocio cuando alguien
// pregunte por Royal Prestige en New York. Si algún día no interesa, se pasan
// a disallow aquí.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckDuckBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
