'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/_lib/redux/hooks';
import BackEndFormProfile from '../formComponent/backEndFormAdminProfile';
import { useRouter } from 'next/navigation';
import { IAdmin } from '@/app/_model/user.model';
import InputAdminProfile from './inputAdminProfile';
import { adminDataAction } from '@/app/_lib/redux/slices/adminData.slice';

const AdminProfileForm: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState<IAdmin | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const userData: IAdmin | null = useAppSelector((state) => state.adminData);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userData) {
      setInput(userData);
    }
  }, [userData]);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (input) {
      const { id, value, files } = e.target;
      const updatedInput = files
        ? { ...input, [id]: files[0] }
        : { ...input, [id]: value };

      setInput(updatedInput);
    }
  };

  return (
<div className="flex flex-col items-center w-full p-4 bg-white shadow-lg">
  <BackEndFormProfile
    action={`/admin/${userData?.id}`}
    method="patch"
    onSuccess={(go) => {
      setIsEditing(false);
      dispatch(adminDataAction.loginAdmin(go.data.data));
      router.refresh();
    }}
    data={input}
    className="w-full  bg-white p-6 rounded-lg shadow-md"
  >
    <InputAdminProfile
      input={input}
      isEditing={isEditing}
      inputHandler={inputHandler}
    />

    <div className="flex items-center justify-between mt-4">
      {isEditing && (
        <input
          type="submit"
          value="Save"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsSaving(true)}
        />
      )}
    </div>
  </BackEndFormProfile>

  <input
    type="button"
    value="Edit"
    className="mt-4 w-[150px] bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
    onClick={() => setIsEditing(true)}
  />
</div>

  );
};

export default AdminProfileForm;
