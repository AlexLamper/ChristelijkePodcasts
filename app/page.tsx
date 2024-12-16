"use client";

import { Podcast } from '@/types/Podcast';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Filter from '@/components/Filter';

export default function Home() {
  const [searchResults, setSearchResults] = useState<Podcast[]>([]);
  const [filteredResults, setFilteredResults] = useState<Podcast[]>([]);
  const [showAll, setShowAll] = useState(false);

  const filters = {
    frequentie: ['Dagelijks', 'Wekelijks'],
    doelgroep: ['Jongeren', 'Gezinnen', 'Kinderen'],
    taal: ['Nederlands', 'Engels'],
    duur: ['Kort', 'Gemiddeld', 'Lang'],
  };

  const [selectedFilters, setSelectedFilters] = useState({
    frequentie: '',
    doelgroep: '',
    taal: '',
    duur: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/search?market=ES');
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

  useEffect(() => {
    const filtered = searchResults.filter((podcast) => {
      const matchesFrequentie =
        !selectedFilters.frequentie || podcast.description.toLowerCase().includes(selectedFilters.frequentie.toLowerCase());
      const matchesDoelgroep =
        !selectedFilters.doelgroep || podcast.description.toLowerCase().includes(selectedFilters.doelgroep.toLowerCase());
      const matchesTaal =
        !selectedFilters.taal || podcast.description.toLowerCase() === selectedFilters.taal.toLowerCase();
      const matchesDuur =
        !selectedFilters.duur || podcast.description.toLowerCase().includes(selectedFilters.duur.toLowerCase());

      return matchesFrequentie && matchesDoelgroep && matchesTaal && matchesDuur;
    });

    setFilteredResults(filtered);
  }, [searchResults, selectedFilters]);

  const visiblePodcasts = showAll ? filteredResults : filteredResults.slice(0, 8);

  return (
    <div className="p-12">
      <h1 className="text-2xl font-bold mb-4">Ontdek Podcasts</h1>

      {/* Filter Component */}
      <Filter
        filters={filters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

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
      {!showAll && filteredResults.length > 8 && (
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
