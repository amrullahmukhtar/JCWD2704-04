'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/_lib/redux/hooks';
import { userDataAction } from '@/app/_lib/redux/slices/userData.slice';
import { adminDataAction } from '@/app/_lib/redux/slices/adminData.slice';
import { IAdmin } from '@/app/_model/user.model';

const ProfileDropdownAdmins = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const userData = useAppSelector((state) => state.adminData) as IAdmin | null;
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
      setProfileDropdown(false);
      router.push('/');
    }
  };

  const company_name = userData?.company_name || '';
  const avatarUrl = userData?.avatarUrl
    ? `${process.env.NEXT_PUBLIC_BASE_API_URL}${userData.avatarUrl}`
    : '/profileDefault.svg';

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
            <div className="font-bold">{company_name}</div>
          </div>

          <button
            onClick={handleLogout}
            className="block p-2 hover:bg-gray-100 rounded-md w-full text-left font-semibold text-black"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdownAdmins;
