"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link for page navigation

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <img
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          style={styles.logoImage}
        />
      </div>

      <div style={styles.search}>
        <input type="text" placeholder="Search..." style={styles.searchBar} />
      </div>

      <div style={styles.profile}>
        {user ? (
          <>
            <span style={styles.userName}>{user.name}</span>
            <Link href="/profile">
              <div style={styles.profileIcon}>👤</div>
            </Link>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/profile">
            <div style={styles.profileIcon}>👤</div>
          </Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    backgroundColor: "#333",
    color: "white",
    height: "80px",
  },
  logoImage: {
    borderRadius: "50%",
    border: "3px solid white",
    objectFit: "cover",
  },
  search: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  searchBar: {
    width: "400px",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "16px",
    border: "1px solid #333",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  profileIcon: {
    fontSize: "30px",
    borderRadius: "50%",
    marginLeft: "10px",
    padding: "10px",
    border: "2px solid white",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white", // Set the color of the icon to white
  },
  userName: {
    fontSize: "18px",
    marginRight: "10px",
  },
  logoutButton: {
    marginLeft: "15px",
    padding: "10px 20px",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Navbar;
