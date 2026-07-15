import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("deskflowToken");
  const storedUser = localStorage.getItem("deskflowUser");

  if (!token || !storedUser) {
    return <Navigate to="/" replace />;
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("deskflowToken");
    localStorage.removeItem("deskflowUser");

    return <Navigate to="/" replace />;
  }

  if (user.role !== allowedRole) {
    const correctPath =
      user.role === "Admin" ? "/admin" : "/employee";

    return <Navigate to={correctPath} replace />;
  }

  return children;
}

export default ProtectedRoute;