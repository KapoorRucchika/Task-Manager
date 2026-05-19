import { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    title: "",
    project: "",
    assigned: "",
    status: "",
    dueDate: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/", {
        state: { message: "Please login first" },
      });
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const storedUser = JSON.parse(
          localStorage.getItem("user")
        );

        setUser(storedUser);

        const statsRes = await API.get(
          "/tasks/dashboard/stats"
        );

        setStats({
          total: statsRes.data?.total || 0,
          completed:
            statsRes.data?.completed || 0,
          pending:
            statsRes.data?.pending || 0,
          overdue:
            statsRes.data?.overdue || 0,
        });

        if (
          storedUser?.role === "Admin"
        ) {
          const allTaskRes =
            await API.get("/tasks/all");

          setAllTasks(
            allTaskRes.data.tasks || []
          );
        } else {
          const taskRes =
            await API.get("/tasks/my");

          setTasks(
            taskRes.data.tasks || []
          );
        }
      } catch (err) {
        console.error(err);

        if (
          err.response?.status === 401
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

    if (token) fetchData();
  }, [token, navigate]);

  const displayTasks =
    user?.role === "Admin"
      ? allTasks
      : tasks;

  const filteredTasks =
    displayTasks.filter((task) => {
      const isOverdue =
        task.dueDate &&
        new Date(task.dueDate) <
        new Date() &&
        task.status !== "Completed";

      const displayStatus =
        isOverdue
          ? "Overdue"
          : task.status;

      return (
        task.title
          ?.toLowerCase()
          .includes(
            filters.title.toLowerCase()
          ) &&
        task.project?.name
          ?.toLowerCase()
          .includes(
            filters.project.toLowerCase()
          ) &&
        (
          task.assignedTo?.name || ""
        )
          .toLowerCase()
          .includes(
            filters.assigned.toLowerCase()
          ) &&
        displayStatus
          .toLowerCase()
          .includes(
            filters.status.toLowerCase()
          ) &&
        (filters.dueDate === "" ||
          (task.dueDate &&
            new Date(task.dueDate)
              .toISOString()
              .split("T")[0] ===
            filters.dueDate))
      );
    });

  const columnTemplate =
    user?.role === "Admin"
      ? "2fr 1fr 1fr 1fr"
      : "2fr 1fr 1fr";

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
            <p style={welcomeText}>
              WELCOME BACK
            </p>

            <h1 style={heading}>
              Dashboard
            </h1>

            <p style={subHeading}>
              Manage your projects and
              tasks efficiently,{" "}
              {user?.name}
            </p>
          </div>

          <button
            style={primaryBtn}
            onClick={() =>
              navigate("/projects")
            }
            onMouseEnter={(e) => {
              e.target.style.transform =
                "translateY(-3px)";
              e.target.style.boxShadow =
                "0 16px 35px rgba(255,0,255,0.45)";
              e.target.style.background =
                "linear-gradient(135deg, #ff33ff, #c084fc)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform =
                "translateY(0px)";
              e.target.style.boxShadow =
                "0 10px 30px rgba(255,0,255,0.35)";
              e.target.style.background =
                "linear-gradient(135deg, #ff00ff, #a855f7)";
            }}
          >
            View Projects →
          </button>
        </div>

        {/* STATS */}
        <div style={statsGrid}>
          {[
            {
              label: "TOTAL TASKS",
              value: stats.total,
            },
            {
              label: "COMPLETED",
              value: stats.completed,
            },
            {
              label: "PENDING",
              value: stats.pending,
            },
            {
              label: "OVERDUE",
              value: stats.overdue,
            },
          ].map((item, i) => (
            <div
              key={i}
              style={statCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 25px 60px rgba(255,0,255,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 60px rgba(0,0,0,0.45)";
              }}
            >
              <p style={smallText}>
                {item.label}
              </p>

              <h2 style={statNumber}>
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* TASK BOX */}
        <div style={taskBox}>
          {/* HEADER */}
          <div style={taskHeader}>
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "white",
                  fontWeight: "400",
                }}
              >
                {user?.role === "Admin"
                  ? "All Tasks"
                  : "My Tasks"}
              </h2>

              <p
                style={{
                  color: "#94a3b8",
                }}
              >
                {
                  filteredTasks.length
                }{" "}
                Tasks Available
              </p>
            </div>
          </div>

          {/* FILTERS */}
          <div style={filterBox}>
            <input
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
              placeholder="🔍 Search title..."
              value={filters.title}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  title: e.target.value,
                })
              }
              style={filterInput}
            />

            <input
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
              placeholder="📁 Project name..."
              value={filters.project}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  project: e.target.value,
                })
              }
              style={filterInput}
            />

            {user?.role === "Admin" && (
              <input
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
                placeholder="👤 Assigned member..."
                value={filters.assigned}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    assigned:
                      e.target.value,
                  })
                }
                style={filterInput}
              />
            )}

            <input
              type="date"
              value={filters.dueDate}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  dueDate: e.target.value,
                })
              }
              style={filterInput}
            />

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  status: e.target.value,
                })
              }
              style={{
                ...filterInput,
                background:
                  "rgba(255,255,255,0.03)",
                color: "white",
                cursor: "pointer",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                border:
                  "1px solid rgba(255,255,255,0.08)",

                backgroundImage: `
    linear-gradient(45deg, transparent 50%, #ff00ff 50%),
    linear-gradient(135deg, #ff00ff 50%, transparent 50%)
  `,

                backgroundPosition:
                  "calc(100% - 20px) calc(50% - 3px), calc(100% - 14px) calc(50% - 3px)",

                backgroundSize: "6px 6px, 6px 6px",

                backgroundRepeat: "no-repeat",

                paddingRight: "40px",
              }}
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
              <option value="">
                📌 All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Overdue">
                Overdue
              </option>
            </select>

            <button
              onClick={() =>
                setFilters({
                  title: "",
                  project: "",
                  assigned: "",
                  status: "",
                  dueDate: "",
                })
              }
              style={clearBtn}
            >
              Clear
            </button>
          </div>

          {/* TABLE HEADER */}
          <div
            style={{
              ...tableHeader,
              gridTemplateColumns:
                columnTemplate,
            }}
          >
            <span>Title</span>

            {user?.role ===
              "Admin" && (
                <span>Assigned</span>
              )}

            <span>Due Date</span>

            <span>Status</span>
          </div>

          {/* TASKS */}
          {filteredTasks.map((t) => {
            const isOverdue =
              t.dueDate &&
              new Date(t.dueDate) <
              new Date() &&
              t.status !==
              "Completed";

            const displayStatus =
              isOverdue
                ? "Overdue"
                : t.status;

            return (
              <div
                key={t._id}
                style={{
                  ...taskItem,
                  gridTemplateColumns:
                    columnTemplate,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "transparent";
                }}
              >
                <div
                  style={{
                    overflow:
                      "hidden",
                  }}
                >
                  <strong
                    style={
                      titleStyle
                    }
                  >
                    {t.title}
                  </strong>

                  <p style={subText}>
                    {
                      t.project
                        ?.name
                    }
                  </p>
                </div>

                {user?.role ===
                  "Admin" && (
                    <span
                      style={{
                        color:
                          "#cbd5e1",
                      }}
                    >
                      {t.assignedTo
                        ?.name ||
                        "Unassigned"}
                    </span>
                  )}

                <span
                  style={{
                    color:
                      "#cbd5e1",
                  }}
                >
                  {t.dueDate
                    ? new Date(
                      t.dueDate
                    ).toLocaleDateString()
                    : "-"}
                </span>

                <span
                  style={statusBadge(
                    displayStatus
                  )}
                >
                  {displayStatus}
                </span>
              </div>
            );
          })}
        </div>
      </div>
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
  fontFamily: "'Poppins', sans-serif",
  position: "relative",
  overflow: "hidden",
};

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "45px",
  position: "relative",
  zIndex: 2,
};

