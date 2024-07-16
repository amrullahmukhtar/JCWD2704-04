"use client"

import csrMainApi from "@/app/_lib/axios/csrMainApi";
import { calculateDistance } from "@/app/_utils/calculateDistance";
import React, { useState, useEffect } from "react";
import JobList from "./jobList";
import Geolocation from "./geoLocation";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  latitude: number;
  longitude: number;
  distance?: number;
};

const DiscoverySection: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const getUserLocation = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setUserLocation({ latitude, longitude });

  

            // Fetch jobs from localhost:8000/job/
            try {
              const response = await csrMainApi().get('/job/');
              if (response.status === 200) {
                const fetchedJobs: Job[] = response.data.data;
                const updatedJobs = updateNearbyJobs(latitude, longitude, fetchedJobs);
                setJobs(updatedJobs);
              } else {
                console.error('Failed to fetch jobs:', response.statusText);
              }
            } catch (error) {
              console.error('Error fetching jobs:', error);
            }
          },
          (error) => {
            console.error("Error getting user location:", error);
            setUserLocation(null);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setUserLocation(null);
      }
    };

    getUserLocation();
  }, []);

  const updateNearbyJobs = (latitude: number, longitude: number, fetchedJobs: Job[]): Job[] => {
    const updatedJobs = fetchedJobs.map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      latitude: (job.latitude),
      longitude: (job.longitude),
      distance: calculateDistance(latitude, longitude, (job.latitude), (job.longitude)),
    }));

    updatedJobs.sort((a, b) => (a.distance || 0) - (b.distance || 0));

    return updatedJobs;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {userLocation && (
        <div>
          <p className="text-lg font-semibold mb-4 hidden">
            Your current location: ({userLocation.latitude}, {userLocation.longitude})
          </p>
          <h2 className="text-2xl font-semibold mb-4">Nearest jobs from your location:</h2>
          <JobList jobs={jobs} />
        </div>
      )}
      {!userLocation && (
        <p className="text-lg font-semibold">Fetching your location...</p>
      )}
      <Geolocation setUserLocation={setUserLocation} />
    </div>
  );
};

export default DiscoverySection;
