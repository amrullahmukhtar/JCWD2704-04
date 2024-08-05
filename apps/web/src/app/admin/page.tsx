import React from 'react';
import AdminContent from '../_components/adminProfileComponent/adminProfile';
import { NavbarTogglerAdmin } from '../_components/navbarComponent/navbarAdmin/navbarAdmin';


export default function page() {
  return (
    <>
      <NavbarTogglerAdmin />
      <AdminContent />s
    </>
  );
}
