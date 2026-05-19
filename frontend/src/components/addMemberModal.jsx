import { useEffect, useState } from "react";
import API from "../utils/api";

const AddMemberModal = ({
  onClose,
  currentMembers = [],
  onAdd,
  projectId,
}) => {
  const [search, setSearch] =
    useState("");

  const [users, setUsers] =
    useState([]);

  // FETCH USERS
  useEffect(() => {
    const fetchUsers =
      async () => {
        try {
          const { data } =
            await API.get("/users");

          setUsers(
            Array.isArray(data.users)
              ? data.users
              : []
          );
        } catch (error) {
          console.error(
            "Error fetching users",
            error
          );
        }
      };

    fetchUsers();
  }, []);

  // FILTER USERS
  const filteredUsers = (
    users || []
  ).filter((user) =>
    user.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

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
                TEAM MANAGEMENT
              </p>

              <h2 style={title}>
                Add Members
              </h2>

              <p style={subText}>
                Invite team members to
                collaborate on this
                project.
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

          {/* SEARCH */}
          <div style={searchBox}>
            <input
              placeholder="Search member..."
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
          </div>

          {/* USER LIST */}
          <div style={userList}>
            {filteredUsers.length ===
            0 ? (
              <div style={emptyBox}>
                <p>
                  No users found
                </p>
              </div>
            ) : (
              filteredUsers.map(
                (user) => {
                  const alreadyAdded =
                    currentMembers.some(
                      (m) =>
                        m._id ===
                        user._id
                    );

                  return (
                    <div
                      key={user._id}
                      style={
                        userCard
                      }
                      onMouseEnter={(
                        e
                      ) => {
                        e.currentTarget.style.transform =
                          "translateY(-5px)";

                        e.currentTarget.style.boxShadow =
                          "0 22px 45px rgba(255,0,255,0.10)";

                        e.currentTarget.style.border =
                          "1px solid rgba(255,0,255,0.15)";
                      }}
                      onMouseLeave={(
                        e
                      ) => {
                        e.currentTarget.style.transform =
                          "translateY(0px)";

                        e.currentTarget.style.boxShadow =
                          "0 12px 25px rgba(0,0,0,0.18)";

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
                        {/* AVATAR */}
                        <div
                          style={
                            avatar
                          }
                        >
                          {user.name?.charAt(
                            0
                          )}
                        </div>

                        {/* USER INFO */}
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
                      <button
                        disabled={
                          alreadyAdded
                        }
                        onClick={async () => {
                          try {
                            await API.put(
                              "/projects/add-member",
                              {
                                projectId,
                                userId:
                                  user._id,
                              }
                            );

                            alert(
                              "Member added"
                            );

                            onAdd &&
                              onAdd(
                                user
                              );
                          } catch (err) {
                            console.log(
                              err
                            );

                            alert(
                              "Failed to add member"
                            );
                          }
                        }}
                        style={{
                          ...addBtn,

                          background:
                            alreadyAdded
                              ? "rgba(255,255,255,0.08)"
                              : "linear-gradient(135deg, #ff00ff, #a855f7)",

                          color:
                            alreadyAdded
                              ? "#94a3b8"
                              : "white",

                          cursor:
                            alreadyAdded
                              ? "not-allowed"
                              : "pointer",

                          boxShadow:
                            alreadyAdded
                              ? "none"
                              : "0 10px 25px rgba(255,0,255,0.25)",
                        }}
                        onMouseEnter={(
                          e
                        ) => {
                          if (
                            !alreadyAdded
                          ) {
                            e.target.style.transform =
                              "translateY(-3px)";
                          }
                        }}
                        onMouseLeave={(
                          e
                        ) => {
                          e.target.style.transform =
                            "translateY(0px)";
                        }}
                      >
                        {alreadyAdded
                          ? "Added"
                          : "+ Add"}
                      </button>
                    </div>
                  );
                }
              )
            )}
          </div>
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
  maxWidth: "620px",
  height: "86vh",

  background:
    "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",

  borderRadius: "32px",

  padding: "32px",

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
  marginBottom: "30px",
};

const smallText = {
  fontSize: "12px",
  letterSpacing: "5px",
  color: "#ff00ff",
  textTransform: "uppercase",
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
  backdropFilter: "blur(12px)",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
  transition: "all 0.3s ease",
};

const searchBox = {
  marginBottom: "24px",
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

const userList = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const userCard = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",

  padding: "20px",

  borderRadius: "24px",

  background:
    "rgba(255,255,255,0.04)",

  border:
    "1px solid rgba(255,255,255,0.06)",

  backdropFilter: "blur(16px)",

  transition: "all 0.3s ease",

  boxShadow:
    "0 12px 25px rgba(0,0,0,0.18)",
};

const avatar = {
  width: "52px",
  height: "52px",

  borderRadius: "16px",

  background:
    "linear-gradient(135deg, #ff00ff, #a855f7)",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  color: "white",

  fontWeight: "600",

  fontSize: "20px",

  boxShadow:
    "0 10px 25px rgba(255,0,255,0.25)",
};

const emailText = {
  fontSize: "13px",
  color: "#94a3b8",
  marginTop: "5px",
};

const addBtn = {
  border: "none",

  padding: "13px 20px",

  borderRadius: "16px",

  fontWeight: "600",

  fontSize: "14px",

  transition: "all 0.3s ease",
};

const emptyBox = {
  height: "140px",

  borderRadius: "24px",

  background:
    "rgba(255,255,255,0.05)",

  border:
    "1px solid rgba(255,255,255,0.05)",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  color: "#94a3b8",

  backdropFilter: "blur(14px)",
};

export default AddMemberModal;