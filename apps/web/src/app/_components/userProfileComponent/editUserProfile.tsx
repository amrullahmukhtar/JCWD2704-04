"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/_lib/redux/hooks';
import BackEndFormProfile from '../formComponent/backEndFormProfile';
import { IUser } from '@/app/_model/user.model';
import { useRouter } from 'next/navigation';
import { userDataAction } from '@/app/_lib/redux/slices/userData.slice';

const UserProfileForm: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState<IUser | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const userData: IUser | null = useAppSelector((state) => state.userData);
  const router = useRouter();
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (userData) {
      setInput(userData);
    }
  }, [userData]);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (input) {
      const { id, value, files } = e.target;
      const updatedInput = files ? { ...input, [id]: files[0] } : { ...input, [id]: value };
      setInput(updatedInput);
    }
  };



  return (
    <div className="flex justify-center items-center w-full flex-col">
      <BackEndFormProfile
        action={`/userdata/${userData?.id}`}
        method="patch"
        onSuccess={(go) => {
          setIsEditing(false);
          dispatch(userDataAction.loginUser(go.data.data))

          router.refresh();
        }}
        data={input}
        className="items-center w-full"
      >
        <div className="w-full items-center bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-4 w-full">
            <img
              src={input?.avatar ? URL.createObjectURL(new Blob([input.avatar])) : '/profileDefault.svg'}
              alt="Profile Picture"
              className="w-16 h-16 rounded-full mr-4"
              style={{ cursor: isEditing ? 'pointer' : 'default' }}
              onClick={() => {
                if (isEditing) {
                  document.getElementById('avatar')?.click();
                }
              }}
            />
            <input
              type="file"
              id="avatar"
              onChange={inputHandler}
              className="ml-2"
              style={{ display: isEditing ? 'block' : 'none' }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="fullname"
              value={input?.fullname || ''}
              onChange={inputHandler}
              required
              className={`w-full border rounded p-2 focus:outline-none ${isEditing ? 'focus:border-blue-500' : 'bg-gray-200'}`}
              readOnly={!isEditing}
            />
          </div>
          {/* Repeat similar structure for other fields */}
          <div className="flex items-center justify-between">
            {isEditing && (
              <input
                type="submit"
                value="Save"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                onClick={() => setIsSaving(true)}
              />
            )}
            <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
              Export to PDF
            </button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
              View My Profile
            </button>
          </div>
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

export default UserProfileForm;
