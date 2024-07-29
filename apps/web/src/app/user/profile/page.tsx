import { NavbarToggler } from '@/app/_components/navbarComponent/navbar';
import UserProfileForm from '@/app/_components/userProfileComponent/editUserProfile';
import React from 'react';

export default function page() {
  return (
    <>
      <NavbarToggler />
      <UserProfileForm />
    </>
  );
}
