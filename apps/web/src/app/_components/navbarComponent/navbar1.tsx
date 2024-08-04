'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProfileDropdownKecil from './profileKecilSatu';
import ProfileDropdownSatu from './profileSatu';
import { useAppSelector } from '@/app/_lib/redux/hooks';

export function NavbarTogglerSatu() {
  return (
    <nav className="w-full sticky top-0 z-50">
      <div className="w-full h-[80px] rounded-md border border-transparent bg-white shadow-input py-2 px-2 md:px-5">
        <Navbar />
      </div>
    </nav>
  );
}

export default function Navbar() {
  const userData = useAppSelector((state) => state.userData);
  const adminData = useAppSelector((state) => state.adminData);
  const devData = useAppSelector((state) => state.devData);
  const isLoggedIn = userData?.id || adminData?.id || devData?.id;

  return (
    <div className="w-full flex justify-between items-center text-black h-full">
      <div className="h-full flex items-center justify-center gap-3">
        <div className="h-full relative aspect-[261/73]">
          <Link href="/">
            <Image src="/logoCA.png" alt="logo" fill />
          </Link>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-5">
        <Link href="/user/lowongan" className="hover:underline font-semibold">
          Lowongan
        </Link>
        <Link href="/user/perusahaan" className="hover:underline font-semibold">
          Perusahaan
        </Link>
        <Link href="/user/skillAssessment" className="hover:underline font-semibold">
          Assessment
        </Link>
        {!isLoggedIn && (
          <Link href="/login" className="hover:underline font-semibold">
            Login
          </Link>
        )}
        {isLoggedIn && <ProfileDropdownSatu />}
      </div>
      <div className="md:hidden flex items-center gap-5">
        {!isLoggedIn && (
          <Link href="/login" className="hover:underline font-semibold">
            Login
          </Link>
        )}
        {isLoggedIn && <ProfileDropdownKecil />}
      </div>
    </div>
  );
}
