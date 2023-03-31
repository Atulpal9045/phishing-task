const env = require("dotenv");
env.config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const { uuid } = require("uuidv4");

exports.signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(process.env.SALT);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Registration Failed: invalid information",
      });
    }

    const passwordHash = bcrypt.hashSync(password, salt);
    const userDetails = await User.findOne({ email });
    if (userDetails)
      res.status(409).json({
        success: false,
        message: "Registration Failed: user already exists!",
      });

    const user = new User({
      id: uuid(),
      email,
      username,
      password: passwordHash,
    });
    await user.save();

    res.json({ Success: "You are regestered successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Registration Failed: wrong password" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "plz filled all detail" });
    }

    const salt = bcrypt.genSaltSync(process.env.SALT);
    const hash = bcrypt.hashSync(password, salt);

    const userDetails = await User.findOne({ email });
    if (!userDetails) res.status(403).json({ error: "user not find" });

    if (!userDetails.rows.length) {
      res.status(403).json({ error: "user not find" });
    }
    const match = await bcrypt.compare(password, getUser.rows[0].password);
    if (match === false) {
      return res.json({ message: "Invalid password" });
    } else {
      const token = jwt.sign({ email, user_id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.EXPIRE_TILL,
      });
      res.status(200).send({ token });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
