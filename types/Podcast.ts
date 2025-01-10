// types/Podcast.ts

export interface Podcast {
  available_markets: string[];
  copyrights: Copyright[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: string;
  uri: string;
  total_episodes: number;
  episodes: EpisodesLink;
}

export interface Copyright {
  text: string;
  type: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface EpisodesLink {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface Episode {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  type: string;
  uri: string;
}

// Optionally, you can extend the Podcast interface to include episodes directly
export interface PodcastWithEpisodes extends Podcast {
  episodeList: Episode[];
}
