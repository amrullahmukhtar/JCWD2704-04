import React from 'react';
import RecoveryPasswordForm from '../_components/formComponent/recoveryPasswordForm';
import { NavbarToggler } from '../_components/navbarComponent/navbar';

const VerificationPage: React.FC = () => {
  return (
    <>
      <NavbarToggler />
      <RecoveryPasswordForm />;
    </>
  );
};

export default VerificationPage;
