const prisma = require("../prisma/client");

exports.createProgram = async (req, res) => {
  const program = await prisma.program.create({
    data: req.body
  });
  res.json(program);
};

exports.createQuota = async (req, res) => {
  const quota = await prisma.quota.create({
    data: req.body
  });
  res.json(quota);
};
