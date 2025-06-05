const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.userId, username: decoded.username };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
