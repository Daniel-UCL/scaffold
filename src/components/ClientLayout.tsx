// src/components/ClientLayout.tsx
"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import MuiThemeProvider from "@/components/MuiThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <MuiThemeProvider>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <Header />

        <main id="main" className="site-main" role="main">
          {children}
        </main>

        <Footer />
      </MuiThemeProvider>
    </SessionProvider>
  );
}
