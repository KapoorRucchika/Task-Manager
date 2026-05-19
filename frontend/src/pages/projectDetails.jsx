import Navbar from "../components/navbar";
import CreateTaskModal from "../components/createTaskModal";
import AddMemberModal from "../components/addMemberModal";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaTrash,
  FaPlus,
  FaArrowLeft,
} from "react-icons/fa";

import API from "../utils/api";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showTaskModal, setShowTaskModal] =
    useState(false);

  const [showMemberModal, setShowMemberModal] =
    useState(false);

  // Protect route
  useEffect(() => {
    if (!token) {
      navigate("/", {
        state: {
          message: "Please login first",
        },
      });
    }
  }, [token, navigate]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const projRes = await API.get(
          `/projects/single/${id}`
        );

        setProject(projRes.data.project);

        setMembers(
          projRes.data.project?.members || []
        );

        const taskRes = await API.get(
          `/tasks/${id}`
        );

        setTasks(taskRes.data.tasks || []);
      } catch (err) {
        console.log(err);

        if (err.response?.status === 401) {
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

    if (token) fetchData();
  }, [id, token, navigate]);

  // DELETE PROJECT
  const handleDeleteProject = async () => {
    if (!window.confirm("Delete this project?"))
      return;

    try {
      await API.delete(`/projects/delete/${id}`);

      alert("Project deleted");

      navigate("/projects");
    } catch (err) {
      console.log(err);
      alert("Failed to delete project");
    }
  };

  // DELETE TASK
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Delete this task?"))
      return;

    try {
      await API.delete(
        `/tasks/delete/${taskId}`
      );

      setTasks((prev) =>
        prev.filter((t) => t._id !== taskId)
      );
    } catch (err) {
      console.log(err);
      alert("Failed to delete task");
    }
  };

  // REMOVE MEMBER
  const handleRemoveMember = async (
    memberId
  ) => {
    try {
      await API.put(
        `/projects/remove-member/${id}`,
        { memberId }
      );

      setMembers((prev) =>
        prev.filter((m) => m._id !== memberId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE STATUS
  const handleStatusChange = async (
    taskId,
    newStatus
  ) => {
    try {
      await API.put(
        `/tasks/update/${taskId}`,
        { status: newStatus }
      );

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId
            ? { ...t, status: newStatus }
            : t
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    "Pending",
    "In Progress",
    "Completed",
    "Overdue",
  ];

  if (loading)
    return (
      <p
        style={{
          padding: "40px",
          color: "white",
          background: "#020617",
          minHeight: "100vh",
        }}
      >
        Loading...
      </p>
    );

  if (!project)
    return (
      <p
        style={{
          padding: "40px",
          color: "white",
          background: "#020617",
          minHeight: "100vh",
        }}
      >
        Project not found
      </p>
    );

  return (
    <>
      <Navbar />

      <div style={page}>
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
            pointerEvents: "none",
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
            pointerEvents: "none",
          }}
        />

        {/* BACK */}
        <button
          onClick={() => navigate("/projects")}
          style={backBtn}
          onMouseEnter={(e) => {
            e.target.style.transform =
              "translateY(-3px)";
            e.target.style.background =
              "rgba(255,255,255,0.08)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform =
              "translateY(0px)";
            e.target.style.background =
              "rgba(255,255,255,0.05)";
          }}
        >
          <FaArrowLeft />
          Back to Projects
        </button>

        {/* HEADER */}
        <div style={header}>
          <div>
            <p style={smallText}>
              PROJECT SPACE
            </p>

            <h1 style={title}>
              {project.name}
            </h1>

            <p style={desc}>
              {project.description}
            </p>
          </div>

          {user?.role === "Admin" && (
            <div style={btnRow}>
              <button
                style={dangerBtn}
                onClick={handleDeleteProject}
                onMouseEnter={(e) => {
                  e.target.style.transform =
                    "translateY(-4px) scale(1.02)";

                  e.target.style.boxShadow =
                    "0 20px 40px rgba(239,68,68,0.35)";

                  e.target.style.filter =
                    "brightness(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform =
                    "translateY(0px) scale(1)";

                  e.target.style.boxShadow =
                    "0 10px 30px rgba(239,68,68,0.25)";

                  e.target.style.filter =
                    "brightness(1)";
                }}
              >
                <FaTrash />
                Delete
              </button>

              <button
                style={secondaryBtn}
                onClick={() =>
                  setShowMemberModal(true)
                }
                onMouseEnter={(e) => {
                  e.target.style.transform =
                    "translateY(-4px) scale(1.02)";

                  e.target.style.background =
                    "rgba(255,255,255,0.10)";

                  e.target.style.boxShadow =
                    "0 20px 40px rgba(255,0,255,0.15)";

                  e.target.style.border =
                    "1px solid rgba(255,0,255,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform =
                    "translateY(0px) scale(1)";

                  e.target.style.background =
                    "rgba(255,255,255,0.05)";

                  e.target.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.2)";

                  e.target.style.border =
                    "1px solid rgba(255,255,255,0.08)";
                }}
              >
                <FaPlus />
                Add Member
              </button>

              <button
                style={primaryBtn}
                onClick={() =>
                  setShowTaskModal(true)
                }
                onMouseEnter={(e) => {
                  e.target.style.transform =
                    "translateY(-4px) scale(1.02)";

                  e.target.style.boxShadow =
                    "0 22px 45px rgba(255,0,255,0.35)";

                  e.target.style.filter =
                    "brightness(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform =
                    "translateY(0px) scale(1)";

                  e.target.style.boxShadow =
                    "0 10px 30px rgba(255,0,255,0.25)";

                  e.target.style.filter =
                    "brightness(1)";
                }}
              >
                <FaPlus />
                New Task
              </button>
            </div>
          )}
        </div>

        {/* MEMBERS */}
        <div style={memberSection}>
          <div style={memberHeader}>
            <FaUsers color="#ff00ff" />

            <h2
              style={{
                color: "white",
                fontWeight: "400",
              }}
            >
              Team Members
            </h2>
          </div>

          <div style={memberList}>
            {members.map((m) => (
              <div
                key={m._id}
                style={memberCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-5px)";

                  e.currentTarget.style.boxShadow =
                    "0 25px 50px rgba(255,0,255,0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";

                  e.currentTarget.style.boxShadow =
                    "0 18px 40px rgba(0,0,0,0.28)";
                }}
              >
                <div style={avatar}>
                  {m.name?.charAt(0)}
                </div>

                <div style={{ flex: 1 }}>
                  <strong
                    style={{
                      color: "white",
                    }}
                  >
                    {m.name}
                  </strong>

                  <p style={memberEmail}>
                    {m.email}
                  </p>
                </div>

                {user?.role === "Admin" && (
                  <span
                    style={removeBtn}
                    onClick={() =>
                      handleRemoveMember(m._id)
                    }
                  >
                    ✕
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* TASK HEADING */}
        <div style={taskHeading}>
          <h2
            style={{
              color: "white",
              fontWeight: "400",
            }}
          >
            Tasks ({tasks.length})
          </h2>
        </div>

        {/* KANBAN */}
        <div style={kanban}>
          {columns.map((col) => {
            const filtered = tasks.filter(
              (t) => {
                const isOverdue =
                  t.dueDate &&
                  new Date(t.dueDate) <
                  new Date() &&
                  t.status !== "Completed";

                if (col === "Overdue")
                  return isOverdue;

                if (col === "Pending")
                  return (
                    t.status === "Pending" &&
                    !isOverdue
                  );

                if (col === "In Progress")
                  return (
                    t.status ===
                    "In Progress" &&
                    !isOverdue
                  );

                if (col === "Completed")
                  return (
                    t.status === "Completed"
                  );

                return false;
              }
            );

            return (
              <div
                key={col}
                style={column}
              >
                {/* COLUMN HEADER */}
                <div
                  style={{
                    ...columnHeader,

                    background:
                      col === "Pending"
                        ? "rgba(250,204,21,0.12)"
                        : col ===
                          "In Progress"
                          ? "rgba(255,0,255,0.12)"
                          : col ===
                            "Completed"
                            ? "rgba(34,197,94,0.12)"
                            : "rgba(239,68,68,0.12)",

                    color:
                      col === "Pending"
                        ? "#fde047"
                        : col ===
                          "In Progress"
                          ? "#ff00ff"
                          : col ===
                            "Completed"
                            ? "#4ade80"
                            : "#f87171",
                  }}
                >
                  <span>{col}</span>

                  <span>
                    {filtered.length}
                  </span>
                </div>

                {/* TASKS */}
                {filtered.map((t) => {
                  const isOverdue =
                    t.dueDate &&
                    new Date(t.dueDate) <
                    new Date() &&
                    t.status !== "Completed";

                  return (
                    <div
                      key={t._id}
                      style={{
                        ...taskCard,

                        border: isOverdue
                          ? "1px solid rgba(239,68,68,0.35)"
                          : "1px solid rgba(255,255,255,0.08)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-5px)";

                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.07)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0px)";

                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.05)";
                      }}
                    >
                      {/* DELETE */}
                      {user?.role ===
                        "Admin" && (
                          <span
                            onClick={() =>
                              handleDeleteTask(
                                t._id
                              )
                            }
                            style={
                              deleteTaskBtn
                            }
                          >
                            <FaTrash
                              color="#ef4444"
                              size={13}
                            />
                          </span>
                        )}

                      <h4
                        style={{
                          color: "white",
                          marginBottom: "10px",
                        }}
                      >
                        {t.title}
                      </h4>

                      <p style={taskDesc}>
                        {t.description}
                      </p>

                      <div style={taskFooter}>
                        <span>
                          👤{" "}
                          {t.assignedTo
                            ?.name ||
                            "Unassigned"}
                        </span>

                        <span>
                          📅{" "}
                          {t.dueDate
                            ? new Date(
                              t.dueDate
                            ).toLocaleDateString()
                            : "-"}
                        </span>
                      </div>

                      {!isOverdue && (
                        <select
                          value={t.status}
                          onChange={(e) =>
                            handleStatusChange(
                              t._id,
                              e.target.value
                            )
                          }
                          style={selectStyle}
                          onFocus={(e) => {
                            e.target.style.border =
                              "1px solid #ff00ff";

                            e.target.style.boxShadow =
                              "0 0 0 4px rgba(255,0,255,0.12)";
                          }}
                          onBlur={(e) => {
                            e.target.style.border =
                              "1px solid rgba(255,255,255,0.08)";

                            e.target.style.boxShadow =
                              "none";
                          }}
                        >
                          <option>
                            Pending
                          </option>

                          <option>
                            In Progress
                          </option>

                          <option>
                            Completed
                          </option>
                        </select>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* MODALS */}
      {showTaskModal &&
        user?.role === "Admin" && (
          <CreateTaskModal
            onClose={() =>
              setShowTaskModal(false)
            }
            members={members}
            projectId={id}
            onTaskCreated={(newTask) => {
              setTasks((prev) => [
                newTask,
                ...prev,
              ]);
            }}
          />
        )}

      {showMemberModal &&
        user?.role === "Admin" && (
          <AddMemberModal
            onClose={() =>
              setShowMemberModal(false)
            }
            currentMembers={members}
            projectId={id}
            onAdd={(user) => {
              setMembers((prev) => [
                ...prev,
                user,
              ]);
            }}
          />
        )}
    </>
  );
};

const page = {
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

const backBtn = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "35px",
  background:
    "rgba(255,255,255,0.05)",
  border:
    "1px solid rgba(255,255,255,0.08)",
  color: "#e2e8f0",
  cursor: "pointer",
  fontSize: "14px",
  padding: "15px 20px",
  borderRadius: "18px",
  backdropFilter: "blur(16px)",
  transition: "all 0.3s ease",
  position: "relative",
  zIndex: 2,
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.25)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "45px",
  position: "relative",
  zIndex: 2,
  gap: "20px",
  flexWrap: "wrap",
};

const title = {
  fontSize: "62px",
  color: "white",
  margin: "10px 0",
  fontWeight: "300",
  letterSpacing: "-3px",
};

const desc = {
  color: "#94a3b8",
  maxWidth: "760px",
  lineHeight: "1.9",
  fontSize: "16px",
};

const smallText = {
  fontSize: "12px",
  letterSpacing: "5px",
  color: "#ff00ff",
  textTransform: "uppercase",
};

const btnRow = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap",
};

const primaryBtn = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  background:
    "linear-gradient(135deg, #ff00ff, #a855f7)",
  color: "white",
  border:
    "1px solid rgba(255,255,255,0.10)",
  padding: "15px 22px",
  borderRadius: "18px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "all 0.3s ease",
  boxShadow:
    "0 10px 30px rgba(255,0,255,0.25)",
};

const secondaryBtn = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  background:
    "rgba(255,255,255,0.05)",
  color: "white",
  border:
    "1px solid rgba(255,255,255,0.08)",
  padding: "15px 22px",
  borderRadius: "18px",
  cursor: "pointer",
  backdropFilter: "blur(16px)",
};

const dangerBtn = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  background:
    "linear-gradient(135deg, rgba(239,68,68,0.85), rgba(220,38,38,0.85))",
  color: "white",
  border:
    "1px solid rgba(255,255,255,0.08)",
  padding: "15px 22px",
  borderRadius: "18px",
  cursor: "pointer",
  boxShadow:
    "0 10px 30px rgba(239,68,68,0.25)",
};

const memberSection = {
  marginBottom: "40px",
  position: "relative",
  zIndex: 2,
};

const memberHeader = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "22px",
};

const memberList = {
  display: "flex",
  gap: "18px",
  flexWrap: "wrap",
};

const memberCard = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  padding: "20px",
  borderRadius: "24px",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
  border:
    "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(24px)",
  minWidth: "290px",
  transition: "all 0.3s ease",
  boxShadow:
    "0 18px 40px rgba(0,0,0,0.28)",
};

const avatar = {
  width: "50px",
  height: "50px",
  borderRadius: "16px",
  background:
    "linear-gradient(135deg, #ff00ff, #a855f7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "600",
  fontSize: "18px",
};

const memberEmail = {
  fontSize: "13px",
  color: "#94a3b8",
  marginTop: "4px",
};

const removeBtn = {
  color: "#f87171",
  cursor: "pointer",
  fontWeight: "bold",
};

const taskHeading = {
  marginBottom: "22px",
  position: "relative",
  zIndex: 2,
};

const kanban = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "24px",
  position: "relative",
  zIndex: 2,
};

const column = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
  border:
    "1px solid rgba(255,255,255,0.08)",
  borderRadius: "30px",
  padding: "22px",
  backdropFilter: "blur(28px)",
  boxShadow:
    "0 25px 60px rgba(0,0,0,0.28)",
};

