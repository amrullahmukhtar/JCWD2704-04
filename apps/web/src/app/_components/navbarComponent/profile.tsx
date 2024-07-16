'use client';

import { useState } from 'react';
import Image from 'next/image'; // Pastikan import Image sesuai dengan framework yang digunakan, misalnya Next.js
import Link from 'next/link';

const ProfileDropdown = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown); // Mengubah nilai dropdown menjadi kebalikannya
  };

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
                  <div className="font-bold">Amrullah Mukhtar</div>
                  <div className="text-sm text-gray-600">
                    amrullahmukhtar@gmail.com
                  </div>
                </div>
              </div>
              <Link
                href="/manage-account"
                className="block p-2 hover:bg-gray-100 rounded-md"
              >
                Manage account
              </Link>
              <Link
                href="/profile"
                className="block p-2 hover:bg-gray-100 rounded-md"
              >
                Profile
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
