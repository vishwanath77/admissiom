const prisma = require("../prisma/client");

exports.create = async (req, res) => {
  console.log("Incoming payload:", req.body);
  try {
    const { name, category, quotaType, marks, docStatus } = req.body;

    if (!name || !category || !quotaType || !marks)  {
      return res.status(400).json({ error: "All fields are required" });
    }

    const applicant = await prisma.applicant.create({
      data: {
        name,
        category,
        quotaType,
        marks,
        docStatus: docStatus || "PENDING",
      },
    });

    res.json(applicant);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await prisma.applicant.findMany();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
