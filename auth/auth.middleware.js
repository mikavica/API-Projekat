const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_super_secret"; 

function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json("No token provided");

  const token = authHeader.split(" ")[1]; 
  if (!token) return res.status(401).json("Token missing");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.user = { id: decoded.userId }; 
    next();
  } catch (err) {
    return res.status(401).json("Invalid or expired token");
  }
}

module.exports = auth;
