import AdminProfileForm from '@/app/_components/adminProfileComponent/editAdminProfile';
import UploadAvatarAdmin from '@/app/_components/adminProfileComponent/uploadAvatarAdmin';
import { NavbarTogglerAdmin } from '@/app/_components/navbarComponent/navbarAdmin/navbarAdmin';
import React from 'react';

export default function page() {
  return (
    <>
      <NavbarTogglerAdmin />
      <div className="min-h-screen">
        <UploadAvatarAdmin/>
        <AdminProfileForm />
      </div>
    </>
  );
}
