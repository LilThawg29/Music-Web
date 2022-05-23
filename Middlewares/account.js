const jwt = require("jsonwebtoken");

const accountMiddleware = {
  VERIFY_TOKEN: (req, res, next) => {
    const Token = req.header("Token");
    if (Token) {
      jwt.verify(Token, process.env.JWT_ACCESS_KEY, (err, account) => {
        if (err) {
          res.status(403).json({ message: "Token is not valid!" });
        }
        req.account = account;
        console.log(account);
        next();
      });
    } else {
      res.status(401).json({ message: "You're not authenticated!" });
    }
  },
  VERIFY_ADMIN: (req, res, next) => {
    accountMiddleware.VERIFY_TOKEN(req, res, () => {
      if (req.account.role == "admin") next();
      else res.status(403).json({ msg: "You're not admin!" });
    });
  },
  VERIFY_USER: (req, res, next) => {
    accountMiddleware.VERIFY_TOKEN(req, res, () => {
      if (req.account.id == req.params.id) next();
      else
        res
          .status(403)
          .json({ msg: "You're not allowed check profile id other" });
    });
  },
};

module.exports = accountMiddleware;
