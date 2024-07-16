"use client"

import React, { useState } from 'react';

interface SearchFormProps {
  onSubmit: (location: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(location);
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Cari berdasarkan lokasi"
        className="w-full border-gray-300 border-b-2 mb-4 py-2 px-3 focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
        Cari Pekerjaan
      </button>
    </form>
  );
};

export default SearchForm;
