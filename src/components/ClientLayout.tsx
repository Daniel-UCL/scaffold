"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import MuiThemeProvider from "@/components/MuiThemeProvider";
import MainNav from "@/components/MainNav";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <MuiThemeProvider>
        <div className="page-wrapper">
          <MainNav />
          <main className="site-main">{children}</main>
          <footer className="site-footer">
            <p>&copy; {new Date().getFullYear()} UCL Computer Science Alliances</p>
          </footer>
        </div>
      </MuiThemeProvider>
    </SessionProvider>
  );
}
