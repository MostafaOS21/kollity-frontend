import LanguageProvider from "@/components/providers/LanguageProvider";
import StoreProvider from "@/components/providers/StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import "./globals.css";
import { languages } from "./i18n/settings";
import AuthProvider from "@/components/providers/AuthProvider";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body className="relative">
        <StoreProvider>
          <AuthProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </AuthProvider>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
