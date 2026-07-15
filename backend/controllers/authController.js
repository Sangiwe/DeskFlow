const jwt = require("jsonwebtoken");

const users = [
  {
    id: "employee-001",
    name: "DeskFlow Employee",
    email: "employee@deskflow.com",
    password: "employee123",
    role: "Employee",
  },
  {
    id: "employee-002",
    name: "Second DeskFlow Employee",
    email: "employee2@deskflow.com",
    password: "employee2123",
    role: "Employee",
  },
  {
    id: "admin-001",
    name: "DeskFlow Administrator",
    email: "admin@deskflow.com",
    password: "admin123",
    role: "Admin",
  },
];

const login = (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Email, password and role are required",
    });
  }

  const user = users.find(
    (currentUser) =>
      currentUser.email === email &&
      currentUser.password === password &&
      currentUser.role === role
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid login details",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

module.exports = {
  login,
};