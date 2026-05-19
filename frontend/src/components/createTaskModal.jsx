import API from "../utils/api";
import {
  useMemo,
  useState,
  useEffect,
} from "react";

const CreateTaskModal = ({
  onClose,
  members,
  projectId,
  onTaskCreated,
}) => {
  const [title, setTitle] =
    useState("");

  const [desc, setDesc] =
    useState("");

  const [assignee, setAssignee] =
    useState("");

  const [memberSearch, setMemberSearch] =
    useState("");

  const [date, setDate] =
    useState("");

  // LOCK SCROLL
  useEffect(() => {
    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, []);

  // FILTER MEMBERS
  const filteredMembers =
    useMemo(() => {
      return members.filter((m) =>
        m.name
          ?.toLowerCase()
          .includes(
            memberSearch.toLowerCase()
          )
      );
    }, [members, memberSearch]);

  // CREATE TASK
  const handleSubmit =
    async () => {
      if (!title || !assignee) {
        alert(
          "Title and Assignee are required"
        );

        return;
      }

      try {
        const res =
          await API.post(
            "/tasks/create",
            {
              title,

              description:
                desc,

              project:
                projectId,

              assignedTo:
                assignee,

              dueDate: date,
            }
          );

        alert(
          "Task created successfully"
        );

        if (onTaskCreated) {
          onTaskCreated(
            res.data.task
          );
        }

        onClose();
      } catch (err) {
        console.log(
          err.response?.data || err
        );

        alert(
          err.response?.data
            ?.message ||
            "Failed to create task"
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

        {/* SCROLL */}
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
                TASK MANAGEMENT
              </p>

              <h2 style={titleStyle}>
                Create New Task
              </h2>

              <p style={subText}>
                Assign tasks to your
                team efficiently.
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

          {/* TITLE */}
          <div style={fieldGroup}>
            <label style={label}>
              Task Title
            </label>

            <input
              placeholder="Enter task title..."
              value={title}
              onChange={(e) =>
                setTitle(
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
              placeholder="Describe the task..."
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

          {/* ROW */}
          <div style={row}>
            {/* MEMBER */}
            <div style={{ flex: 1 }}>
              <label style={label}>
                Assign Member
              </label>

              <input
                type="text"
                placeholder="Search member..."
                value={memberSearch}
                onChange={(e) =>
                  setMemberSearch(
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

              {/* SELECTED */}
              {assignee && (
                <div
                  style={
                    selectedContainer
                  }
                >
                  {(() => {
                    const member =
                      members.find(
                        (m) =>
                          m._id ===
                          assignee
                      );

                    if (!member)
                      return null;

                    return (
                      <div
                        style={
                          selectedItem
                        }
                      >
                        <span>
                          {
                            member.name
                          }
                        </span>

                        <span
                          onClick={() =>
                            setAssignee(
                              ""
                            )
                          }
                          style={
                            removeBtn
                          }
                        >
                          ✕
                        </span>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* MEMBER LIST */}
              <div
                style={
                  memberDropdown
                }
              >
                {filteredMembers.length ===
                0 ? (
                  <div
                    style={
                      emptyMember
                    }
                  >
                    No members found
                  </div>
                ) : (
                  filteredMembers.map(
                    (m) => {
                      const selected =
                        assignee ===
                        m._id;

                      return (
                        <div
                          key={m._id}
                          onClick={() => {
                            setAssignee(
                              m._id
                            );

                            setMemberSearch(
                              m.name
                            );
                          }}
                          style={{
                            ...memberItem,

                            background:
                              selected
                                ? "rgba(255,0,255,0.12)"
                                : "transparent",
                          }}
                          onMouseEnter={(
                            e
                          ) => {
                            if (
                              assignee !==
                              m._id
                            ) {
                              e.currentTarget.style.background =
                                "rgba(255,255,255,0.05)";
                            }
                          }}
                          onMouseLeave={(
                            e
                          ) => {
                            if (
                              assignee !==
                              m._id
                            ) {
                              e.currentTarget.style.background =
                                "transparent";
                            }
                          }}
                        >
                          <div
                            style={
                              memberAvatar
                            }
                          >
                            {m.name?.charAt(
                              0
                            )}
                          </div>

                          <div>
                            <div
                              style={{
                                color:
                                  "white",
                                fontWeight:
                                  "600",
                              }}
                            >
                              {
                                m.name
                              }
                            </div>

                            <div
                              style={{
                                color:
                                  "#94a3b8",
                                fontSize:
                                  "12px",
                              }}
                            >
                              {
                                m.email
                              }
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )
                )}
              </div>
            </div>

            {/* DATE */}
            <div style={{ flex: 1 }}>
              <label style={label}>
                Due Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(
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
          </div>
        </div>

        {/* BUTTONS */}
        <div style={buttonRow}>
          <button
            onClick={onClose}
            style={cancelBtn}
            onMouseEnter={(e) => {
              e.target.style.transform =
                "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform =
                "translateY(0px)";
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
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
            Create Task
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
  backdropFilter: "blur(18px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  padding: "20px",
};

const modalStyle = {
  width: "100%",
  maxWidth: "680px",
  height: "88vh",

  background:
    "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",

  borderRadius: "32px",

  padding: "30px",

  border:
    "1px solid rgba(255,255,255,0.10)",

  backdropFilter: "blur(30px)",

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
  marginBottom: "26px",
};

const smallText = {
  fontSize: "12px",
  letterSpacing: "5px",
  color: "#ff00ff",
  textTransform: "uppercase",
};

const titleStyle = {
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
  backdropFilter: "blur(12px)",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
  transition: "all 0.3s ease",
};

const fieldGroup = {
  marginBottom: "16px",
};

const label = {
  display: "block",
  marginBottom: "10px",
  color: "white",
  fontSize: "14px",
  fontWeight: "500",
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

  backdropFilter: "blur(14px)",
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

  backdropFilter: "blur(14px)",
};

const row = {
  display: "flex",
  gap: "14px",
  marginBottom: "20px",
};

const memberDropdown = {
  marginTop: "12px",

  borderRadius: "18px",

  overflow: "hidden",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(8,8,15,0.92)",

  maxHeight: "180px",

  overflowY: "auto",

  backdropFilter: "blur(14px)",
};

const memberItem = {
  padding: "16px",

  display: "flex",

  alignItems: "center",

  gap: "14px",

  cursor: "pointer",

  transition: "all 0.25s ease",

  borderBottom:
    "1px solid rgba(255,255,255,0.04)",
};

const memberAvatar = {
  width: "40px",
  height: "40px",

  borderRadius: "12px",

  background:
    "linear-gradient(135deg, #ff00ff, #a855f7)",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  color: "white",

  fontWeight: "600",
};

const selectedContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "14px",
  marginBottom: "14px",
};

const selectedItem = {
  display: "flex",
  alignItems: "center",
  gap: "8px",

  padding: "10px 14px",

  borderRadius: "14px",

  background:
    "rgba(255,0,255,0.12)",

  color: "#ff00ff",

  fontSize: "13px",

  fontWeight: "600",

  border:
    "1px solid rgba(255,0,255,0.15)",

  backdropFilter: "blur(10px)",
};

const removeBtn = {
  cursor: "pointer",
  color: "#f87171",
  fontWeight: "bold",
};

const emptyMember = {
  padding: "16px",
  textAlign: "center",
  color: "#94a3b8",
};

const buttonRow = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "14px",
};

const cancelBtn = {
  padding: "14px 22px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background:
    "rgba(255,255,255,0.05)",

  color: "white",

  cursor: "pointer",

  transition: "all 0.3s ease",

  backdropFilter: "blur(12px)",
};

const createBtn = {
  padding: "14px 24px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.10)",

  background:
    "linear-gradient(135deg, #ff00ff, #a855f7)",

  color: "white",

  cursor: "pointer",

  fontWeight: "600",

  transition: "all 0.3s ease",

  boxShadow:
    "0 10px 30px rgba(255,0,255,0.25)",
};

export default CreateTaskModal;