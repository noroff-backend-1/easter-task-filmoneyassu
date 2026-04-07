const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    secret,
    { expiresIn: "1h" }
  );
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ status: "TOKEN_MISSING" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ status: "INVALID_TOKEN" });
  }
}

module.exports = { generateToken, verifyToken, authenticateJWT };