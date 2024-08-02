// components/SearchResults.tsx
import React from 'react';
import { format } from 'date-fns';
import Link from 'next/link';

interface Job {
  id: number;
  title: string;
  company_name: string;
  location: string;
  posted_date: string;
}

interface SearchResultsProps {
  searchResults: Job[];
  showResults: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, showResults }) => {
  return (
    <>
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
              <p className="text-lg text-gray-600 mt-4">
                Tidak ada hasil yang ditemukan
              </p>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchResults;
