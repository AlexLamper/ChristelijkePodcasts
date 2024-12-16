"use client";

import { Podcast } from '@/types/Podcast';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AiOutlineMinusCircle } from 'react-icons/ai';

export default function Favourites() {
  const [favorites, setFavorites] = useState<Podcast[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFavorite = (podcast: Podcast) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== podcast.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update localStorage
  };

  return (
    <div className="p-12">
      <h1 className="text-2xl font-bold mb-4">Favoriete Podcasts</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {favorites.map((show) => (
            <div key={show.id} className="border rounded-lg overflow-hidden">
              <Image
                src={show.images[0]?.url || '/placeholder-image.jpg'}
                alt={show.name}
                width={500}
                height={500}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between h-32">
                <h2 className="text-xl font-semibold">{show.name}</h2>
                <button
                  onClick={() => removeFavorite(show)}
                  className="mt-2 text-red-500 hover:text-red-600 transition duration-300 ease-in-out"
                  aria-label="Remove from favorites"
                >
                  <AiOutlineMinusCircle className="text-2xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-6">Je hebt nog geen favoriete podcasts toegevoegd.</p>
      )}
    </div>
  );
}
