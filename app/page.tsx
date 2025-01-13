"use client";

import { Podcast } from '@/types/Podcast';
import { useState, useEffect, useRef } from 'react';
import Filter from '@/components/Filter';
import { ClipLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from "@/components/ui/sidebar"
import Podcasts from '@/components/Podcasts';
import FavorietePodcasts from '@/components/FavorietePodcasts';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/mode-toggle';

export default function Home() {
  const [searchResults, setSearchResults] = useState<Podcast[]>([]);
  const [filteredResults, setFilteredResults] = useState<Podcast[]>([]);
  const [favorites, setFavorites] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [showAll, setShowAll] = useState(false);

  const filters = {
    frequentie: ['Dagelijks', 'Wekelijks'],
    doelgroepen: ['Jongeren', 'Gezinnen', 'Kinderen'],
    taal: ['Nederlands', 'Engels'],
    duur: ['Kort', 'Gemiddeld', 'Lang'],
  };

  const [selectedFilters, setSelectedFilters] = useState({
    frequentie: '',
    doelgroepen: '',
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
        !selectedFilters.doelgroepen || podcast.description.toLowerCase().includes(selectedFilters.doelgroepen.toLowerCase());
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Ontdek <span className="text-green-600 dark:text-green-500">Podcasts</span>
        </h1>
        <div className="mb-2 space-y-2">
          <ModeToggle />
          <SidebarTrigger className="lg:hidden" />
        </div>
      </div>

      {/* Filter Component */}
      <Filter
        filters={filters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      {loading ? (
        <div className="flex flex-col justify-center items-center h-64">
          <ClipLoader size={50} color="#22C55D" />
          <p className="text-white text-md mt-4">Podcasts worden geladen...</p>
        </div>      
      ) : (
        <>
          <div className="my-12">
            {favorites.length > 0 && (
              <><Separator /><FavorietePodcasts favorites={favorites} toggleFavorite={toggleFavorite} /></>
            )}
          </div>

          <Separator />

          <Podcasts
            podcasts={visiblePodcasts}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />

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

          {!showAll && <div ref={observerRef} className="h-10"></div>}
        </>
      )}
    </div>
  );
}