const jwt = require("jsonwebtoken");

const SECRET = "MY_SECRET_KEY";

function generateToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "1d" }
  );
}

module.exports = { generateToken, SECRET };