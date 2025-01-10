import { Podcast, Episode } from "@/types/Podcast";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface PodcastDetailsProps {
  params: Promise<{ id: string }>;
}

// Fetch Spotify Access Token
async function getSpotifyAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const tokenUrl = "https://accounts.spotify.com/api/token";

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Spotify access token");
  }

  const data = await response.json();
  return data.access_token;
}

// Fetch Podcast Data
async function getPodcast(id: string): Promise<Podcast> {
  const accessToken = await getSpotifyAccessToken();
  const res = await fetch(`https://api.spotify.com/v1/shows/${id}?locale=*`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const errorDetails = await res.json();
    console.error("Spotify API Error:", errorDetails);
    throw new Error("Failed to fetch podcast data");
  }

  return res.json();
}

// Fetch Episodes
async function getEpisodes(id: string): Promise<Episode[]> {
  const accessToken = await getSpotifyAccessToken();
  const res = await fetch(
    `https://api.spotify.com/v1/shows/${id}/episodes?limit=50&locale=*`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const errorDetails = await res.json();
    console.error("Spotify API Error:", errorDetails);
    throw new Error("Failed to fetch episodes");
  }

  const data = await res.json();
  return data.items;
}

// PodcastDetails Component
export default async function PodcastDetails(props: PodcastDetailsProps) {
  const { id } = await props.params;

  try {
    const podcast = await getPodcast(id);
    const episodes = await getEpisodes(id);

    return (
      <div className="p-6 mx-auto">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            ← Back to Podcasts
          </Link>
        </div>

        {/* Podcast Details */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-4">
            {podcast.name}
          </h1>
          <div className="mb-2">
            <ModeToggle />
          </div>
          <SidebarTrigger className="lg:hidden mb-4" />
        </div>
        
        {/* Podcast Description */}
        <div className="flex flex-col md:flex-row mb-8">
          {podcast.images.length > 0 && (
            <Image
              src={podcast.images[0].url}
              alt={podcast.name}
              className="rounded-md shadow-lg mb-4 md:mb-0 md:mr-4"
              width={200}
              height={200}
            />
          )}
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {podcast.description}
          </p>
        </div>

        {/* Podcast Meta Details */}
        <div className="bg-gray-100 dark:bg-[#1A1A1A] p-4 rounded-md border border-gray-200 dark:border-[#2A2A2A]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Podcast Details
          </h2>
          <ul className="space-y-2">
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Publisher:</strong> {podcast.publisher}
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Total Episodes:</strong> {podcast.total_episodes}
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Explicit Content:</strong> {podcast.explicit ? "Yes" : "No"}
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Available Markets:</strong> {podcast.available_markets.join(", ")}
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Spotify Link: </strong>
              <a
                href={podcast.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 underline"
              >
                Beluister op Spotify
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright Details */}
        {podcast.copyrights.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Copyright</h2>
            <ul className="space-y-2">
              {podcast.copyrights.map((copyright, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {copyright.type}: {copyright.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Episodes */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Episodes - {podcast.total_episodes}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {episodes.map((episode) => {
              // Limit description to 50 words
              const description = episode.description
                ? episode.description.split(" ").slice(0, 50).join(" ") + (episode.description.split(" ").length > 50 ? "..." : "")
                : "No description available.";

              return (
                <li key={episode.id} className="p-4 bg-transparent dark:bg-[#1A1A1A] rounded-md shadow-sm border border-gray-200 dark:border-[#2A2A2A]">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                    {episode.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Duration: {(episode.duration_ms / 60000).toFixed(2)} minutes
                  </p>
                  <a
                    href={episode.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 underline"
                  >
                    Beluister op Spotify
                  </a>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching podcast details:", error);

    return (
      <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          Error loading podcast
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Please try again later.</p>
      </div>
    );
  }
}
