import React from "react";
import RegisterForm from "../_components/formComponent/registerForm";
import { NavbarTogglerSatu } from "../_components/navbarComponent/navbarUser/navbar1";

const RegisterPage: React.FC = () => {
  return (
    <>
      <NavbarTogglerSatu />
      <RegisterForm />;
    </>
  );
};

export default RegisterPage;
