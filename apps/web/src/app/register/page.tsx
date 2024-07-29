import React from "react";
import RegisterForm from "../_components/formComponent/registerForm";
import { NavbarToggler } from "../_components/navbarComponent/navbar";

const RegisterPage: React.FC = () => {
  return (
    <>
      <NavbarToggler />
      <RegisterForm />;
    </>
  );
};

export default RegisterPage;
