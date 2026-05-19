import Navbar from "../components/navbar";
import CreateProjectModal from "../components/createProjectModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaArrowRight,
  FaFolderOpen,
} from "react-icons/fa";

import API from "../utils/api";

const Projects = () => {
  const [showModal, setShowModal] =
    useState(false);

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (!token) {
      navigate("/", {
        state: {
          message:
            "Please login first",
        },
      });
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchProjects =
      async () => {
        try {
          setLoading(true);

          const res =
            await API.get(
              "/projects/all",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          setProjects(
            res.data.projects || []
          );
        } catch (err) {
          console.log(
            "Error fetching projects",
            err
          );

          if (
            err.response?.status ===
            401
          ) {
            localStorage.clear();

            navigate("/", {
              state: {
                message:
                  "Session expired. Login again.",
              },
            });
          }
        } finally {
          setLoading(false);
        }
      };

    if (token) {
      fetchProjects();
    }
  }, [token, navigate]);

  return (
    <>
      <Navbar />

      <div style={container}>
        {/* GLOW EFFECTS */}
        <div
          style={{
            position: "fixed",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background:
              "rgba(255,0,255,0.15)",
            filter: "blur(120px)",
            top: "-120px",
            right: "-120px",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "fixed",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background:
              "rgba(168,85,247,0.12)",
            filter: "blur(120px)",
            bottom: "-120px",
            left: "-120px",
            zIndex: 0,
          }}
        />

        {/* HEADER */}
        <div style={headerRow}>
          <div>
            <p style={smallText}>
              PROJECT SPACE
            </p>

            <h1 style={heading}>
              Projects
            </h1>

            <p style={subHeading}>
              Manage and organize all
              your team projects in one
              futuristic workspace.
            </p>
          </div>

          {/* ADMIN BUTTON */}
          {user?.role ===
            "Admin" && (
            <button
              style={primaryBtn}
              onClick={() =>
                setShowModal(true)
              }
              onMouseEnter={(e) => {
                e.target.style.transform =
                  "translateY(-3px)";

                e.target.style.boxShadow =
                  "0 18px 35px rgba(255,0,255,0.35)";

                e.target.style.background =
                  "linear-gradient(135deg, #ff33ff, #c084fc)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform =
                  "translateY(0px)";

                e.target.style.boxShadow =
                  "0 10px 30px rgba(255,0,255,0.25)";

                e.target.style.background =
                  "linear-gradient(135deg, #ff00ff, #a855f7)";
              }}
            >
              + New Project
            </button>
          )}
        </div>

        {/* CONTENT */}
        {loading ? (
          <div style={emptyBox}>
            <p
              style={{
                color: "#cbd5e1",
              }}
            >
              Loading projects...
            </p>
          </div>
        ) : projects.length ===
          0 ? (
          <div style={emptyBox}>
            <FaFolderOpen
              size={42}
              color="#ff00ff"
            />

            <h2
              style={{
                color: "white",
                fontWeight: "400",
              }}
            >
              No Projects Found
            </h2>

            <p
              style={{
                color: "#94a3b8",
              }}
            >
              Create your first
              project to get started.
            </p>
          </div>
        ) : (
          <div style={grid}>
            {projects.map((p) => (
              <div
                key={p._id}
                onClick={() =>
                  navigate(
                    `/project/${p._id}`
                  )
                }
                style={card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px)";

                  e.currentTarget.style.boxShadow =
                    "0 35px 70px rgba(255,0,255,0.18)"

                  e.currentTarget.style.border =
                    "1px solid rgba(255,0,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";

                  e.currentTarget.style.boxShadow =
                    "0 20px 50px rgba(0,0,0,0.45)";

                  e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.08)";
                }}
              >
                {/* TOP */}
                <div style={topRow}>
                  <span>
                    PROJECT
                  </span>

                  <div style={arrowBox}>
                    <FaArrowRight
                      size={12}
                    />
                  </div>
                </div>

                {/* TITLE */}
                <h2 style={title}>
                  {p.name}
                </h2>

                {/* DESCRIPTION */}
                <p style={description}>
                  {p.description ||
                    "No description provided for this project."}
                </p>

                {/* FOOTER */}
                <div style={footer}>
                  <div
                    style={memberRow}
                  >
                    <FaUsers
                      size={14}
                    />

                    <span>
                      {p.members
                        ?.length ||
                        0}{" "}
                      Members
                    </span>
                  </div>

                  <div
                    style={statusBadge}
                  >
                    Active
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal &&
        user?.role ===
          "Admin" && (
          <CreateProjectModal
            onClose={() =>
              setShowModal(false)
            }
          />
        )}
    </>
  );
};

const container = {
  minHeight: "100vh",

  padding: "50px",

  background: `
    linear-gradient(135deg, #020617 0%, #030712 40%, #000000 100%),
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
  `,

  backgroundSize:
    "cover, 80px 80px, 80px 80px",

  fontFamily:
    "'Poppins', sans-serif",

  position: "relative",

  overflow: "hidden",
};

const headerRow = {
  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "45px",

  position: "relative",

  zIndex: 2,
};

const smallText = {
  fontSize: "12px",

  letterSpacing: "5px",

  color: "#ff00ff",

  textTransform:
    "uppercase",
};

const heading = {
  fontSize: "62px",

  color: "white",

  margin: "10px 0",

  fontWeight: "300",

  letterSpacing: "-3px",
};

const subHeading = {
  color: "#94a3b8",

  fontSize: "16px",

  lineHeight: "1.8",
};

const primaryBtn = {
  padding: "16px 28px",

  background:
    "linear-gradient(135deg, rgba(255,0,255,0.85), rgba(168,85,247,0.85))",

  color: "white",

  border:
    "1px solid rgba(255,255,255,0.12)",

  borderRadius: "16px",

  fontWeight: "600",

  fontSize: "15px",

  cursor: "pointer",

  backdropFilter:
    "blur(18px)",

  boxShadow:
    "0 10px 35px rgba(255,0,255,0.22)",

  transition: "all 0.3s ease",

  position: "relative",

  zIndex: 2,
};

const grid = {
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(340px, 1fr))",

  gap: "28px",

  position: "relative",

  zIndex: 2,
};

