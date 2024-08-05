import React from 'react';
import RecoveryPasswordForm from '../_components/formComponent/recoveryPasswordForm';
import { NavbarTogglerSatu } from '../_components/navbarComponent/navbarUser/navbar1';

const VerificationPage: React.FC = () => {
  return (
    <>
      <NavbarTogglerSatu />
      <RecoveryPasswordForm />;
    </>
  );
};

export default VerificationPage;
