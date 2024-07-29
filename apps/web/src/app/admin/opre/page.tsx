import AdminProfileForm from '@/app/_components/adminProfileComponent/editAdminProfile';
import { NavbarAdminToggler } from '@/app/_components/navbarComponent/navbarAdmin';
import React from 'react';

export default function page() {
  return (
    <>
      <NavbarAdminToggler />
      <div className="min-h-screen">
        <AdminProfileForm/>
      </div>
    </>
  );
}
