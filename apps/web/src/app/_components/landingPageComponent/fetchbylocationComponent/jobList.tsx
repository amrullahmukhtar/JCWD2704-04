import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  distance?: number;
};

type JobListProps = {
  jobs: Job[];
};

const JobList: React.FC<JobListProps> = ({ jobs }) => (
  <ul>
    {jobs.map((job) => (
      <li key={job.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600">
              {job.company} - {job.location}
            </p>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500 mr-1" />
            {job.distance !== undefined && (
              <p>Distance: {job.distance.toFixed(1)} km</p>
            )}
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export default JobList;
