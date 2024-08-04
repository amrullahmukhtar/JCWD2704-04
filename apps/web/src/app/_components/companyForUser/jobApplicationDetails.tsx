'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Perhatikan di sini
import csrMainApi from '@/app/_lib/axios/csrMainApi';
import Swal from 'sweetalert2';
import Loading1 from '../loadingComponent/loading1';
import { IJobRegis } from '@/app/_model/job.model';
import { useAppSelector } from '@/app/_lib/redux/hooks';

const JobApplicationDetails: React.FC = () => {
  const [application, setApplication] = useState<IJobRegis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userData = useAppSelector((state) => state.userData);
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract applicationId from pathname
  const applicationId = pathname.split('/').pop();

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      setIsLoading(true);
      try {
        const response = await csrMainApi().get(`/job/application/${userData?.id}/${applicationId}`);
        setApplication(response.data.data);
      } catch (error: any) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to fetch application details.',
          icon: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (applicationId) {
      fetchApplicationDetails();
    }
  }, [applicationId, userData?.id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Application Details</h2>
      {isLoading ? (
        <Loading1 />
      ) : application ? (
        <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-700">{application.job.title}</h3>
        <p className="text-gray-600">Status: <span className="font-medium">{application.status}</span></p>
        <p className="text-gray-600">Application Date: <span className="font-medium">{new Date(application.application_date).toLocaleDateString()}</span></p>
        {application.status === 'accepted' && application.interview_date && (
          <p className="text-gray-600">Interview Date: <span className="font-medium">{new Date(application.interview_date).toLocaleDateString()}</span></p>
        )}
        {application.status === 'rejected' && application.review && (
          <p className="text-gray-600">Review: <span className="font-medium">{application.review}</span></p>
        )}
        <button
          onClick={() => router.push('/user/jobApplication')}
          className="mt-4 px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          Back to Applications
        </button>
      </div>
    ) : (
      <p className="text-gray-600">loading...</p>
    )}
      </div>
    </div>
  );
};

export default JobApplicationDetails;
