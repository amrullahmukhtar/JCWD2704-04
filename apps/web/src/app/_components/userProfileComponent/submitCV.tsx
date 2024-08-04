'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import csrMainApi from '@/app/_lib/axios/csrMainApi';
import { useAppDispatch, useAppSelector } from '@/app/_lib/redux/hooks';
import { IUser } from '@/app/_model/user.model';
import Loading1 from '../loadingComponent/loading1';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { userDataAction } from '@/app/_lib/redux/slices/userData.slice';

const SubmitCV: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userData: IUser | null = useAppSelector((state) => state.userData);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      setIsEditing(true);

      return () => URL.revokeObjectURL(selectedFile.name);
    }
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      Swal.fire({
        title: 'Attention',
        text: 'Please select a PDF file for your CV.',
        icon: 'info',
      });
      return;
    }

    if (file.type !== 'application/pdf') {
      Swal.fire({
        title: 'Error',
        text: 'Only PDF files are allowed.',
        icon: 'error',
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('cv', file);

    try {
      const response = await csrMainApi().post(`/userdata/submitCv/${userData?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        title: 'Success',
        text: 'CV successfully uploaded.',
        icon: 'success',
      });
      setIsEditing(false);
      router.refresh();
      dispatch(userDataAction.loginUser(response.data.data));
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        text: 'CV upload failed.',
        icon: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setIsEditing(false);
  };

  const handleDownload = () => {
    if (userData?.cvUrl) {
      const link = document.createElement('a');
      link.href = `${process.env.NEXT_PUBLIC_BASE_API_URL}${userData.cvUrl}`;
      link.download = `${userData.fullname}_cv.pdf`;
      link.click();
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No CV available for download.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="p-6 w-full bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-4">Submit CV</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded file:border-none file:cursor-pointer"
        />
        {isEditing && (
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
      {isLoading && <Loading1 />}
      {userData?.cvUrl && (
        <button
          type="button"
          onClick={handleDownload}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View CV
        </button>
      )}
    </div>
  );
};

export default SubmitCV;