const columnHeader = {
  display: "flex",
  justifyContent: "space-between",
  padding: "14px 18px",
  borderRadius: "16px",
  marginBottom: "20px",
  fontWeight: "600",
  fontSize: "14px",
};

const taskCard = {
  position: "relative",
  background:
    "rgba(255,255,255,0.05)",
  borderRadius: "24px",
  padding: "22px",
  marginBottom: "18px",
  transition: "all 0.3s ease",
  backdropFilter: "blur(18px)",
  boxShadow:
    "0 15px 35px rgba(0,0,0,0.18)",
};

const deleteTaskBtn = {
  position: "absolute",
  top: "12px",
  right: "14px",
  cursor: "pointer",
  width: "34px",
  height: "34px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "rgba(239,68,68,0.08)",
};

const taskDesc = {
  color: "#94a3b8",
  fontSize: "14px",
  lineHeight: "1.8",
  marginTop: "10px",
};

const taskFooter = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "18px",
  fontSize: "12px",
  color: "#94a3b8",
  gap: "10px",
  flexWrap: "wrap",
};

const selectStyle = {
  width: "100%",
  marginTop: "18px",
  padding: "15px 16px",
  borderRadius: "16px",
  background:
    "rgba(255,255,255,0.04)",
  color: "white",
  border:
    "1px solid rgba(255,255,255,0.08)",
  outline: "none",
  backdropFilter: "blur(14px)",
  appearance: "none",
  cursor: "pointer",
  backgroundImage: `
    linear-gradient(45deg, transparent 50%, #ff00ff 50%),
    linear-gradient(135deg, #ff00ff 50%, transparent 50%)
  `,
  backgroundPosition:
    "calc(100% - 20px) calc(50% - 3px), calc(100% - 14px) calc(50% - 3px)",
  backgroundSize: "6px 6px, 6px 6px",
  backgroundRepeat: "no-repeat",
  paddingRight: "40px",
};

export default ProjectDetails;