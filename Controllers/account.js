const bcrypt = require("bcrypt");
const mongooseAccount = require("../Models/account");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");

const accountControllers = {
  REGISTER: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      if (!password || !username)
        return res.status(400).json({ msg: "username or password not empty!" });
      if (!validator.validate(email))
        return res.status(400).json({ msg: "Invalid emails!" });
      const account = await mongooseAccount.findOne({ email: email });
      if (account) return res.status(400).json({ msg: "Account exists!" });

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const newmongooseAccount = await new mongooseAccount({
        username: username,
        email: email,
        password: hashed,
      });

      await newmongooseAccount.save();
      res.status(200).json({ msg: "Register successfully!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  LOGIN: async (req, res) => {
    try {
      var { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ msg: "email or password not empty!" });
      if (!validator.validate(email))
        return res.status(400).json({ msg: "Invalid emails!" });
      const account = await mongooseAccount.findOne({ email: email });
      if (!account) return res.status(400).json({ msg: "Account not exists!" });
      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password!" });

      const Token = jwt.sign(
        {
          id: account.id,
          role: account.role,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "365d" }
      );

      var { password, ...responseAccount } = account._doc;

      res.cookie("Token", Token);
      res.status(200).json({ responseAccount, Token });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  LOGOUT: (req, res) => {
    res.clearCookie("Token");
    return res.redirect("/");
  },
  LIST_ACCOUNT: async (req, res) => {
    try {
      const account = await mongooseAccount.find();
      var responseAccounts = account.map((acc) => {
        var { password, ...responseAccount } = acc._doc;
        return responseAccount;
      });
      res.status(200).json(responseAccounts);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  PROFILE: async (req, res) => {
    try {
      const { id } = req.account;
      const account = await mongooseAccount.findById(id);
      if (!account) return res.status(400).json({ msg: "No found account!" });
      const user = {
        id: account._id,
        userName: account.username,
        email: account.email,
        role: account.role,
      };
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
};

module.exports = accountControllers;
