"use client";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "@/app/_lib/redux/store";
import AuthProvider from "./authProvider";

export default function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
