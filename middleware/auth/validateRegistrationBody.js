const validator = require("validator");

const validateRegistrationBody = (req, res, next) => {
  const errors = [];
  const { firstName, lastName, username, email, password } = req.body;
  const requestBodyObject = Object.values(req.body);

  if (requestBodyObject.length === 0) {
    errors.push("User registration cannot be empty.");
  } else {
    if (validator.isEmpty(firstName)) {
      errors.push("First name is required.");
    }

    if (validator.isEmpty(lastName)) {
      errors.push("Last name is required.");
    }

    if (validator.isEmpty(username)) {
      errors.push("Username is required.");
    }

    if (!validator.isEmail(email)) {
      errors.push("Email is required.");
    }

    if (validator.isEmpty(password)) {
      errors.push("Password is required.");
    }
  }

  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ error: true, message: errors });
  }
};

module.exports = validateRegistrationBody;
