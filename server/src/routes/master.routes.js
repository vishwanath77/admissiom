const router = require("express").Router();
const ctrl = require("../controllers/master.controller");

router.post("/program", ctrl.createProgram);
router.post("/quota", ctrl.createQuota);

module.exports = router;
