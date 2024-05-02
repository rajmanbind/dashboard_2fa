const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastUpdate: { type: Date, default: Date.now },
  // Add other user fields like name, role, etc.
});
// Middleware to update lastUpdate field before saving
// userSchema.pre("save", function (next) {
//   this.lastUpdate = new Date();
//   next();
// });

module.exports = mongoose.model("User", userSchema);
