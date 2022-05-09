const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Account = require("../Models/account");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");

const accountControllers = {
  REGISTER: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      if (!validator.validate(email))
        return res.status(400).json({ message: "Invalid emails!" });
      const account = await Account.findOne({ email: email });
      if (account) return res.status(400).json({ message: "Account exists!" });

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const newAccount = await new Account({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      await newAccount.save();
      res.status(200).json({ message: "Register successfully!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  LOGIN: async (req, res) => {
    try {
      var { email, password } = req.body;
      if (!validator.validate(email))
        return res.status(400).json({ message: "Invalid emails!" });
      const account = await Account.findOne({ email: email });
      if (!account)
        return res.status(400).json({ message: "Account not exists!" });
      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect password!" });

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
    res.clearCookie('Token');
    return res.redirect('/');
  },
};

module.exports = accountControllers;
