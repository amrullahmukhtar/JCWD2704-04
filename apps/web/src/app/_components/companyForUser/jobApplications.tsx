'use client';

import React, { useEffect, useState } from 'react';
import csrMainApi from '@/app/_lib/axios/csrMainApi';
import { useAppSelector } from '@/app/_lib/redux/hooks';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Loading1 from '../loadingComponent/loading1';
import { IJobRegis } from '@/app/_model/job.model';

const JobApplications: React.FC = () => {
  const [applications, setApplications] = useState<IJobRegis[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userData = useAppSelector((state) => state.userData);
  const router = useRouter();

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const response = await csrMainApi().get(
          `/job/applications/${userData?.id}`,
        );
        setApplications(response.data.data);
      } catch (error: any) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to fetch applications.',
          icon: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (userData?.id) {
      fetchApplications();
    }
  }, [userData?.id]);

  const handleViewDetails = (applicationId: number) => {
    router.push(`/user/jobApplication/detailJobApplication/${applicationId}`);
  };

  return (
    <div className="px-6 py-8 w-full bg-gray-100 min-h-screen shadow-md flex justify-center">
      <div className='max-w-[1500px] w-full bg-white p-5 rounded-xl'>
        <h2 className="text-2xl font-semibold mb-4 text-center">My Job Applications</h2>
        {isLoading ? (
          <Loading1 />
        ) : (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <p className="text-center">No job applications have been submitted yet.</p>
            ) : (
              applications.map((application) => (
                <div
                  key={application.job_id}
                  className="p-4 border rounded-md flex flex-wrap items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {application.job.title}
                    </h3>
                    <p>Status: {application.status}</p>
                  </div>
                  <button
                    onClick={() => handleViewDetails(application.job_id)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplications;
