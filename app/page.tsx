"use client";

import { Podcast } from '@/types/Podcast';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [searchResults, setSearchResults] = useState<Podcast[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/search?query=Christelijk&market=ES');
        if (!response.ok) {
          throw new Error('Failed to fetch shows');
        }
        const data = await response.json();
        setSearchResults(data.items);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const visiblePodcasts = showAll ? searchResults : searchResults.slice(0, 8);

  return (
    <div className="p-12">
      <h1 className="text-2xl font-bold mb-4">Populaire Podcasts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visiblePodcasts.map((show: Podcast) => (
          <Link 
            href={show.external_urls.spotify} 
            target="_blank" 
            rel="noopener noreferrer"
            key={show.id}
          >
            <div className='border rounded-lg flex-col h-full hover:shadow-[#ffffff4d] hover:shadow-md hover:transform overflow-hidden block hover:scale-102 ease-in transition duration-200'>
              <Image 
                src={show.images[0]?.url || '/placeholder-image.jpg'} 
                alt={show.name} 
                width={500} 
                height={500} 
                className="w-full h-48 object-cover rounded-t-lg" 
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{show.name}</h2>
                <p className="text-sm mt-2 opacity-70">
                  {show.description.length > 150 
                    ? `${show.description.substring(0, 150)}...` 
                    : show.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!showAll && searchResults.length > 8 && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 bg-white border text-black p-4 rounded-lg hover:opacity-95 font-semibold transition-90"
        >
          Bekijk meer
        </button>
      )}
    </div>
  );
}
