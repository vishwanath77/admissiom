const express = require("express");
const router = express.Router();
const { getDashboard } = require("../controllers/management.controller");
const { authMiddleware, roleMiddleware } = require("../middleware/auth.middleware");

router.get("/dashboard", authMiddleware, roleMiddleware(["management"]), getDashboard);

module.exports = router;