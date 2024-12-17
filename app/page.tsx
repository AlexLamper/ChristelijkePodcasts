"use client";

import { Podcast } from '@/types/Podcast';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Filter from '@/components/Filter';
import { AiOutlineHeart, AiFillHeart, AiOutlineMinusCircle } from 'react-icons/ai';
import { ClipLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [searchResults, setSearchResults] = useState<Podcast[]>([]);
  const [filteredResults, setFilteredResults] = useState<Podcast[]>([]);
  const [favorites, setFavorites] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8); // Initial count of podcasts displayed
  const [showAll, setShowAll] = useState(false); // Tracks if all podcasts are displayed

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

  const observerRef = useRef<HTMLDivElement | null>(null);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Fetch podcast data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/search?market=ES');
        if (!response.ok) throw new Error('Failed to fetch shows');
        const data = await response.json();
        setSearchResults(data.items);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // Filter podcasts based on selected filters
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

  // Infinite scroll logic (only active when `showAll` is false)
  useEffect(() => {
    if (showAll) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => prev + 8);
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [showAll]);

  const visiblePodcasts = showAll ? filteredResults : filteredResults.slice(0, visibleCount);

  const toggleFavorite = (podcast: Podcast) => {
    const isFavorite = favorites.some((fav) => fav.id === podcast.id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== podcast.id)
      : [...favorites, podcast];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (podcast: Podcast) => favorites.some((fav) => fav.id === podcast.id);

  return (
    <div className="p-6 sm:p-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Ontdek <span className='text-green-500'>Podcasts</span></h1>

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

          <div className="my-12">
            <h2 className="text-2xl font-semibold mt-6">Favoriete Podcasts</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
              {favorites.map((show) => (
                <div key={show.id} className="rounded-lg hover:shadow-lg transition-transform hover:scale-102 overflow-hidden bg-[#1A1A1A] border border-[#2A2A2A] hover:cursor-pointer">
                  <Image
                    src={show.images[0]?.url || '/placeholder-image.jpg'}
                    alt={show.name}
                    width={500}
                    height={500}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between h-32">
                    <h2 className="text-lg font-semibold">{show.name}</h2>
                    <p className="text-sm sm:text-base mt-2 text-gray-300 line-clamp-3">
                      {show.description.length > 100
                        ? `${show.description.substring(0, 100)}...`
                        : show.description}
                    </p>
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

          <h2 className="text-2xl font-semibold mt-6">Podcasts</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {visiblePodcasts.map((show: Podcast) => (
              <div
                key={show.id}
                className="rounded-lg flex flex-col hover:shadow-lg transition-transform hover:scale-102 overflow-hidden bg-[#1A1A1A] border border-[#2A2A2A]"
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
                    height={300}
                    className="w-full h-40 sm:h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-lg sm:text-xl font-semibold truncate">{show.name}</h3>
                    <p className="text-sm sm:text-base mt-2 text-gray-300 line-clamp-3">
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
                      <AiOutlineHeart className="text-gray-300 text-2xl hover:text-green-500 hover:scale-110 transition-transform" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!showAll && filteredResults.length > visibleCount && (
            <div className="flex mt-6">
                <Button 
                  onClick={() => setShowAll(true)}
                  variant="outline"
                  className="text-black px-6 py-6 text-base"
                >
                  Bekijk alle podcasts
                </Button>
            </div>
          )}

          {/* Infinite Scroll Trigger */}
          {!showAll && <div ref={observerRef} className="h-10"></div>}
        </>
      )}
    </div>
  );
}
