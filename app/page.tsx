'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const Home = () => {
  interface PodcastShow {
    id: string;
    name: string;
    images: { url: string }[];
  }

  const [shows, setShows] = useState<PodcastShow[]>([]);
  const market = 'US';  // ISO 3166-1 alpha-2 country code

  useEffect(() => {
    const fetchPodcastShows = async () => {
      try {
        const res = await fetch(`/api/podcast_shows?market=${market}`);
        if (!res.ok) {
          throw new Error('Failed to fetch podcast shows');
        }
        const data = await res.json();
        setShows(data.shows);
      } catch (error) {
        console.error('Error fetching podcast shows:', error);
      }
    };

    fetchPodcastShows();
  }, [market]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Christian Podcasts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shows.length > 0 ? (
          shows.map((show) => (
            <div key={show.id} className="shadow-lg rounded-lg overflow-hidden">
              <Image
                src={show.images[0]?.url || ''}
                alt={show.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{show.name}</h2>
              </div>
            </div>
          ))
        ) : (
          <p>Loading podcasts...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
