import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footerComponent/footer";
import StoreProvider from "./_components/reduxProviderComponent/storeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Career Avenue",
  description: "Find Your Job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className=""} min-h-screen`}>
        <StoreProvider>

          <div className="px-2">{children}</div>          
        </StoreProvider>
        <Footer />
      </body>
    </html>
  );
}
