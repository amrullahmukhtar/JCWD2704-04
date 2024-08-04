'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import csrMainApi from '@/app/_lib/axios/csrMainApi';
import { useAppSelector } from '@/app/_lib/redux/hooks';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Loading1 from '../loadingComponent/loading1';
import { IUser } from '@/app/_model/user.model';
import SubmitCV from '../userProfileComponent/submitCV';
import { IJob } from '@/app/_model/job.model'; 

interface ApplyJobProps {
  jobId: number;
  job: IJob; 
}

const ApplyJob: React.FC<ApplyJobProps> = ({ jobId, job }) => {
  const [salaryExpectation, setSalaryExpectation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userData: IUser | null = useAppSelector((state) => state.userData);
  const router = useRouter();

  const formatNumber = (num: number): string => {
    return num.toLocaleString('id-ID'); // Format dengan pemisah ribuan titik
  };

  const handleSalaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\./g, ''); // Hapus titik dari nilai yang dimasukkan
    const numberValue = Number(value);
    if (!isNaN(numberValue)) {
      setSalaryExpectation(formatNumber(numberValue));
    } else {
      setSalaryExpectation('');
    }
  };

  const handleApply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rawSalary = salaryExpectation.replace(/\./g, '');
    const numberSalary = Number(rawSalary);

    if (!userData?.cvUrl || isNaN(numberSalary)) {
      Swal.fire({
        title: 'Error',
        text: 'Please upload your CV and enter your salary expectations.',
        icon: 'error',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await csrMainApi().post(`/job/apply/${jobId}`, {
        userId: userData.id,
        salaryExpectation: numberSalary,
      });

      Swal.fire({
        title: 'Success',
        text: 'Job application submitted successfully.',
        icon: 'success',
      });
      router.push('/user/lowongan'); // Redirect to job applications page or any other page
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to submit job application.',
        icon: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 w-full bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-4">Apply for {job.title}</h2>
   
      <SubmitCV />
      <form onSubmit={handleApply} className="space-y-4">
        
        <div className="space-y-2">
          <label htmlFor="salaryExpectation" className="block text-sm font-medium text-gray-700">
            Salary Expectation
          </label>
          <input
            type="text" 
            id="salaryExpectation"
            value={salaryExpectation}
            onChange={handleSalaryChange}
            className="block w-full px-4 py-2 text-sm border rounded-md text-right"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Application'}
        </button>
        {isLoading && <Loading1 />}
      </form>
    </div>
  );
};

export default ApplyJob;
