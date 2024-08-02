import React from 'react';
import { NavbarAdminToggler } from '../_components/navbarComponent/navbarAdmin';
import AdminContent from '../_components/adminProfileComponent/adminProfile';

export default function page() {
  return (
    <>
      <NavbarAdminToggler />
      <AdminContent />s
    </>
  );
}
