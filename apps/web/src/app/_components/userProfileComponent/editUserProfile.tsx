'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/_lib/redux/hooks';
import BackEndFormProfile from '../formComponent/backEndFormProfile';
import { IUser } from '@/app/_model/user.model';
import { useRouter } from 'next/navigation';
import { userDataAction } from '@/app/_lib/redux/slices/userData.slice';
import InputProfile from './inputProfile';

const UserProfileForm: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState<IUser | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const userData: IUser | null = useAppSelector((state) => state.userData);
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
      if (id === 'date_of_birth') {
        updatedInput[id] = new Date(value);
      }
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
          dispatch(userDataAction.loginUser(go.data.data));
          router.refresh();
        }}
        data={input}
        className="items-center w-full"
      >
        <InputProfile
          input={input}
          isEditing={isEditing}
          inputHandler={inputHandler}
          requiredFields={['age', 'education', 'position']}
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

export default UserProfileForm;
