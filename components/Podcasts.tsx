"use client";

import { Podcast } from "@/types/Podcast";
import Link from "next/link";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface PodcastsProps {
  podcasts: Podcast[];
  toggleFavorite: (podcast: Podcast) => void;
  isFavorite: (podcast: Podcast) => boolean;
}

export default function Podcasts({ podcasts, toggleFavorite, isFavorite }: PodcastsProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mt-6 text-gray-800 dark:text-white">Podcasts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {podcasts.map((show: Podcast) => (
          <div
            key={show.id}
            className="rounded-lg flex flex-col hover:shadow-lg transition-transform hover:scale-102 overflow-hidden bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A]"
          >
            <Link
              href={show.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow"
            >
              <Image
                src={show.images[0]?.url || "/placeholder-image.jpg"}
                alt={show.name}
                width={500}
                height={300}
                className="w-full h-36 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate text-gray-800 dark:text-white">
                  {show.name}
                </h3>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
                  {show.description.length > 100
                    ? `${show.description.substring(0, 100)}...`
                    : show.description}
                </p>
              </div>
            </Link>
            <div className="p-4 flex justify-between items-center">
              <button onClick={() => toggleFavorite(show)}>
                {isFavorite(show) ? (
                  <AiFillHeart className="text-red-500 text-2xl hover:scale-110 transition-transform" />
                ) : (
                  <AiOutlineHeart className="text-gray-400 dark:text-gray-300 text-2xl hover:text-green-500 hover:scale-110 transition-transform" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
