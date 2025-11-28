const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const donationRoutes = require("./routes/donation");
const bloodCentersRoutes = require("./routes/bloodCenters");
const bloodRequestsRoutes = require("./routes/bloodRequests");
const activityLogRoutes = require("./routes/activityLogs");

const app = express();
const PORT = process.env.PORT || 3002;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/bloodbank")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/home", homeRoutes);
app.use("/auth", authRoutes);
app.use("/donation", donationRoutes);
app.use("/blood-centers", bloodCentersRoutes);
app.use("/blood-requests", bloodRequestsRoutes);
app.use("/activity-logs", activityLogRoutes);

// Admin routes (no auth for demo)
app.use("/admin/donations", donationRoutes);
app.use("/admin/blood-requests", bloodRequestsRoutes);
app.use("/admin/blood-centers", bloodCentersRoutes);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "BloodBank API working" });
});

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// Handle port already in use error
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Please free up the port or set a different PORT environment variable.`
    );
    process.exit(1);
  } else {
    throw err;
  }
});
