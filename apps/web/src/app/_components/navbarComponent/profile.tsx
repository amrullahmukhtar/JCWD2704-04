'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/app/_lib/redux/hooks';
import { IUser } from '@/app/_model/user.model'; // Pastikan import IUser

const ProfileDropdown = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.userData) as IUser | null;

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

    if (userData) {
    }

  const fullname = userData ? userData.fullname : '';
  const email = userData ? userData.email : '';

  return (
    <>
      <div className="w-full flex justify-between items-center text-black h-full">
        <div className="relative">
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center gap-2"
          >
            <Image
              src="/vercel.svg"
              alt="profile"
              width={30}
              height={30}
              className="rounded-full"
            />
          </button>
          {profileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2">
              <div className="flex items-center gap-2 p-2 border-b">
                <Image
                  src="/path-to-profile-image.jpg"
                  alt="profile"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div>
                  <div className="font-bold">{fullname}</div>
                  <div className="text-sm text-gray-600">{email}</div>
                </div>
              </div>
              {/* Pastikan userData tidak null dan memiliki properti id sebelum membuat Link */}
              {userData && userData.id && (
                <Link
                  href="/profile"
                  className="block p-2 hover:bg-gray-100 rounded-md"
                >
                  Profile
                </Link>
              )}
              <Link
                href="/manage-account"
                className="block p-2 hover:bg-gray-100 rounded-md"
              >
                Manage account
              </Link>
              <Link
                href="/settings"
                className="block p-2 hover:bg-gray-100 rounded-md"
              >
                Personal settings
              </Link>
              <Link
                href="/notifications"
                className="block p-2 hover:bg-gray-100 rounded-md"
              >
                Notifications
              </Link>
              <Link
                href="/theme"
                className="block p-2 hover:bg-gray-100 rounded-md"
              >
                Theme
              </Link>
              <button className="block p-2 hover:bg-gray-100 rounded-md w-full text-left">
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;