const welcomeText = {
  letterSpacing: "5px",
  fontSize: "12px",
  color: "#ff00ff",
  marginBottom: "10px",
};

const heading = {
  fontSize: "62px",
  margin: 0,
  color: "white",
  fontWeight: "300",
  letterSpacing: "-3px",
};

const subHeading = {
  color: "#94a3b8",
  marginTop: "14px",
  fontSize: "16px",
};

const primaryBtn = {
  padding: "16px 28px",
  background:
    "linear-gradient(135deg, #ff00ff, #a855f7)",
  color: "white",
  border: "none",
  borderRadius: "14px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow:
    "0 10px 30px rgba(255,0,255,0.35)",
  transition: "all 0.3s ease",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px,1fr))",
  gap: "22px",
  marginBottom: "38px",
};

const statCard = {
  padding: "34px",
  borderRadius: "24px",
  background:
    "rgba(8,8,15,0.72)",
  border:
    "1px solid rgba(255,0,255,0.12)",
  backdropFilter: "blur(24px)",
  boxShadow:
    "0 20px 60px rgba(0,0,0,0.45)",
  transition: "all 0.3s ease",
};

const statNumber = {
  color: "white",
  fontSize: "46px",
  margin: "14px 0 0",
  fontWeight: "300",
};

const taskBox = {
  borderRadius: "28px",
  overflow: "hidden",
  background:
    "rgba(8,8,15,0.72)",
  border:
    "1px solid rgba(255,0,255,0.12)",
  backdropFilter: "blur(24px)",
  boxShadow:
    "0 25px 60px rgba(0,0,0,0.45)",
};

