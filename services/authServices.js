const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (name, email, password) => {
  try {
    if (name && email && password) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User with same email already exists!");
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      let user = new User({
        email,
        password: hashedPassword,
        name,
      });
      user = await user.save();

      if (!user) {
        throw new Error("Something Went Wrong!");
      }

      const token = jwt.sign({ id: user._id }, config.jwtSecret);
      return { token, ...user._doc };
    } else {
      throw new Error("All fields are required!");
    }
  } catch (e) {
    throw new Error(e.message);
  }
};
// Function to handle user login
exports.login = async (email, password) => {
  if (email && password) {
    try {
      // Find user by email
      let user = await User.findOne({ email });

      // Check if user exists
      if (!user) {
        throw new Error("User Already Exist");
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
        expiresIn: "1h",
      });


      
      user.lastUpdate = new Date(); // No need for "new" keyword
      user = await user.save();
      return { user, token };
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("Email and Password Required!");
  }
};

// Function to handle user logout (optional)
exports.logout = async () => {
  // Implement logout logic if required
};

// Function to handle two-factor authentication (optional)
exports.verifyTwoFactorAuth = async (userId, code) => {
  // Implement 2FA verification logic if required
};
