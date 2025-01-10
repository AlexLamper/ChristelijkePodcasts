// app/podcasts/[id]/page.tsx
import { Podcast, Episode } from "@/types/Podcast";
import Link from "next/link";
import Image from "next/image";

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

    console.log("Podcast Data:", podcast); // Debugging log to check API response

    // Extract and format the language
    // const language = Array.isArray(podcast.languages)
    //   ? podcast.languages.join(", ")
    //   : podcast.languages || "Not specified";

    return (
      <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-900">
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
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-4">
          {podcast.name}
        </h1>
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
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
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
              <strong className="text-gray-800 dark:text-gray-200">Spotify Link:</strong> 
              <a
                href={podcast.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 underline"
              >
                Open on Spotify
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
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Episodes</h2>
          <ul className="space-y-4">
            {episodes.map((episode) => (
              <li key={episode.id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  {episode.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{episode.description}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Duration: {(episode.duration_ms / 60000).toFixed(2)} minutes
                </p>
                <a
                  href={episode.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 underline"
                >
                  Listen on Spotify
                </a>
              </li>
            ))}
          </ul>
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
