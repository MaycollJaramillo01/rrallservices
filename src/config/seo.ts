export function createMetadata(params: {
  title: string;
  description: string;
  pathname?: string;
  images?: string[];
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.rrallservices.com";

  return {
    title: params.title,
    description: params.description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: params.title,
      description: params.description,
      url: `${baseUrl}${params.pathname || ""}`,
      type: "website",
      images: params.images || ["/og-default.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: params.title,
      description: params.description,
    },
    alternates: {
      canonical: `${baseUrl}${params.pathname || ""}`,
    },
  };
}
