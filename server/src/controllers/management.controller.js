const prisma = require("../prisma/client");

exports.getDashboard = async (req, res) => {
  try {
    // Get all programs
    const programs = await prisma.program.findMany();

    // Get quotas separately
    const quotas = await prisma.quota.findMany();

    // Get admissions separately
    const admissions = await prisma.admission.findMany();

    // Total intake
    const totalIntake = quotas.reduce((sum, q) => sum + q.totalSeats, 0);

    // Admitted count
    const admittedCount = admissions.length;

    // Quota-wise
    const quotaWise = quotas.map(q => ({
      program: programs.find(p => p.id === q.programId)?.name || "Unknown",
      quota: q.type,
      filledSeats: q.filledSeats,
      totalSeats: q.totalSeats,
      remaining: q.totalSeats - q.filledSeats,
    }));

    // Applicants with pending docs
    const pendingDocs = await prisma.applicant.findMany({
      where: { docStatus: "PENDING" },
      select: { id: true, name: true, category: true, quotaType: true },
    });

    // Fee pending admissions
    const feePending = await prisma.admission.findMany({
      where: { feeStatus: "PENDING" },
      select: { id: true, applicantId: true, programId: true, admissionNumber: true },
    });

    res.json({ totalIntake, admittedCount, quotaWise, pendingDocs, feePending });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};