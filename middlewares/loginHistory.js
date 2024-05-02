const LoginHistory = require("../models/loginHistory.js");
// Middleware function to log login activities
const logLoginActivity = async (req, res, next) => {
  try {
    const { email, name } = req.body; // Extract email from request body
    const ipAddress = req.ip; // Get IP address of the user
    const deviceInfo = req.headers["user-agent"]; // Get device information from user agent header
    const timestamp = new Date();

    // Save login history record to the database
    await LoginHistory.create({
      action: name ? "logout" : "login",
      email,
      ipAddress,
      deviceInfo,
      timestamp,
    });

    next();
  } catch (error) {
    console.error("Error logging login activity:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = logLoginActivity;
