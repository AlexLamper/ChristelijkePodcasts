"use client";

import { Dispatch, SetStateAction } from 'react';

interface FilterProps {
  filters: {
    frequentie: string[];
    doelgroep: string[];
    taal: string[];
    duur: string[];
  };
  selectedFilters: {
    frequentie: string;
    doelgroep: string;
    taal: string;
    duur: string;
  };
  setSelectedFilters: Dispatch<
    SetStateAction<{
      frequentie: string;
      doelgroep: string;
      taal: string;
      duur: string;
    }>
  >;
}

export default function Filter({
  filters,
  selectedFilters,
  setSelectedFilters,
}: FilterProps) {
  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [category]: value,
    }));
  };

  return (
    <div className="flex flex-wrap gap-6 mb-6">
      {/* Generate dropdowns dynamically */}
      {Object.entries(filters).map(([key, options]) => (
        <div key={key} className="flex flex-col">
          <label htmlFor={key} className="text-sm font-medium mb-2 capitalize">
            {key}
          </label>
          <select
            id={key}
            value={selectedFilters[key as keyof typeof selectedFilters]}
            onChange={(e) => handleFilterChange(key, e.target.value)}
            className="bg-[#121212] text-white border border-[#3E3E3E] rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1DB954] transition"
          >
            <option value="">Alle {key}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
