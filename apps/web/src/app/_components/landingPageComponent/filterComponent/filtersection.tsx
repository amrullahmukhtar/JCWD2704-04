"use client"

import React from "react";
import csrMainApi from "@/app/_lib/axios/csrMainApi";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { format } from 'date-fns';

const FilterSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [showResults, setShowResults] = React.useState(false);
  const [location, setLocation] = React.useState("");

  const search = useSearchParams()

  // Handler untuk mengatur perubahan input pencarian
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowResults(false); // Sembunyikan hasil pencarian saat input berubah
  };

  // Handler untuk tombol "Cari"
  const handleSearch = async () => {
    try {
      let url = `/job/?search=${searchTerm}`;
      if (location) {
        url += `&location=${location}`;
      }
      const response = await csrMainApi().get(url);
      
      // Filter job berdasarkan hire_position yang mengandung kata "developer"
      const filteredJobs = response.data.data.filter((job: any) =>
        job.hire_position.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Filter lagi berdasarkan lokasi jika location tidak kosong
      if (location) {
        const filteredByLocation = filteredJobs.filter((job: any) =>
          job.location.toLowerCase().includes(location.toLowerCase())
        );
        setSearchResults(filteredByLocation);
      } else {
        setSearchResults(filteredJobs);
      }
      
      setShowResults(true); // Tampilkan hasil pencarian setelah tombol "Cari" ditekan
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <section className="py-10 bg-gray-200">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Filter Pekerjaan</h2>
        {/* Form pencarian pekerjaan */}
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Cari berdasarkan judul pekerjaan"
            className="p-2 border border-gray-300 rounded-md focus:outline-none"
            value={searchTerm}
            onChange={handleChange} // Handle input change
          />

          <input
            type="text"
            placeholder="Lokasi"
            className="p-2 border border-gray-300 rounded-md focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)} // Handle input change for location
          />
          <button
            type="button" // Gunakan type "button" agar form tidak submit secara default
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleSearch} // Handle ketika tombol "Cari" ditekan
          >
            Cari
          </button>
        </form>

        {/* Menampilkan hasil pencarian jika `showResults` true */}
        {showResults && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-2">Hasil Pencarian</h3>
            <ul className="divide-y divide-gray-200">
              {searchResults.length > 0 ? (
                searchResults.map((job) => (
                  <li
                  key={job.id}
                  className="bg-white rounded-lg shadow-md p-4 mb-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-gray-600">
                        {job.company_name} - {job.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        Posted:{' '}
                        {format(new Date(job.posted_date), 'dd MMM yyyy')}
                      </p>
                      <Link
                        href={`/user/lowongan/${job.id}`}
                        className="block text-blue-500 text-sm mt-2"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </li>
                ))
              ) : (
                <p className="text-lg text-gray-600 mt-4">Tidak ada hasil yang ditemukan</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterSection;
