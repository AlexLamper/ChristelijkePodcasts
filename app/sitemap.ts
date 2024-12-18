import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://christelijkepodcasts.com",
      lastModified: new Date(),
    },
    {
      url: "https://christelijkepodcasts.com/favorieten",
      lastModified: new Date(),
    },
    {
      url: "https://christelijkepodcasts.com/contact",
      lastModified: new Date(),
    },
    {
      url: "https://christelijkepodcasts.com/help",
      lastModified: new Date(),
    },
  ];
}
