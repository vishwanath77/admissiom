const prisma = require("../prisma/client");
const { generateAdmissionNumber } = require("../utils/admissionNumber");

async function allocateSeat(data) {
  return await prisma.$transaction(async (tx) => {
    const quota = await tx.quota.findFirst({
      where: {
        programId: data.programId,
        type: data.quotaType
      }
    });

    if (!quota) throw new Error("Quota not found");

    if (quota.filledSeats >= quota.totalSeats) {
      throw new Error("Quota Full");
    }

    const admissionNumber = await generateAdmissionNumber(
      data.programId,
      data.quotaType
    );

    const admission = await tx.admission.create({
      data: {
        applicantId: data.applicantId,
        programId: data.programId,
        quotaType: data.quotaType,
        admissionNumber,
        feeStatus: "PENDING"
      }
    });

    await tx.quota.update({
      where: { id: quota.id },
      data: {
        filledSeats: { increment: 1 }
      }
    });

    return admission;
  });
}

// Confirm admission
async function confirmAdmission(id) {
  const admission = await prisma.admission.findUnique({
    where: { id: Number(id) },
  });

  if (!admission) throw new Error("Admission not found");
  if (admission.feeStatus !== "PAID") throw new Error("Fee not paid");

  const updated = await prisma.admission.update({
    where: { id: Number(id) },
    data: { status: "CONFIRMED" },
  });

  return updated;
}

module.exports = { allocateSeat, confirmAdmission };
