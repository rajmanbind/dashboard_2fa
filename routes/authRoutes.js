const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController.js");
const logLoginActivity = require("../middlewares/loginHistory.js");

router.post("/signup", AuthController.signup);
router.post("/login", logLoginActivity, AuthController.login);
router.post("/login-history", AuthController.loginHistory);
router.post("/logout", logLoginActivity, AuthController.logout);

module.exports = router;
