const service = require("../services/admission.service");

// Allocate a seat
exports.allocate = async (req, res) => {
  try {
    const { applicantId, programId, quotaType } = req.body;

    // Call service to allocate seat
    const admission = await service.allocateSeat({
      applicantId,
      programId,
      quotaType,
    });

    // ✅ Send proper response with admission number
    res.json({
      message: "Seat allocated successfully!",
      admissionNumber: admission.admissionNumber,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Confirm admission
exports.confirm = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await service.confirmAdmission(id);

    res.json({
      message: "Admission confirmed",
      admission: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
