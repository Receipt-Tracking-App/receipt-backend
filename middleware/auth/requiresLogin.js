const jwt = require("jsonwebtoken");
const config = require("../../config");

const requiresLogin = (req, res, next) => {
  const token = req.token;

  jwt.verify(token, config.secrets.jwt, (errors, decoded) => {
    if (!errors) {
      req.body.userId = decoded.userId;
      next();
    } else {
      res.status(400).json({ error: true, message: "Invalid token." });
    }
  });
};

module.exports = requiresLogin;
