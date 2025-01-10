// app/podcasts/[id]/page.tsx
import { Podcast } from "@/types/Podcast";
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
  const res = await fetch(`https://api.spotify.com/v1/shows/${id}`, {
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

// PodcastDetails Component
export default async function PodcastDetails(props: PodcastDetailsProps) {
  const { id } = await props.params;

  try {
    const podcast = await getPodcast(id);

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-900">
        {/* Back Arrow */}
        <div className="mb-4">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            ← Back to Podcasts
          </Link>
        </div>
      
        {/* Podcast Title */}
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-4">
            {podcast.name}
        </h1>
    
        {/* Podcast Image */}
        <div className="mb-8">
        {podcast.images.length > 0 && (
            <Image
                src={podcast.images[0].url}
                alt={podcast.name}
                className="rounded-md shadow-lg float-left mr-4 mb-4 w-1/4 max-w-full object-cover"
                width={200} 
                height={200} 
            />
        )}
        </div>

    
        {/* Podcast Description */}
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            {podcast.description}
        </p>
      
        {/* Podcast Details */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md clear-left mt-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Details</h2>
          <ul className="space-y-2">
            <li>
              <strong className="text-gray-800 dark:text-gray-200">ID:</strong> {podcast.id}
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Language:</strong>{" "}
              {Array.isArray(podcast.language)
                ? podcast.language.join(", ")
                : podcast.language}
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Spotify Link:</strong>{" "}
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
      </div>      
    );
  } catch (error) {
    console.error(error);
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
