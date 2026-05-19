import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaThLarge,
  FaFolder,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div style={navbarStyle}>
      {/* LEFT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "42px",
        }}
      >
        {/* LOGO */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={logoBox}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-3px) rotate(-4deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0px) rotate(0deg)";
            }}
          >
            T
          </div>

          <div>
            <div style={logoText}>
              TASKORBIT
            </div>

            <div style={logoSubText}>
              FUTURISTIC WORKSPACE
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <div style={navContainer}>
          <Link
            to="/dashboard"
            style={navLink(
              location.pathname ===
                "/dashboard"
            )}
            onMouseEnter={(e) => {
              if (
                location.pathname !==
                "/dashboard"
              ) {
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.04)";
              }

              e.currentTarget.style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              if (
                location.pathname !==
                "/dashboard"
              ) {
                e.currentTarget.style.background =
                  "transparent";
              }

              e.currentTarget.style.transform =
                "translateY(0px)";
            }}
          >
            <FaThLarge size={14} />
            Dashboard
          </Link>

          <Link
            to="/projects"
            style={navLink(
              location.pathname ===
                "/projects"
            )}
            onMouseEnter={(e) => {
              if (
                location.pathname !==
                "/projects"
              ) {
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.04)";
              }

              e.currentTarget.style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              if (
                location.pathname !==
                "/projects"
              ) {
                e.currentTarget.style.background =
                  "transparent";
              }

              e.currentTarget.style.transform =
                "translateY(0px)";
            }}
          >
            <FaFolder size={14} />
            Projects
          </Link>
        </div>
      </div>

      {/* RIGHT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        {/* USER INFO */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          {/* USER ICON */}
          <div
            style={iconBox}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-3px)";
              e.currentTarget.style.border =
                "1px solid rgba(255,0,255,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0px)";
              e.currentTarget.style.border =
                "1px solid rgba(255,255,255,0.08)";
            }}
          >
            <FaUser size={15} />
          </div>

          {/* USER DETAILS */}
          <div
            style={{
              textAlign: "right",
            }}
          >
            <div style={userName}>
              {user?.name || "User"}
            </div>

            <div style={roleBadge}>
              {user?.role?.toUpperCase() ||
                "MEMBER"}
            </div>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          style={logoutBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-3px)";

            e.currentTarget.style.boxShadow =
              "0 18px 35px rgba(255,0,255,0.35)";

            e.currentTarget.style.background =
              "linear-gradient(135deg, #ff33ff, #c084fc)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0px)";

            e.currentTarget.style.boxShadow =
              "0 10px 30px rgba(255,0,255,0.25)";

            e.currentTarget.style.background =
              "linear-gradient(135deg, #ff00ff, #a855f7)";
          }}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  padding: "18px 40px",

  background:
    "rgba(8,8,15,0.72)",

  backdropFilter:
    "blur(24px)",

  borderBottom:
    "1px solid rgba(255,0,255,0.12)",

  position: "sticky",

  top: 0,

  zIndex: 100,

  boxShadow:
    "0 10px 40px rgba(0,0,0,0.35)",
};

const logoBox = {
  width: "48px",

  height: "48px",

  borderRadius: "16px",

  background:
    "linear-gradient(135deg, #ff00ff, #a855f7)",

  color: "white",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  fontWeight: "600",

  fontSize: "20px",

  boxShadow:
    "0 10px 30px rgba(255,0,255,0.35)",

  transition: "all 0.3s ease",
};

const logoText = {
  fontWeight: "300",

  color: "white",

  fontSize: "20px",

  letterSpacing: "3px",
};

const logoSubText = {
  fontSize: "11px",

  color: "#94a3b8",

  marginTop: "4px",

  letterSpacing: "2px",

  textTransform: "uppercase",
};

const navContainer = {
  display: "flex",

  alignItems: "center",

  gap: "16px",

  background:
    "rgba(255,255,255,0.03)",

  padding: "8px",

  borderRadius: "18px",

  border:
    "1px solid rgba(255,255,255,0.06)",

  backdropFilter:
    "blur(12px)",
};

const navLink = (active) => ({
  display: "flex",

  alignItems: "center",

  gap: "10px",

  textDecoration: "none",

  padding: "13px 20px",

  borderRadius: "14px",

  fontSize: "14px",

  fontWeight: active
    ? "600"
    : "400",

  color: active
    ? "white"
    : "#cbd5e1",

  background: active
    ? "linear-gradient(135deg, #ff00ff, #a855f7)"
    : "transparent",

  transition: "all 0.3s ease",

  boxShadow: active
    ? "0 10px 24px rgba(255,0,255,0.25)"
    : "none",

  position: "relative",

  overflow: "hidden",
});

const userName = {
  color: "white",

  fontSize: "14px",

  fontWeight: "500",

  letterSpacing: "0.5px",
};

const roleBadge = {
  fontSize: "10px",

  background:
    "rgba(255,0,255,0.12)",

  color: "#ff00ff",

  padding: "4px 10px",

  borderRadius: "999px",

  marginTop: "5px",

  letterSpacing: "1.5px",

  fontWeight: "500",

  border:
    "1px solid rgba(255,0,255,0.15)",
};

const iconBox = {
  width: "46px",

  height: "46px",

  borderRadius: "16px",

  background:
    "rgba(255,255,255,0.04)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  color: "white",

  backdropFilter:
    "blur(12px)",

  transition: "all 0.3s ease",
};

const logoutBtn = {
  display: "flex",

  alignItems: "center",

  gap: "8px",

  background:
    "linear-gradient(135deg, #ff00ff, #a855f7)",

  color: "white",

  border: "none",

  padding: "13px 18px",

  borderRadius: "14px",

  cursor: "pointer",

  fontWeight: "600",

  fontSize: "14px",

  transition: "all 0.3s ease",

  boxShadow:
    "0 10px 30px rgba(255,0,255,0.25)",
};

export default Navbar;