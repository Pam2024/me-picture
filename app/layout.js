"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";
import { initializeSocket,closeSocket } from "./lib/socket";
import { AuthProvider, useAuth } from "./context/auth"; // Import AuthProvider
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <AuthProvider> {/* Wrap entire app with AuthProvider */}
      <AuthWrapper>{children}</AuthWrapper>
    </AuthProvider>
  );
}

// Separate component to handle authentication and sockets
function AuthWrapper({ children }) {
  const { user } = useAuth(); // Now `useAuth` is properly defined

  useEffect(() => {
    if (user?.id) {
      const socket = initializeSocket(user.id);

      return () => {
        closeSocket();
      };
    }
  }, [user?.id]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
