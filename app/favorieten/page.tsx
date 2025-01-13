"use client";

import { Podcast } from '@/types/Podcast';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/mode-toggle';

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
      <div className="flex items-center justify-between">
        <h1 className="lg:text-3xl sm:text-xl text-xl font-bold mb-4"><span className="sm:dark:text-green-500">Favoriete</span> Podcasts</h1>
        <div className="mb-2 space-y-2">
          <ModeToggle />
          <SidebarTrigger className="lg:hidden" />
        </div>
      </div>
      <div className='lg:hidden'>
        <Separator />
      </div>
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
