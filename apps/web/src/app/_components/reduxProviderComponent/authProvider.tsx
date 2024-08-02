"use client";
import { useAppDispatch } from "@/app/_lib/redux/hooks";
import { keepLogin } from "@/app/_middleware/auth.middleware";
import { ReactNode, useEffect, useCallback } from "react";
import { useAppSelector } from "@/app/_lib/redux/hooks";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  // Gunakan useCallback untuk memastikan fungsi ini tidak berubah kecuali dispatch berubah
  const verify = useCallback(async () => {
    try {
      const result = await keepLogin(dispatch);
      if (!result.success) {
        console.error("Failed to verify login:", result.message);
      }
    } catch (error) {
      console.error("Error verifying login:", error);
    }
  }, [dispatch]);

  const userData = useAppSelector((state) => state.userData);
  const adminData = useAppSelector((state) => state.adminData);
  const devData = useAppSelector((state) => state.devData);

  useEffect(() => {
    verify();
  }, [verify]); // Tambahkan verify ke dalam array dependensi

  useEffect(() => {
    // Tambahkan logika yang diinginkan di sini jika perlu
  }, [userData, adminData, devData]);

  return <>{children}</>;
}
