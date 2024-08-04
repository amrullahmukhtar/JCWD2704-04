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
    <div className="flex justify-center items-center w-full flex-col">
      <BackEndFormProfile
        action={`/admin/${userData?.id}`}
        method="patch"
        onSuccess={(go) => {
          setIsEditing(false);
          dispatch(adminDataAction.loginAdmin(go.data.data));
          router.refresh();
        }}
        data={input}
        className="items-center w-full"
      >
        <InputAdminProfile
          input={input}
          isEditing={isEditing}
          inputHandler={inputHandler}
        />

        <div className="flex items-center justify-between">
          {isEditing && (
            <input
              type="submit"
              value="Save"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
              onClick={() => setIsSaving(true)}
            />
          )}
        </div>
      </BackEndFormProfile>
      <input
        type="button"
        value="Edit"
        className="w-[150px] bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-200"
        onClick={() => setIsEditing(true)}
      />
    </div>
  );
};

export default AdminProfileForm;
