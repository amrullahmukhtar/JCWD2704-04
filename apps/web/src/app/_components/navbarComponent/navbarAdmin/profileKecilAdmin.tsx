'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/_lib/redux/hooks';
import { userDataAction } from '@/app/_lib/redux/slices/userData.slice';
import { adminDataAction } from '@/app/_lib/redux/slices/adminData.slice';
import { devDataAction } from '@/app/_lib/redux/slices/devData.slice';
import { IAdmin } from '@/app/_model/user.model';

const ProfileDropdownAdmin = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userData = useAppSelector((state) => state.adminData) as IAdmin | null;
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
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
      setDropdownOpen(false);
      router.push('/');
    }
  };

  const fullname = userData?.company_name || '';
  const avatarUrl = userData?.avatarUrl
    ? `${process.env.NEXT_PUBLIC_BASE_API_URL}${userData.avatarUrl}`
    : '/profileDefault.svg';

  return (
    <div className="relative md:hidden">
      <button onClick={toggleDropdown} className="flex items-center gap-2">
        <Image
          src={avatarUrl}
          alt="Profile"
          width={30}
          height={30}
          className="rounded-full"
        />
      </button>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2"
        >
          <div className="flex flex-col items-center gap-2 p-2 border-b">
            <Image
              src={avatarUrl}
              alt="Profile"
              width={30}
              height={30}
              className="rounded-full"
            />
            <div>
              <div className="font-bold">{fullname}</div>
            </div>
          </div>
          <Link href="/admin/compro" className="hover:underline font-semibold text-black">
            Profile
          </Link>
          <Link href="/admin/opre" className="hover:underline font-semibold text-black">
            Recruitment
          </Link>

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

export default ProfileDropdownAdmin;
