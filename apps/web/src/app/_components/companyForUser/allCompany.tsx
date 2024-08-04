"use client"
import React, { useState, useEffect } from 'react';
import csrMainApi from '@/app/_lib/axios/csrMainApi';

const AllCompany: React.FC = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await csrMainApi().get('/admin/companyAll');
      setCompanies(response.data.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleSearch = () => {
    const filteredCompanies = companies
      .filter(company =>
        company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(company =>
        company.company_location.toLowerCase().includes(location.toLowerCase())
      )
      .sort((a, b) =>
        sortOrder === 'asc'
          ? a.company_name.localeCompare(b.company_name)
          : b.company_name.localeCompare(a.company_name)
      );

    setCompanies(filteredCompanies);
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">All Companies</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="p-2 border border-gray-300 rounded-md focus:outline-none mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="p-2 border border-gray-300 rounded-md focus:outline-none mr-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded-md focus:outline-none"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Sort by Name: A-Z</option>
          <option value="desc">Sort by Name: Z-A</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {companies.map(company => (
          <li key={company.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-xl font-bold">{company.company_name}</h3>
            <p>{company.company_location}</p>
            <a href={`/user/perusahaan/detailCompany/${company.id}`} className="text-blue-500">View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCompany;
