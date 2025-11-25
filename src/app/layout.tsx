// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Alliances Platform",
  description: "UCL Computer Science Alliances Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
