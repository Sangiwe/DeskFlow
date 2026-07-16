import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import "./LoginPage.css";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Employee",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    setError("");
  };

  const handleRoleChange = (role) => {
    setFormData({
      email: "",
      password: "",
      role,
    });

    setShowPassword(false);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await api.post("/auth/login", formData);

      const { token, user } = response.data;

      localStorage.setItem("deskflowToken", token);
      localStorage.setItem(
        "deskflowUser",
        JSON.stringify(user)
      );

      if (user.role === "Admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/employee", { replace: true });
      }
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        "Unable to connect to DeskFlow. Please try again.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-shell">
        <div className="login-brand-panel">
          <div className="brand-top">
            <div className="brand-mark">DF</div>
            <span className="brand-name">DeskFlow</span>
          </div>

          <div className="brand-content">
            <span className="eyebrow">Internal IT operations</span>

            <h1>
              Support requests,
              <span> without the noise.</span>
            </h1>

            <p>
              A focused workspace for employees to report technical issues and
              for IT teams to manage resolutions efficiently.
            </p>
          </div>

          <div className="brand-footer">
            <span className="status-dot"></span>
            Secure internal portal
          </div>
        </div>

        <div className="login-form-panel">
          <div className="login-form-wrapper">
            <div className="mobile-brand">
              <div className="brand-mark">DF</div>
              <span className="brand-name">DeskFlow</span>
            </div>

            <div className="form-heading">
              <span className="eyebrow">Welcome back</span>
              <h2>Sign in to your workspace</h2>
              <p>Select your role.</p>
            </div>

            <div className="role-selector" aria-label="Select account role">
              <button
                type="button"
                className={
                  formData.role === "Employee"
                    ? "role-button active"
                    : "role-button"
                }
                onClick={() => handleRoleChange("Employee")}
              >
                Employee
              </button>

              <button
                type="button"
                className={
                  formData.role === "Admin"
                    ? "role-button active"
                    : "role-button"
                }
                onClick={() => handleRoleChange("Admin")}
              >
                Administrator
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label htmlFor="email">Email address</label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="off"
                />
              </div>

              <div className="form-field">
                <label htmlFor="password">Password</label>

                <div className="password-input-wrapper">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="off"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword((currentValue) => !currentValue)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
             </div>

              {error && (
                <div className="login-error" role="alert">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="login-submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : `Continue as ${formData.role}`}
                {!isLoading && <span aria-hidden="true">↗</span>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;