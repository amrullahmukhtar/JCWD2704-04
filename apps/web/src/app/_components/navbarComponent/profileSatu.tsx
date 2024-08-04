'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/_lib/redux/hooks';
import { userDataAction } from '@/app/_lib/redux/slices/userData.slice';
import { adminDataAction } from '@/app/_lib/redux/slices/adminData.slice';
import { devDataAction } from '@/app/_lib/redux/slices/devData.slice';
import { IUser } from '@/app/_model/user.model';

const ProfileDropdownSatu = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const userData = useAppSelector((state) => state.userData) as IUser | null;
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const toggleProfileDropdown = () => {
    setProfileDropdown((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setProfileDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      dispatch(userDataAction.logout(null));
      dispatch(adminDataAction.logout(null));
      dispatch(devDataAction.logout(null));
      setProfileDropdown(false);
      router.push('/');
    }
  };

  const fullname = userData?.fullname || '';
  const avatarUrl = userData?.avatarUrl
    ? `http://localhost:8000${userData.avatarUrl}`
    : '/default-avatar.jpg';

  return (
    <div className="relative">
      <button
        onClick={toggleProfileDropdown}
        className="flex items-center gap-2"
      >
        <Image
          src={avatarUrl}
          alt="Profile"
          width={30}
          height={30}
          className="rounded-full"
        />
      </button>
      {profileDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2"
        >
          <div className="flex flex-col items-center  p-2 border-b">
            <div className="font-bold">{fullname}</div>
          </div>

          <Link
            href="/user/profile"
            className="block p-2 hover:bg-gray-100 rounded-md"
          >
            Profile
          </Link>
          <Link
            href="/user/manage-account"
            className="block p-2 hover:bg-gray-100 rounded-md"
          >
            Manage account
          </Link>
          <Link
            href="/user/jobApplication"
            className="block p-2 hover:bg-gray-100 rounded-md"
          >
            Submitted Jobs
          </Link>
          <button
            onClick={handleLogout}
            className="block p-2 hover:bg-gray-100 rounded-md w-full text-left"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdownSatu;
