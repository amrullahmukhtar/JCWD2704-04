'use client';

import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import csrMainApi from '@/app/_lib/axios/csrMainApi';
import { useAppDispatch, useAppSelector } from '@/app/_lib/redux/hooks';
import { IUser } from '@/app/_model/user.model';
import Loading1 from '../loadingComponent/loading1';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { userDataAction } from '@/app/_lib/redux/slices/userData.slice';


const UploadAvatar: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // New state for loading
  const userData: IUser | null = useAppSelector((state) => state.userData);
  const router = useRouter();
  const dispatch = useAppDispatch();


  // Derive avatarUrl from userData directly for display
  const avatarUrl = userData?.avatarUrl ? `http://localhost:8000${userData.avatarUrl}` : null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create object URL for the selected file
      const objectUrl = URL.createObjectURL(selectedFile);
      setIsEditing(true);

      // Clean up object URL after component unmount
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      Swal.fire({
        title: 'Attention',
        text: 'Please select an image for your avatar.',
        icon: 'info',
      });
      return;
    }

    setIsLoading(true); // Start loading

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await csrMainApi().post(`/userdata/uploadAvatar/${userData?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
            Swal.fire({
        title: 'Success',
        text: 'Avatar successfully changed.',
        icon: 'success',
      });
      setIsEditing(false); // End editing mode on successful upload
      router.refresh
      dispatch(userDataAction.loginUser(response.data.data));
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        text: 'Avatar failed to change.',
        icon: 'error',
      });    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleCancel = () => {
    setFile(null);
    setIsEditing(false); // End editing mode on cancel
  };

  return (
    <div className="p-6 w-full bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload Avatar</h2>
      <div className="mb-4">
        {file ? (
          <img
            src={URL.createObjectURL(file)} // Using object URL for preview
            alt="User Avatar"
            className="w-32 h-32 object-cover rounded-full border border-gray-300"
          />
        ) : (
          <img
            src={avatarUrl || '/default-avatar.png'} // Fallback to a default image
            alt="User Avatar"
            className="w-32 h-32 object-cover rounded-full border border-gray-300"
          />
        )}
      </div>
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
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Batal
            </button>
          </div>
        )}
      </form>
      {isLoading && <Loading1 />} {/* Display loading component */}
    </div>
  );
};

export default UploadAvatar;
