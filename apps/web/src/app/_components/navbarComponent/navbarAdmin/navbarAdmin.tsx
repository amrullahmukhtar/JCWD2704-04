'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProfileDropdownAdmin from './profileKecilAdmin';
import { useAppSelector } from '@/app/_lib/redux/hooks';

export function NavbarTogglerAdmin() {
  return (
    <nav className="w-full sticky top-0 z-50">
      <div className="w-full h-[80px] rounded-md border border-transparent bg-white shadow-input py-2 px-2 md:px-5">
        <NavbarAdmin />
      </div>
    </nav>
  );
}

export default function NavbarAdmin() {
  const userData = useAppSelector((state) => state.userData);
  const adminData = useAppSelector((state) => state.adminData);
  const devData = useAppSelector((state) => state.devData);
  const isLoggedIn = userData?.id || adminData?.id || devData?.id;

  return (
    <div className="w-full flex justify-between items-center text-black h-full">
      <div className="h-full flex items-center justify-center gap-3">
        <div className="h-full relative aspect-[261/73]">
          <Link href="/admin">
            <Image
              src="/logoCA.png"
              alt="logo"
              fill
              sizes="(max-width: 768px) 50vw, 20vw" // Add sizes prop
            />
          </Link>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-5">
        <Link href="/admin/compro" className="hover:underline font-semibold text-black">
          Profile
        </Link>
        <Link href="/admin/opre" className="hover:underline font-semibold text-black">
          Recruitment
        </Link>

        {!isLoggedIn && (
          <Link href="/login" className="hover:underline font-semibold text-black">
            Login
          </Link>
        )}
        {isLoggedIn && <ProfileDropdownAdmin />}
      </div>
      <div className="md:hidden flex items-center gap-5">
        {!isLoggedIn && (
          <Link href="/login" className="hover:underline font-semibold text-black">
            Login
          </Link>
        )}
        {isLoggedIn && <ProfileDropdownAdmin />}
      </div>
    </div>
  );
}