const taskHeader = {
  padding: "28px 34px",
  borderBottom:
    "1px solid rgba(255,255,255,0.06)",
};

const filterBox = {
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(240px, 1fr))",

  gap: "18px",

  padding: "26px 34px",

  background:
    "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",

  borderBottom:
    "1px solid rgba(255,255,255,0.06)",

  alignItems: "stretch",

  width: "100%",

  boxSizing: "border-box",
};

const filterInput = {
  width: "100%",

  minWidth: "0",

  height: "52px",

  padding: "0 16px",

  borderRadius: "14px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(255,255,255,0.03)",

  color: "white",

  outline: "none",

  fontSize: "14px",

  boxSizing: "border-box",

  backdropFilter: "blur(10px)",

  transition: "all 0.3s ease",

  appearance: "none",
};

const tableHeader = {
  display: "grid",
  padding: "20px 34px",
  background:
    "rgba(255,255,255,0.03)",
  color: "#ff00ff",
  fontWeight: "500",
  letterSpacing: "1px",
  textTransform: "uppercase",
  fontSize: "12px",
};

const taskItem = {
  display: "grid",
  padding: "24px 34px",
  borderTop:
    "1px solid rgba(255,255,255,0.05)",
  alignItems: "center",
  transition: "all 0.25s ease",
};

const titleStyle = {
  display: "block",
  color: "white",
  fontSize: "16px",
  marginBottom: "6px",
};

const subText = {
  fontSize: "13px",
  color: "#94a3b8",
};

const smallText = {
  fontSize: "12px",
  color: "#ff00ff",
  letterSpacing: "3px",
};

const clearBtn = {
  width: "100%",

  height: "52px",

  padding: "0 20px",

  borderRadius: "14px",

  border:
    "1px solid rgba(255,0,255,0.15)",

  background:
    "rgba(255,0,255,0.08)",

  color: "#ff00ff",

  fontSize: "14px",

  fontWeight: "500",

  cursor: "pointer",

  boxSizing: "border-box",

  transition: "0.3s ease",
};

const statusBadge = (status) => ({
  padding: "8px 14px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "500",
  width: "fit-content",

  background:
    status === "Completed"
      ? "rgba(34,197,94,0.12)"
      : status ===
        "In Progress"
        ? "rgba(255,0,255,0.12)"
        : status === "Overdue"
          ? "rgba(239,68,68,0.12)"
          : "rgba(250,204,21,0.12)",

  color:
    status === "Completed"
      ? "#4ade80"
      : status ===
        "In Progress"
        ? "#ff00ff"
        : status === "Overdue"
          ? "#f87171"
          : "#fde047",
});

export default Dashboard;