const authService = require("../services/authServices.js");
const LoginHistory = require("../models/loginHistory.js");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config.js");

class AuthController {
  // Controller function for user login
  static signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      if (name && email && password) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          res.status(401).json("User with same email already exists!");
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        let user = new User({
          email,
          password: hashedPassword,
          name,
        });
        user = await user.save();

        if (!user) {
          res.status(401).json("Something Went Wrong!");
        }

        const token = jwt.sign({ id: user._id }, config.jwtSecret);
        return res.json({ token, ...user._doc });
      } else {
        res.status(401).json("All fields are required!");
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  // Controller function for user login
  static login = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      try {
        // Find user by email
        let user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
          res.json("User Already Exist");
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          res.json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
          expiresIn: "1h",
        });

        user.lastUpdate = new Date(); // No need for "new" keyword
        user = await user.save();
        res.status(200).json({ user, token });
      } catch (error) {
        res.status(500).json(error.message);
      }
    } else {
      res.status(500).json("Email and Password Required!");
    }
  };
  // API endpoint to fetch login history
  static loginHistory = async (req, res) => {
    const { email } = req.body;

    try {
      // Fetch login history records for the specified user ID
      const loginHistory = await LoginHistory.find({ email });

      res.json(loginHistory);
    } catch (error) {
      console.error("Error fetching login history:", error);
      res.status(500).json({ error: error.message });
    }
  };
  // Controller function for user logout (optional)
  static logout = async (req, res) => {
    try {
      // Call authService to handle logout logic
      // await authService.logout();

      // Send success response
      res.json({ message: "Logout successful" });
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: error.message });
    }
  };
}
module.exports = AuthController;
