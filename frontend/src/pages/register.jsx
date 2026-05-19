import API from "../utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  const [loading, setLoading] = useState(false);

  const isMobile = window.innerWidth < 768;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (selectedRole) => {
    setForm({ ...form, role: selectedRole });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return alert("All fields are required");
    }

    if (!form.email.includes("@")) {
      return alert("Invalid email");
    }

    if (form.password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", form);

      alert(res.data.message);

      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "18px 18px",
    marginTop: "8px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.08)",
    outline: "none",
    fontSize: "15px",
    marginBottom: "20px",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
    background: "rgba(255,255,255,0.03)",
    color: "white",
    backdropFilter: "blur(10px)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
          linear-gradient(135deg, #020617 0%, #030712 40%, #000000 100%),
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "cover, 80px 80px, 80px 80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* GLOW EFFECTS */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "rgba(255,0,255,0.15)",
          filter: "blur(120px)",
          top: "-120px",
          right: "-120px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(168,85,247,0.12)",
          filter: "blur(120px)",
          bottom: "-120px",
          left: "-120px",
        }}
      />

      {/* MAIN CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "1120px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          background: "rgba(8,8,15,0.72)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,0,255,0.15)",
          borderRadius: "30px",
          overflow: "hidden",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(255,0,255,0.08)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LEFT SIDE */}
        {!isMobile && (
          <div
            style={{
              padding: "60px",
              color: "white",
              background:
                "linear-gradient(160deg, rgba(255,0,255,0.06), rgba(0,0,0,0.45))",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* TOP LABEL */}
            <div
              style={{
                color: "#ff00ff",
                letterSpacing: "6px",
                fontSize: "12px",
                marginBottom: "40px",
                textTransform: "uppercase",
              }}
            >
              — Future of Team Collaboration —
            </div>

            {/* LOGO */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  background: "rgba(255,0,255,0.12)",
                  color: "#ff00ff",
                  border: "1px solid rgba(255,0,255,0.3)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "600",
                  fontSize: "22px",
                  backdropFilter: "blur(10px)",
                }}
              >
                T
              </div>

              <h2
                style={{
                  margin: 0,
                  letterSpacing: "3px",
                  fontSize: "28px",
                  fontWeight: "300",
                }}
              >
                TASKBASE
              </h2>
            </div>

            {/* HEADING */}
            <h1
              style={{
                fontSize: "58px",
                lineHeight: "1.1",
                marginBottom: "24px",
                fontWeight: "300",
                letterSpacing: "-2px",
                color: "#ffffff",
              }}
            >
              Build modern
              <br />
              teams with
              <br />
              <span
                style={{
                  color: "#ff00ff",
                  fontStyle: "italic",
                }}
              >
                intelligence.
              </span>
            </h1>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "17px",
                lineHeight: "1.9",
                maxWidth: "500px",
              }}
            >
              Join thousands of users managing projects, collaborating faster,
              and creating smarter workflows with TaskBase.
            </p>

            {/* FLOATING CARDS */}
            <div
              style={{
                display: "flex",
                gap: "18px",
                marginTop: "40px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "18px",
                  padding: "20px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#94a3b8",
                    fontSize: "13px",
                  }}
                >
                  Productivity
                </p>

                <h2
                  style={{
                    margin: "10px 0 0 0",
                    fontSize: "30px",
                    fontWeight: "300",
                  }}
                >
                  +84%
                </h2>
              </div>

              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "18px",
                  padding: "20px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#94a3b8",
                    fontSize: "13px",
                  }}
                >
                  Team Growth
                </p>

                <h2
                  style={{
                    margin: "10px 0 0 0",
                    fontSize: "30px",
                    fontWeight: "300",
                  }}
                >
                  12K+
                </h2>
              </div>
            </div>

            {/* STATS */}
            <div
              style={{
                display: "flex",
                gap: "50px",
                marginTop: "35px",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "30px",
                    fontWeight: "300",
                  }}
                >
                  99.9%
                </h3>

                <p
                  style={{
                    color: "#94a3b8",
                    marginTop: "8px",
                  }}
                >
                  Uptime
                </p>
              </div>

              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "30px",
                    fontWeight: "300",
                  }}
                >
                  24/7
                </h3>

                <p
                  style={{
                    color: "#94a3b8",
                    marginTop: "8px",
                  }}
                >
                  Support
                </p>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT SIDE */}
        <div
          style={{
            background: "rgba(5,5,10,0.92)",
            padding: isMobile ? "36px 24px" : "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* TOP TEXT */}
          <p
            style={{
              letterSpacing: "5px",
              fontSize: "12px",
              color: "#ff00ff",
              fontWeight: "500",
              marginBottom: "14px",
              textTransform: "uppercase",
            }}
          >
            Create Account
          </p>

          {/* TITLE */}
          <h1
            style={{
              fontSize: "52px",
              margin: "0 0 14px 0",
              color: "#ffffff",
              fontWeight: "300",
              letterSpacing: "-2px",
            }}
          >
            Get Started
          </h1>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "38px",
              fontSize: "16px",
              lineHeight: "1.8",
            }}
          >
            Create your account and start managing projects in a futuristic
            workspace.
          </p>

          {/* NAME */}
          <label style={label}>Full Name</label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.border = "1px solid #ff00ff";
              e.target.style.boxShadow =
                "0 0 0 4px rgba(255,0,255,0.12)";
            }}
            onBlur={(e) => {
              e.target.style.border =
                "1px solid rgba(255,255,255,0.08)";
              e.target.style.boxShadow = "none";
            }}
          />

          {/* EMAIL */}
          <label style={label}>Email</label>

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.border = "1px solid #ff00ff";
              e.target.style.boxShadow =
                "0 0 0 4px rgba(255,0,255,0.12)";
            }}
            onBlur={(e) => {
              e.target.style.border =
                "1px solid rgba(255,255,255,0.08)";
              e.target.style.boxShadow = "none";
            }}
          />

          {/* PASSWORD */}
          <label style={label}>Password</label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.border = "1px solid #ff00ff";
              e.target.style.boxShadow =
                "0 0 0 4px rgba(255,0,255,0.12)";
            }}
            onBlur={(e) => {
              e.target.style.border =
                "1px solid rgba(255,255,255,0.08)";
              e.target.style.boxShadow = "none";
            }}
          />

          {/* ROLE */}
          <label style={label}>Select Role</label>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "10px",
            }}
          >
            {["Member", "Admin"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleChange(r)}
                style={{
                  flex: 1,
                  padding: "16px",
                  borderRadius: "14px",
                  border:
                    form.role === r
                      ? "1px solid #ff00ff"
                      : "1px solid rgba(255,255,255,0.08)",
                  background:
                    form.role === r
                      ? "linear-gradient(135deg, #ff00ff, #a855f7)"
                      : "rgba(255,255,255,0.03)",
                  color: "white",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (form.role !== r) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.border =
                      "1px solid rgba(255,0,255,0.35)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0px)";
                  if (form.role !== r) {
                    e.target.style.border =
                      "1px solid rgba(255,255,255,0.08)";
                  }
                }}
              >
                {r}
              </button>
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "34px",
              padding: "18px",
              borderRadius: "14px",
              border: "none",
              background:
                "linear-gradient(135deg, #ff00ff, #a855f7)",
              color: "white",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow:
                "0 10px 30px rgba(255,0,255,0.35)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.background =
                "linear-gradient(135deg, #ff33ff, #c084fc)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0px)";
              e.target.style.background =
                "linear-gradient(135deg, #ff00ff, #a855f7)";
            }}
          >
            {loading ? "Creating..." : "Create Account →"}
          </button>

          {/* FOOTER */}
          <p
            style={{
              marginTop: "30px",
              color: "#94a3b8",
              textAlign: "center",
              fontSize: "15px",
            }}
          >
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                color: "#ff00ff",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const label = {
  fontWeight: "500",
  color: "#cbd5e1",
  marginBottom: "5px",
  display: "block",
  fontSize: "14px",
  letterSpacing: "1px",
};

export default Register;