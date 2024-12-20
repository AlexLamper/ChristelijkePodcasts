"use client";

import { Podcast } from '@/types/Podcast';
import { useState, useEffect, useRef } from 'react';
import Filter from '@/components/Filter';
import { ClipLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from "@/components/ui/sidebar"
import Podcasts from '@/components/Podcasts';
import FavorietePodcasts from '@/components/FavorietePodcasts';

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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Ontdek <span className="text-green-500">Podcasts</span>
        </h1>
        <SidebarTrigger className="lg:hidden mb-2" />
      </div>

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
            <FavorietePodcasts favorites={favorites} toggleFavorite={toggleFavorite} />
          </div>

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
