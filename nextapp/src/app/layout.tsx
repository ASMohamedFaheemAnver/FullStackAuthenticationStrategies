import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/app/components/Nav";
import AuthProvider from "./providers/AuthProvider";

export const metadata: Metadata = {
  title: "Next auth",
  description:
    "This project to show how to do authentication inside next.js project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="bg-gray-100">
          <Nav />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
