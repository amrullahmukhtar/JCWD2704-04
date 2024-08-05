
import React from "react";
import RecoveryPasswordForm from "../_components/formComponent/lupaPasswordForm";
import { NavbarTogglerSatu } from "../_components/navbarComponent/navbarUser/navbar1";

export default function page() {
  return (
    <>
      <NavbarTogglerSatu/>
      <RecoveryPasswordForm />
    </>
  );
}