const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Dummy users database
const users = [
  { id: 1, username: "admin", password: "admin123", role: "admin" },
  { id: 2, username: "user", password: "user123", role: "user" }
];

const { generateToken } = require("../middlewares/auth");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ status: "INVALID_CREDENTIALS" });

  const token = generateToken(user);

  res.json({
    status: "LOGGED_IN",
    token
  });
});

module.exports = router;