'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/_lib/redux/hooks';
import BackEndFormProfile from '../formComponent/backEndFormProfile';
import { userDataAction } from '@/app/_lib/redux/slices/userData.slice';
import { IUser } from '@/app/_model/user.model';

const UserProfileForm: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // New state for saving process

  const [input, setInput] = useState<IUser | null>(null);
  const dispatch = useAppDispatch();
  const userData: IUser | null = useAppSelector((state) => state.userData);

  useEffect(() => {
    if (userData) {
      setInput(userData);
    }
  }, [userData]);

  function inputHandler(e: ChangeEvent<HTMLInputElement>) {
    if (input) {
      const { id, value, files } = e.target;
      if (files) {
        setInput({ ...input, [id]: files[0] });
      } else {
        setInput({ ...input, [id]: value });
      }
    }
  }

  function handleSave() {
    if (input) {
           console.log('Save button clicked');
      console.log('Input data:', input);
      dispatch(userDataAction.updateUser(input));
      setIsEditing(false);
    }
  }

  return (
    <div className="flex justify-center items-center w-full">
      <BackEndFormProfile
        action={`/userdata/${userData?.id}`}
        method="patch"
        onSuccess={(response) => {
          console.log('Response from backend:', response.data);
          dispatch(userDataAction.updateUser(response.data));
        }}
        data={input}
        className="items-center w-full"
      >
        <div className="flex justify-center items-center w-full">
          <div className="w-full items-center bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-4 w-full">
              <img
                src={
                  input?.avatar
                    ? URL.createObjectURL(new Blob([input.avatar]))
                    : '/profileDefault.svg'
                }
                alt="Profile Picture"
                className="w-16 h-16 rounded-full mr-4"
              />
              <input
                type="file"
                id="avatar"
                onChange={inputHandler}
                className="ml-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
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
              {isEditing ? (
                <input
                  value={'Save'}
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                  onClick={handleSave}
                />
              ) : (
                <input
                  value={'Edit'}
                  type="button"
                  className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-200"
                  onClick={() => setIsEditing(true)}
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
        </div>
      </BackEndFormProfile>
    </div>
  );
};

export default UserProfileForm;
