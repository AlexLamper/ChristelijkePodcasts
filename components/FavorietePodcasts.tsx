"use client";

import { Podcast } from "@/types/Podcast";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineMinusCircle } from "react-icons/ai";

interface FavorietePodcastsProps {
  favorites: Podcast[];
  toggleFavorite: (podcast: Podcast) => void;
}

export default function FavorietePodcasts({ favorites, toggleFavorite }: FavorietePodcastsProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mt-6 text-gray-800 dark:text-white">
        Favoriete Podcasts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {favorites.map((show) => (
          <div
            key={show.id}
            className="rounded-lg hover:shadow-lg transition-transform hover:scale-102 overflow-hidden bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] cursor-pointer"
          >
            <Link
              href={show.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Image
                src={show.images[0]?.url || "/placeholder-image.jpg"}
                alt={show.name}
                width={500}
                height={300}
                className="w-full h-36 object-cover"
              />
              <div className="p-4 flex flex-col justify-between h-32">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {show.name}
                </h2>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
                  {show.description.length > 100
                    ? `${show.description.substring(0, 100)}...`
                    : show.description}
                </p>
              </div>
            </Link>
            <div className="p-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(show);
                }}
                className="mt-2 text-red-500 hover:text-red-600 transition duration-300 ease-in-out"
                aria-label="Remove from favorites"
              >
                <AiOutlineMinusCircle className="text-2xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
