const prisma = require("../prisma/client");

async function generateAdmissionNumber(programId, quotaType) {
  
  // 🔍 1. Get program details
  const program = await prisma.program.findUnique({
    where: { id: programId }
  });

  if (!program) {
    throw new Error("Program not found");
  }

  // 🔢 2. Count existing admissions
  const count = await prisma.admission.count({
    where: { programId, quotaType }
  });

  // 🔢 3. Format sequence
  const next = String(count + 1).padStart(4, "0");

  // ✅ 4. Build Admission Number
  return `INST/2026/UG/${program.name}/${quotaType}/${next}`;
}

module.exports = { generateAdmissionNumber };