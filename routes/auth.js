const router = require("express").Router();
const authController = require("../resources/auth/authController");
const validateRegistrationBody = require("../middleware/auth/validateRegistrationBody");
const validateExixtingUser = require("../middleware/auth/validateExistingUser");

router.post(
  "/register",
  [validateRegistrationBody, validateExixtingUser],
  authController.registerUser
);

router.post("/login", authController.loginUser);
module.exports = router;
