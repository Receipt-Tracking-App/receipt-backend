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

    if (!validator.isLength(firstName, { min: 2, max: 20 })) {
      errors.push("First name must be between 2 and 12 characters");
    }

    if (validator.isEmpty(lastName)) {
      errors.push("Last name is required.");
    }

    if (!validator.isLength(lastName, { min: 2, max: 20 })) {
      errors.push("Last name must be between 2 and 12 characters");
    }

    if (validator.isEmpty(username)) {
      errors.push("Username is required.");
    }

    if (!validator.isLength(username, { min: 4, max: 12 })) {
      errors.push("Username must be between 4 and 12 characters");
    }

    if (!validator.isEmail(email)) {
      errors.push("Email is required.");
    }

    if (validator.isEmpty(password)) {
      errors.push("Password is required.");
    }

    if (!validator.isLength(password, { min: 4, max: 32 })) {
      errors.push("Password must be between 4 and 12 characters");
    }
  }

  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ error: true, message: errors });
  }
};

module.exports = validateRegistrationBody;
