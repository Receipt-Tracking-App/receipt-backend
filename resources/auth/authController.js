const User = require("../user/userModel");
const Group = require("../group/groupModel");
const bcrypt = require("bcryptjs");
const config = require("../../config");
const jwt = require("jsonwebtoken");

const createToken = data => {
  const i = "ReceiptTrackerInc";
  const s = "auth@receipttrackerinc.com";
  const a = "generalpublic";

  const signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: config.secrets.jwtExp
  };

  return jwt.sign(data, config.secrets.jwt, signOptions);
};

const controller = {
  registerUser: async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    let groupId = null;
    try {
      const group = await Group.query().insert({
        name: "individual"
      });

      groupId = group.id;
    } catch (e) {
      res
        .status(500)
        .json({ error: true, message: "Unable to create a group." });
    }

    try {
      const user = await User.query().insert({
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password: bcrypt.hashSync(password, 14),
        group_id: groupId
      });

      const token = createToken({ userId: user.id, username: user.last_name });

      res
        .status(201)
        .json({ error: false, message: "User registered.", token });
    } catch (e) {
      res
        .status(500)
        .json({ error: false, message: "Unable to registered the user." });
    }
  },

  // identification : username OR email;
  loginUser: async (req, res) => {
    const { userId, password } = req.body;

    try {
      const user = await User.query()
        .where("username", userId)
        .orWhere("email", userId)
        .first();

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = createToken({
          lastName: user.last_name,
          userId: user.id
        });

        res.json({ error: false, message: "User authenticated.", token });
      } else {
        res
          .status(401)
          .json({ error: true, message: ["Invalid email and password"] });
      }
    } catch (e) {
      res.status(500).json({ error: true, message: ["Unable to login"] });
    }
  }
};

module.exports = controller;
