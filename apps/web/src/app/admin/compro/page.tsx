import { NavbarAdminToggler } from '@/app/_components/navbarComponent/navbarAdmin';
import React from 'react';

export default function page() {
  return (
    <>
      <NavbarAdminToggler />
      <div className="min-h-screen">admin page</div>
    </>
  );
}
