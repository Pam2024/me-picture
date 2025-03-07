"use client";

import { useEffect } from "react";
import { initializeSocket, closeSocket } from "../lib/socket";
import { useAuth } from "../context/auth"; // Ensure this is imported correctly

export default function AuthWrapper({ children }) {
  const { user } = useAuth(); // Now safely accesses the user from context

  useEffect(() => {
    if (user?.id) {
      const socket = initializeSocket(user.id);

      // Cleanup when user changes or component unmounts
      return () => {
        closeSocket();
      };
    }
  }, [user?.id]);

  // Only render children when the user is properly fetched
  if (!user) {
    return null; // or a loading spinner, etc.
  }

  return <>{children}</>;
}
