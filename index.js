// index.js
const express = require("express");

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

// ================= DUMMY DATA =================
const users = [
  { id: 1, name: "Rehan", role: "Admin" },
  { id: 2, name: "Aman", role: "User" },
];

// ================= ROUTES =================

// Health check
app.get("/get", (req, res) => {
  res.json({
    success: true,
    message: "Dummy API is running 🚀",
  });
});

// Get all users
app.get("/api/users", (req, res) => {
  res.json({
    success: true,
    data: users,
  });
});

// Get single user by id
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    data: user,
  });
});

// Create user (dummy)
app.post("/api/users", (req, res) => {
  const { name, role } = req.body;

  const newUser = {
    id: users.length + 1,
    name,
    role,
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  });
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
