import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crowdbotics Code-to-Spec",
  description: "Crowdbotics Code-to-Spec is a platform that allows users to create and manage their own code specifications. It provides a user-friendly interface for defining and organizing code requirements, making it easier for developers to understand and implement them. The platform also offers collaboration features, allowing teams to work together on code specifications and track changes over time. With Crowdbotics Code-to-Spec, users can streamline their development process and ensure that their code meets the specified requirements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
