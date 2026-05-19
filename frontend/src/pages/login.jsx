import API from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [stats, setStats] = useState({
    users: 0,
    projects: 0,
    members: 0,
  });

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (location.state?.message) {
      alert(location.state.message);
    }

    const fetchStats = async () => {
      try {
        const res = await API.get("/stats");

        setStats({
          users: res.data.users,
          projects: res.data.projects,
          members: res.data.members,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, [location]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const inputStyle = {
    padding: "16px 18px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.08)",
    outline: "none",
    marginBottom: "20px",
    fontSize: "15px",
    background: "rgba(255,255,255,0.03)",
    color: "white",
    transition: "all 0.3s ease",
    width: "100%",
    boxSizing: "border-box",
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
      {/* PINK GLOW */}
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

      {/* PURPLE GLOW */}
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

      {/* CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "1120px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          background: "rgba(8,8,15,0.72)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,0,255,0.15)",
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(255,0,255,0.08)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LEFT SECTION */}
        {!isMobile && (
          <div
            style={{
              padding: "60px",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background:
                "linear-gradient(160deg, rgba(255,0,255,0.06), rgba(0,0,0,0.45))",
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
              — Intelligent Workspace Platform —
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
                  fontSize: "28px",
                  fontWeight: "300",
                  letterSpacing: "3px",
                }}
              >
                TASKORBIT
              </h2>
            </div>

            {/* MAIN TEXT */}
            <h1
              style={{
                fontSize: "58px",
                lineHeight: "1.15",
                marginBottom: "24px",
                fontWeight: "300",
                color: "#ffffff",
                letterSpacing: "-2px",
              }}
            >
              Smarter teams
              <br />
              build better
              <br />
              <span
                style={{
                  color: "#ff00ff",
                  fontStyle: "italic",
                }}
              >
                workflows.
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
              Organize projects, collaborate with your team, and manage work
              seamlessly inside a futuristic productivity workspace.
            </p>

            {/* STATS */}
            <div
              style={{
                display: "flex",
                gap: "50px",
                marginTop: "50px",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "32px",
                    fontWeight: "300",
                  }}
                >
                  {stats.users}+
                </h3>

                <p
                  style={{
                    color: "#94a3b8",
                    marginTop: "8px",
                  }}
                >
                  Active Users
                </p>
              </div>

              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "32px",
                    fontWeight: "300",
                  }}
                >
                  {stats.projects}+
                </h3>

                <p
                  style={{
                    color: "#94a3b8",
                    marginTop: "8px",
                  }}
                >
                  Projects
                </p>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT SECTION */}
        <div
          style={{
            background: "rgba(5,5,10,0.92)",
            padding: isMobile ? "36px 24px" : "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* SMALL LABEL */}
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
            Welcome Back
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
            Sign In
          </h1>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "40px",
              fontSize: "16px",
              lineHeight: "1.8",
            }}
          >
            Access your dashboard and continue managing your projects.
          </p>

          {/* EMAIL */}
          <label
            style={{
              marginBottom: "8px",
              fontWeight: "500",
              color: "#cbd5e1",
              fontSize: "14px",
              letterSpacing: "1px",
            }}
          >
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
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
          <label
            style={{
              marginBottom: "8px",
              fontWeight: "500",
              color: "#cbd5e1",
              fontSize: "14px",
              letterSpacing: "1px",
            }}
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
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

          {/* OPTIONS */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "4px",
              fontSize: "14px",
              color: "#94a3b8",
            }}
          >
            <span>Remember me</span>

            <span
              style={{
                color: "#ff00ff",
                cursor: "pointer",
              }}
            >
              Forgot password?
            </span>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              marginTop: "36px",
              background:
                "linear-gradient(135deg, #ff00ff, #a855f7)",
              color: "white",
              padding: "17px",
              border: "none",
              borderRadius: "14px",
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
            Sign In →
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
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{
                color: "#ff00ff",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;