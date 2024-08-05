import { NavbarTogglerSatu } from '@/app/_components/navbarComponent/navbarUser/navbar1';
import UserProfileForm from '@/app/_components/userProfileComponent/editUserProfile';
import SubmitCV from '@/app/_components/userProfileComponent/submitCV';
import UploadAvatar from '@/app/_components/userProfileComponent/uploadAvatar';
import React from 'react';

export default function page() {
  return (
    <>
      <NavbarTogglerSatu />
      <div className="min-h-screen">
        <UploadAvatar />
        <SubmitCV />
        <UserProfileForm />
      </div>
    </>
  );
}
