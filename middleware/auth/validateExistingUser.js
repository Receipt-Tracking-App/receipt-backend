const User = require("../../resources/user/userModel");

const validateExistingUser = async (req, res, next) => {
  const { username, email } = req.body;

  try {
    const user = await User.query()
      .where("username", username)
      .orWhere("email", email)
      .first();

    if (!user) {
      next();
    } else {
      res.status(400).json({
        error: true,
        message:
          "The username is already taken or the email is already registered."
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ error: true, message: "Unable to retrieve registered user" });
  }
};

module.exports = validateExistingUser;
