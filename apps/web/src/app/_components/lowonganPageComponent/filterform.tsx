// components/FilterForm.tsx
import React from 'react';

interface FilterFormProps {
  searchTerm: string;
  location: string;
  dateFilter: string;
  startDate: string;
  endDate: string;
  sortOrder: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  handleLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSortOrderChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  searchTerm,
  location,
  dateFilter,
  startDate,
  endDate,
  sortOrder,
  handleChange,
  handleStartDateChange,
  handleEndDateChange,
  handleSearch,
  handleLocationChange,
  handleDateFilterChange,
  handleSortOrderChange,
}) => {
  return (
    <form className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      <input
        type="text"
        placeholder="Cari berdasarkan judul pekerjaan"
        className="p-2 border border-gray-300 rounded-md focus:outline-none"
        value={searchTerm}
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="Lokasi"
        className="p-2 border border-gray-300 rounded-md focus:outline-none"
        value={location}
        onChange={handleLocationChange}
      />

      <select
        className="p-2 border border-gray-300 rounded-md focus:outline-none"
        value={dateFilter}
        onChange={handleDateFilterChange}
      >
        <option value="all">Semua Waktu</option>
        <option value="7days">7 Hari Terakhir</option>
        <option value="1month">1 Bulan Terakhir</option>
      </select>

      <select
        className="p-2 border border-gray-300 rounded-md focus:outline-none"
        value={sortOrder}
        onChange={handleSortOrderChange}
      >
        <option value="newest">Terbaru</option>
        <option value="oldest">Terlama</option>
      </select>

      <input
        type="date"
        placeholder="Tanggal Mulai"
        className="p-2 border border-gray-300 rounded-md focus:outline-none"
        value={startDate}
        onChange={handleStartDateChange}
      />
      <div className='p-2 border text-xl font-bold focus:outline-none text-center'> s/d</div>

      <input
        type="date"
        placeholder="Tanggal Akhir"
        className="p-2 border border-gray-300 rounded-md focus:outline-none"
        value={endDate}
        onChange={handleEndDateChange}
      />



      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={handleSearch}
      >
        Cari
      </button>
    </form>
  );
};

export default FilterForm;
