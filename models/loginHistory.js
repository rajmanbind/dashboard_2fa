const mongoose = require("mongoose");

// Define the schema for login history records
const loginHistorySchema = new mongoose.Schema({
  email: { type: String, required: true },
  ipAddress: { type: String, required: true },
  deviceInfo: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  action: { type: String, enum: ["login", "logout"], required: true }, // Define the action field with enum values
});

// Create a model for login history using the schema
const LoginHistory = mongoose.model("LoginHistory", loginHistorySchema);

module.exports = LoginHistory;
