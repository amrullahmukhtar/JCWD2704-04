import LoginForm from "@/app/_components/formComponent/loginForm";
import React from "react";
import { NavbarTogglerSatu } from "../_components/navbarComponent/navbar1";

export default function page() {
  return (
    <>
      <NavbarTogglerSatu />
      <LoginForm />
    </>
  );
}