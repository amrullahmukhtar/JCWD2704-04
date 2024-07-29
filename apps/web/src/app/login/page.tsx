import LoginForm from "@/app/_components/formComponent/loginForm";
import { NavbarToggler } from "@/app/_components/navbarComponent/navbar";
import React from "react";

export default function page() {
  return (
    <>
      <NavbarToggler />
      <LoginForm />
    </>
  );
}