const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const {
  authMiddleware,
  roleMiddleware,
} = require("./middleware/auth.middleware");

// Auth route (no protection)
app.use("/api/auth", require("./routes/auth.routes"));

// Protected routes
app.use(
  "/api/master",
  authMiddleware,
  roleMiddleware(["admin"]),
  require("./routes/master.routes"),
);

app.use(
  "/api/applicant",
  authMiddleware,
  roleMiddleware(["admin", "officer"]),
  require("./routes/applicant.routes"),
);

app.use(
  "/api/admission",
  authMiddleware,
  roleMiddleware(["officer"]),
  require("./routes/admission.routes"),
);

const managementRoutes = require("./routes/management.routes");
app.use("/api/management", managementRoutes);
module.exports = app;
