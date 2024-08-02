// components/FilterLowongan.tsx
'use client';

import React from 'react';
import csrMainApi from '@/app/_lib/axios/csrMainApi';
import { subDays, subMonths } from 'date-fns';
import DiscoverySection from '../landingPageComponent/fetchbylocationComponent/discoverysection';
import SearchResults from './searchResults';
import FilterForm from './filterform';


const FilterLowongan: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [location, setLocation] = React.useState('');
  const [dateFilter, setDateFilter] = React.useState<string>('all');
  const [sortOrder, setSortOrder] = React.useState<string>('newest');
  const [showResults, setShowResults] = React.useState(false);
  const [hideLowonganSection, setHideLowonganSection] = React.useState(false);

  const [startDate, setStartDate] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleSearch = async () => {
    try {
      let url = '/job/?search=' + searchTerm;
      if (location) {
        url += `&location=${location}`;
      }

      const response = await csrMainApi().get(url);
      let filteredJobs = response.data.data;

      filteredJobs = filteredJobs.filter((job: any) =>
        job.hire_position.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      if (location) {
        filteredJobs = filteredJobs.filter((job: any) =>
          job.location.toLowerCase().includes(location.toLowerCase()),
        );
      }

      const today = new Date();
      const dateThreshold = {
        '7days': subDays(today, 7),
        '1month': subMonths(today, 1),
      };

      if (dateFilter === '7days') {
        filteredJobs = filteredJobs.filter(
          (job: any) => new Date(job.posted_date) >= dateThreshold['7days'],
        );
      } else if (dateFilter === '1month') {
        filteredJobs = filteredJobs.filter(
          (job: any) => new Date(job.posted_date) >= dateThreshold['1month'],
        );
      }

      if (startDate) {
        filteredJobs = filteredJobs.filter(
          (job: any) => new Date(job.posted_date) >= new Date(startDate),
        );
      }

      if (endDate) {
        filteredJobs = filteredJobs.filter(
          (job: any) => new Date(job.posted_date) <= new Date(endDate),
        );
      }

      filteredJobs.sort((a: any, b: any) => {
        const dateA = new Date(a.posted_date);
        const dateB = new Date(b.posted_date);
        return sortOrder === 'newest'
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime();
      });

      setSearchResults(filteredJobs);
      setShowResults(true);
      setHideLowonganSection(true);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (
    <section className="py-10 bg-gray-200">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Filter Pekerjaan</h2>
        <FilterForm
          searchTerm={searchTerm}
          location={location}
          dateFilter={dateFilter}
          startDate={startDate}
          endDate={endDate}
          sortOrder={sortOrder}
          handleChange={handleChange}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          handleSearch={handleSearch}
          handleLocationChange={(e) => setLocation(e.target.value)}
          handleDateFilterChange={(e) => setDateFilter(e.target.value)}
          handleSortOrderChange={(e) => setSortOrder(e.target.value)}
        />
        <SearchResults searchResults={searchResults} showResults={showResults} />
        {!hideLowonganSection && <DiscoverySection />}
      </div>
    </section>
  );
};

export default FilterLowongan;
