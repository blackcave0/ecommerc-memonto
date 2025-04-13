import React from "react";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Footer } from "@/components/home/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { AdminProvider } from "@/context/AdminContext";
import { CartProvider } from "@/context/CartContext";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";

export const metadata: Metadata = {
  title: "Momento - Premium Fashion",
  description: "Discover premium fashion with Momento",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <AuthProvider>
          <AdminProvider>
            <CartProvider>
              <LoadingOverlay />
              {children}
            </CartProvider>
          </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
