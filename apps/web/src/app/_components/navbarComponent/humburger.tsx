"use client"

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/_lib/redux/hooks';
import { userDataAction } from '@/app/_lib/redux/slices/userData.slice';
import { useRouter } from 'next/navigation';
import { adminDataAction } from '@/app/_lib/redux/slices/adminData.slice';
import { devDataAction } from '@/app/_lib/redux/slices/devData.slice';

export default function Hamburger() {
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const userData = useAppSelector((s) => s.userData);
  const adminData = useAppSelector((s) => s.adminData);
  const devData = useAppSelector((s) => s.devData);
  const [burger, setBurger] = useState(false);

  function navbarLink(text: string, url: string) {
    return { text, url };
  }

  const hrefList = [
    navbarLink('Lowongan', '/lowonganKerja'),
    navbarLink('Perusahaan', '/perusahaan'),
    navbarLink('Assessment', '/skillAssessment'),
  ];

  const optionalHref = (!userData?.id || !adminData?.id || !devData?.id)
    ? [navbarLink('Login', '/login')]
    : [];

  const dispatch = useAppDispatch();

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setBurger(false);
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
      setBurger(false);
      router.push('/');
    }
  };

  return (
    <div ref={menuRef} className="flex flex-col items-end h-full w-max">
      <button
        className="md:hidden self-end h-full font-semibold aspect-square relative flex justify-center items-center transition-all"
        onClick={() => setBurger(!burger)}
      >
        {!burger ? (
          <Image src="/menu.svg" alt="menu" width={30} height={30} />
        ) : (
          <>Close</>
        )}
      </button>

      <ul className={`md:h-full items-center flex-col md:flex-row md:flex gap-2 md:static bg-gray-700/50 md:bg-transparent
        ${!burger ? 'hidden' : 'flex absolute top-[60px] right-0 rounded-lg'}`}>
        {hrefList.map((e, i) => (
          <li className="h-full w-full text-black font-semibold py-2" key={i}>
            <Link
              className={`w-full h-full text-end px-2 ${
                pathname == e.url ? 'text-gray-200 bg-black rounded-lg pt' : ''
              } hover:text-gray-200 hover:bg-black flex justify-center items-center rounded-lg`}
              href={e.url}
              onClick={() => setBurger(false)}
            >
              <p className="w-full text-nowrap text-center">{e.text}</p>
            </Link>
          </li>
        ))}
        {optionalHref.map((e, i) => (
          <li className="h-full w-full text-black font-semibold py-2" key={i}>
            <Link
              className={`w-full h-full text-end px-2 ${
                pathname == e.url ? 'text-gray-200 bg-black rounded-lg pt' : ''
              } hover:text-gray-200 hover:bg-black flex justify-center items-center rounded-lg`}
              href={e.url}
              onClick={() => setBurger(false)}
            >
              <p className="w-full text-nowrap text-center">{e.text}</p>
            </Link>
          </li>
        ))}
        {userData?.id && adminData?.id && devData?.id && (
          <li className="h-full w-full text-black font-semibold py-2">
            <button
              onClick={handleLogout}
              className="w-full h-full text-end px-2 hover:text-gray-200 hover:bg-black flex justify-center items-center rounded-lg"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
