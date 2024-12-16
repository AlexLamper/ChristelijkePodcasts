"use client";

import { Podcast } from '@/types/Podcast';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Filter from '@/components/Filter';
import { AiOutlineHeart, AiFillHeart, AiOutlineMinusCircle } from 'react-icons/ai';
import { ClipLoader } from 'react-spinners';

export default function Home() {
  const [searchResults, setSearchResults] = useState<Podcast[]>([]);
  const [filteredResults, setFilteredResults] = useState<Podcast[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [favorites, setFavorites] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

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
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/search?market=ES');
        if (!response.ok) {
          throw new Error('Failed to fetch shows');
        }
        const data = await response.json();
        setSearchResults(data.items);
        setLoading(false); // Set loading to false after data is fetched
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

  // Add/Remove from Favorites
  const toggleFavorite = (podcast: Podcast) => {
    const isFavorite = favorites.some((fav) => fav.id === podcast.id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== podcast.id) // Remove from favorites
      : [...favorites, podcast]; // Add to favorites

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Save to LocalStorage
  };

  // Check if a podcast is a favorite
  const isFavorite = (podcast: Podcast) => favorites.some((fav) => fav.id === podcast.id);

  return (
    <div className="p-12">
      <h1 className="text-2xl font-bold mb-4">Ontdek Podcasts</h1>

      {/* Filter Component */}
      <Filter
        filters={filters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={50} color="#22C55D" />
        </div>
      ) : (
        <>
          {favorites.length > 0 && (
            <div className='my-12'>
              <h2 className="text-xl font-semibold mt-6">Favoriete Podcasts</h2>
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
          )}

          <h2 className="text-xl font-semibold mt-6">Alle Podcasts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {visiblePodcasts.map((show: Podcast) => (
              <div 
                className="border rounded-lg flex-col h-full hover:shadow-[#ffffff4d] hover:shadow-md hover:transform overflow-hidden block hover:scale-102 ease-in transition duration-200"
                key={show.id}
              >
                <Link 
                  href={show.external_urls.spotify} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-grow"
                >
                  <Image 
                    src={show.images[0]?.url || '/placeholder-image.jpg'} 
                    alt={show.name} 
                    width={500} 
                    height={500} 
                    className="w-full h-48 object-cover rounded-t-lg" 
                  />
                  <div className="p-4 flex flex-col justify-between h-32">
                    <h2 className="text-xl font-semibold">{show.name}</h2>
                    <p className="text-sm mt-2 opacity-70">
                      {show.description.length > 120 
                        ? `${show.description.substring(0, 120)}...` 
                        : show.description}
                    </p>
                  </div>
                </Link>
                <div className="p-4 flex justify-between items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(show);
                    }}
                    className="mt-2"
                  >
                    {isFavorite(show) ? (
                      <AiFillHeart className="text-red-500 text-2xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-110" />
                    ) : (
                      <AiOutlineHeart className="text-gray-500 text-2xl cursor-pointer transition duration-300 ease-in-out transform hover:text-green-500 hover:scale-110" />
                    )}
                  </button>
                </div>
              </div>
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
        </>
      )}
    </div>
  );
}
