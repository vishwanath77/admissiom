const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed, role }
  });

  res.json(user);
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("👉 INPUT:", email, password);

    const user = await prisma.user.findUnique({
      where: { email }
    });

    console.log("👉 DB USER:", user);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    console.log("👉 STORED HASH:", user.password);

    const valid = await bcrypt.compare(password, user.password);

    console.log("👉 PASSWORD MATCH:", valid);

    if (!valid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login success",
      token,
      role: user.role
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};