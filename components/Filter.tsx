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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 p-4 bg-[#1A1A1A] rounded-lg shadow-md lg:max-w-[60%]">
      {/* Generate dropdowns dynamically */}
      {Object.entries(filters).map(([key, options]) => (
        <div key={key} className="flex flex-col">
          <label
            htmlFor={key}
            className="text-sm font-medium text-gray-300 mb-1 capitalize tracking-wide"
          >
            {key}
          </label>
          <select
            id={key}
            value={selectedFilters[key as keyof typeof selectedFilters]}
            onChange={(e) => handleFilterChange(key, e.target.value)}
            className="bg-[#121212] text-gray-100 border border-[#2C2C2C] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1DB954] transition-all"
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
