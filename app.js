const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const config = require("./config.js");
const authRoutes = require("./routes/authRoutes.js");
// const dashboardRoutes = require("./routes/dashboardRoutes.js");
// const adminRoutes = require("./routes/adminRoutes.js");
const { setupSocket } = require("./utils/socketUtils.js");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, { dbName: "project" })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
// app.use("/dashboard", dashboardRoutes);
// app.use("/admin", adminRoutes);

// Socket.io setup
setupSocket(io);
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Start server
server.listen(config.port, () =>
  console.log(`Server running on port ${config.port}`)
);