const card = {
  padding: "32px",

  borderRadius: "30px",

  background:
    "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",

  border:
    "1px solid rgba(255,255,255,0.10)",

  backdropFilter:
    "blur(28px)",

  WebkitBackdropFilter:
    "blur(28px)",

  cursor: "pointer",

  transition: "all 0.35s ease",

  boxShadow:
    "0 20px 60px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.06)",

  position: "relative",

  overflow: "hidden",
};

const topRow = {
  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  fontSize: "11px",

  letterSpacing: "3px",

  color: "#ff00ff",

  textTransform:
    "uppercase",
};

const arrowBox = {
  width: "42px",

  height: "42px",

  borderRadius: "16px",

  background:
    "rgba(255,255,255,0.05)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  backdropFilter:
    "blur(14px)",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  color: "#ff00ff",

  transition: "all 0.3s ease",

  boxShadow:
    "0 8px 20px rgba(255,0,255,0.08)",
};

const title = {
  margin: "24px 0 14px",

  color: "white",

  fontSize: "32px",

  fontWeight: "400",

  letterSpacing: "-1px",
};

const description = {
  color: "#94a3b8",

  lineHeight: "1.9",

  minHeight: "70px",

  fontSize: "15px",
};

const footer = {
  marginTop: "30px",

  paddingTop: "20px",

  borderTop:
    "1px solid rgba(255,255,255,0.06)",

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",
};

const memberRow = {
  display: "flex",

  alignItems: "center",

  gap: "8px",

  color: "#94a3b8",

  fontSize: "14px",
};

const statusBadge = {
  padding: "8px 14px",

  borderRadius: "999px",

  background:
    "rgba(255,0,255,0.12)",

  color: "#ff00ff",

  fontSize: "12px",

  fontWeight: "500",

  border:
    "1px solid rgba(255,0,255,0.15)",
};

const emptyBox = {
  height: "320px",

  borderRadius: "30px",

  background:
    "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",

  border:
    "1px solid rgba(255,255,255,0.10)",

  backdropFilter:
    "blur(28px)",

  WebkitBackdropFilter:
    "blur(28px)",

  display: "flex",

  flexDirection: "column",

  alignItems: "center",

  justifyContent: "center",

  gap: "14px",

  boxShadow:
    "0 20px 60px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.06)",

  position: "relative",

  zIndex: 2,
};

export default Projects;