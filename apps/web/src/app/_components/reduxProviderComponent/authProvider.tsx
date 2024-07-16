"use client";
import { useAppDispatch } from "@/app/_lib/redux/hooks";
import { keepLogin } from "@/app/_middleware/auth.middleware";
import { ReactNode, useEffect } from "react";
import { useAppSelector } from "@/app/_lib/redux/hooks";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  const verify = async () => {
    try {
      const result = await keepLogin(dispatch);
      if (!result.success) {
        console.error("Failed to verify login:", result.message);
      }
    } catch (error) {
      console.error("Error verifying login:", error);
    }
  };
  

  const userData = useAppSelector((state) => state.userData);
  const adminData = useAppSelector((state) => state.adminData);
  const devData = useAppSelector((state) => state.devData);

  useEffect(() => {
    verify();
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData, adminData, devData]);

  return <>{children}</>;
}
