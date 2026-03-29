const router = require("express").Router();
const ctrl = require("../controllers/admission.controller");

router.post("/allocate", ctrl.allocate);
router.post("/confirm/:id", ctrl.confirm);

module.exports = router;
