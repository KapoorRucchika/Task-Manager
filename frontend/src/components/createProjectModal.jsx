import { useEffect, useState } from "react";
import API from "../utils/api";

const CreateProjectModal = ({
  onClose,
}) => {
  const [name, setName] =
    useState("");

  const [desc, setDesc] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [users, setUsers] =
    useState([]);

  const [
    selectedMembers,
    setSelectedMembers,
  ] = useState([]);

  // LOCK SCROLL
  useEffect(() => {
    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, []);

  // FETCH USERS
  useEffect(() => {
    const fetchUsers =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          const { data } =
            await API.get(
              "/users",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          setUsers(data.users);
        } catch (err) {
          console.error(
            "Error fetching users",
            err
          );
        }
      };

    fetchUsers();
  }, []);

  // FILTER USERS
  const filteredUsers =
    users.filter((user) =>
      user.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // ADD MEMBER
  const addMember = (user) => {
    if (
      !selectedMembers.some(
        (m) => m._id === user._id
      )
    ) {
      setSelectedMembers([
        ...selectedMembers,
        user,
      ]);
    }
  };

  // REMOVE MEMBER
  const removeMember = (id) => {
    setSelectedMembers(
      selectedMembers.filter(
        (m) => m._id !== id
      )
    );
  };

  // CREATE PROJECT
  const handleCreate =
    async () => {
      if (!name) {
        alert(
          "Project name is required"
        );

        return;
      }

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/projects/create",
          {
            name,

            description:
              desc,

            members:
              selectedMembers.map(
                (m) => m._id
              ),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        onClose();

        window.location.href =
          "/projects";
      } catch (err) {
        console.log(
          "ERROR:",
          err.response?.data
        );

        alert(
          err.response?.data
            ?.message ||
            "Failed to create project"
        );
      }
    };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* GLOW EFFECTS */}
        <div
          style={{
            position: "absolute",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            background:
              "rgba(255,0,255,0.15)",
            filter: "blur(120px)",
            top: "-90px",
            right: "-90px",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background:
              "rgba(168,85,247,0.12)",
            filter: "blur(100px)",
            bottom: "-70px",
            left: "-70px",
            zIndex: 0,
          }}
        />

        {/* SCROLL AREA */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingRight: "6px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* HEADER */}
          <div style={header}>
            <div>
              <p style={smallText}>
                PROJECT SPACE
              </p>

              <h2 style={title}>
                Create Project
              </h2>

              <p style={subText}>
                Start a futuristic
                collaborative workspace
                for your team.
              </p>
            </div>

            <button
              onClick={onClose}
              style={closeBtn}
              onMouseEnter={(e) => {
                e.target.style.transform =
                  "rotate(90deg)";
                e.target.style.background =
                  "rgba(255,0,255,0.12)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform =
                  "rotate(0deg)";
                e.target.style.background =
                  "rgba(255,255,255,0.05)";
              }}
            >
              ✕
            </button>
          </div>

          {/* NAME */}
          <div style={fieldGroup}>
            <label style={label}>
              Project Name
            </label>

            <input
              placeholder="Enter project name..."
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              style={inputStyle}
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
            />
          </div>

          {/* DESCRIPTION */}
          <div style={fieldGroup}>
            <label style={label}>
              Description
            </label>

            <textarea
              rows="4"
              placeholder="Describe your project..."
              value={desc}
              onChange={(e) =>
                setDesc(
                  e.target.value
                )
              }
              style={textareaStyle}
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
            />
          </div>

          {/* MEMBERS */}
          <div style={fieldGroup}>
            <label style={label}>
              Team Members
            </label>

            {/* SEARCH */}
            <input
              placeholder="Search members..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              style={inputStyle}
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
            />

            {/* USER LIST */}
            <div style={userList}>
              {filteredUsers.map(
                (user) => {
                  const alreadyAdded =
                    selectedMembers.some(
                      (m) =>
                        m._id ===
                        user._id
                    );

                  return (
                    <div
                      key={user._id}
                      style={{
                        ...userItem,

                        opacity:
                          alreadyAdded
                            ? 0.5
                            : 1,

                        cursor:
                          alreadyAdded
                            ? "not-allowed"
                            : "pointer",
                      }}
                      onClick={() =>
                        !alreadyAdded &&
                        addMember(user)
                      }
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-4px)";

                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.08)";

                        e.currentTarget.style.border =
                          "1px solid rgba(255,0,255,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0px)";

                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.04)";

                        e.currentTarget.style.border =
                          "1px solid rgba(255,255,255,0.06)";
                      }}
                    >
                      {/* LEFT */}
                      <div
                        style={{
                          display:
                            "flex",

                          alignItems:
                            "center",

                          gap: "14px",
                        }}
                      >
                        <div
                          style={
                            avatar
                          }
                        >
                          {user.name?.charAt(
                            0
                          )}
                        </div>

                        <div>
                          <strong
                            style={{
                              color:
                                "white",
                              fontWeight:
                                "500",
                            }}
                          >
                            {
                              user.name
                            }
                          </strong>

                          <p
                            style={
                              emailText
                            }
                          >
                            {
                              user.email
                            }
                          </p>
                        </div>
                      </div>

                      {/* BUTTON */}
                      <div
                        style={{
                          ...addBadge,

                          background:
                            alreadyAdded
                              ? "rgba(255,255,255,0.08)"
                              : "rgba(255,0,255,0.12)",

                          color:
                            alreadyAdded
                              ? "#94a3b8"
                              : "#ff00ff",
                        }}
                      >
                        {alreadyAdded
                          ? "Added"
                          : "+ Add"}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* SELECTED MEMBERS */}
          {selectedMembers.length >
            0 && (
              <div
                style={
                  selectedContainer
                }
              >
                {selectedMembers.map(
                  (m) => (
                    <div
                      key={m._id}
                      style={
                        selectedItem
                      }
                    >
                      <span>
                        {m.name}
                      </span>

                      <span
                        onClick={() =>
                          removeMember(
                            m._id
                          )
                        }
                        style={
                          removeBtn
                        }
                      >
                        ✕
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
        </div>

        {/* BUTTONS */}
        <div style={buttonRow}>
          <button
            onClick={onClose}
            style={cancelBtn}
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            style={createBtn}
            onMouseEnter={(e) => {
              e.target.style.transform =
                "translateY(-3px)";

              e.target.style.boxShadow =
                "0 18px 40px rgba(255,0,255,0.35)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform =
                "translateY(0px)";

              e.target.style.boxShadow =
                "0 10px 30px rgba(255,0,255,0.25)";
            }}
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",

  top: 0,

  left: 0,

  width: "100%",

  height: "100%",

  background:
    "rgba(2,6,23,0.78)",

  backdropFilter:
    "blur(18px)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  zIndex: 1000,

  padding: "20px",
};

const modalStyle = {
  width: "100%",

  maxWidth: "600px",

  height: "88vh",

  background:
    "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",

  borderRadius: "32px",

  padding: "32px",

  border:
    "1px solid rgba(255,255,255,0.10)",

  backdropFilter:
    "blur(30px)",

  WebkitBackdropFilter:
    "blur(30px)",

  boxShadow:
    "0 30px 80px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.06)",

  fontFamily:
    "'Poppins', sans-serif",

  position: "relative",

  overflow: "hidden",

  display: "flex",

  flexDirection: "column",
};

const header = {
  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "flex-start",

  marginBottom: "32px",
};

const smallText = {
  fontSize: "12px",

  letterSpacing: "5px",

  color: "#ff00ff",

  textTransform:
    "uppercase",
};

const title = {
  color: "white",

  fontSize: "42px",

  margin: "10px 0 8px",

  fontWeight: "300",

  letterSpacing: "-2px",
};

const subText = {
  color: "#94a3b8",

  lineHeight: "1.8",

  fontSize: "15px",
};

const closeBtn = {
  width: "48px",

  height: "48px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(255,255,255,0.05)",

  backdropFilter:
    "blur(12px)",

  color: "white",

  cursor: "pointer",

  fontSize: "16px",

  transition: "all 0.3s ease",
};

const fieldGroup = {
  marginBottom: "26px",
};

const label = {
  display: "block",

  marginBottom: "12px",

  color: "white",

  fontWeight: "500",

  fontSize: "14px",

  letterSpacing: "1px",
};

const inputStyle = {
  width: "100%",

  padding: "18px",

  borderRadius: "18px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(255,255,255,0.04)",

  color: "white",

  fontSize: "14px",

  outline: "none",

  boxSizing: "border-box",

  transition: "all 0.3s ease",

  backdropFilter:
    "blur(14px)",
};

const textareaStyle = {
  width: "100%",

  padding: "18px",

  borderRadius: "18px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(255,255,255,0.04)",

  color: "white",

  fontSize: "14px",

  outline: "none",

  resize: "none",

  boxSizing: "border-box",

  transition: "all 0.3s ease",

  backdropFilter:
    "blur(14px)",
};

const userList = {
  marginTop: "14px",

  maxHeight: "180px",

  overflowY: "auto",

  display: "flex",

  flexDirection: "column",

  gap: "12px",
};

const userItem = {
  padding: "18px",

  borderRadius: "20px",

  background:
    "rgba(255,255,255,0.04)",

  border:
    "1px solid rgba(255,255,255,0.06)",

  backdropFilter:
    "blur(14px)",

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  transition: "all 0.3s ease",
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

  boxShadow:
    "0 10px 25px rgba(255,0,255,0.25)",
};

const emailText = {
  fontSize: "13px",

  color: "#94a3b8",

  marginTop: "4px",
};

const addBadge = {
  padding: "9px 14px",

  borderRadius: "999px",

  fontSize: "12px",

  fontWeight: "600",

  border:
    "1px solid rgba(255,0,255,0.12)",
};

const selectedContainer = {
  marginTop: "14px",

  display: "flex",

  gap: "12px",

  flexWrap: "wrap",
};

const selectedItem = {
  display: "flex",

  alignItems: "center",

  gap: "10px",

  padding: "12px 16px",

  borderRadius: "16px",

  background:
    "rgba(255,0,255,0.12)",

  border:
    "1px solid rgba(255,0,255,0.15)",

  color: "#ff00ff",

  fontWeight: "500",

  fontSize: "14px",

  backdropFilter:
    "blur(12px)",
};

const removeBtn = {
  cursor: "pointer",

  color: "#f87171",

  fontWeight: "bold",
};

const buttonRow = {
  display: "flex",

  justifyContent:
    "flex-end",

  gap: "14px",

  marginTop: "30px",

  position: "relative",

  zIndex: 5,
};

const cancelBtn = {
  padding: "16px 24px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(255,255,255,0.05)",

  backdropFilter:
    "blur(12px)",

  color: "white",

  cursor: "pointer",

  fontWeight: "500",

  fontSize: "14px",

  transition: "all 0.3s ease",
};

const createBtn = {
  padding: "16px 28px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.10)",

  background:
    "linear-gradient(135deg, #ff00ff, #a855f7)",

  color: "white",

  cursor: "pointer",

  fontWeight: "600",

  fontSize: "14px",

  boxShadow:
    "0 10px 30px rgba(255,0,255,0.25)",

  transition: "all 0.3s ease",
};

export default CreateProjectModal;