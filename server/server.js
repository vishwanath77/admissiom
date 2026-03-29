const express = require("express");
const path = require("path");

const app = require("./src/app");

// ✅ Serve React build
app.use(express.static(path.join(__dirname, "public")));

// ✅ Handle React routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});