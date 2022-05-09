const jwt = require("jsonwebtoken");

const accountMiddleware = {
  VERIFY_TOKEN: (req, res, next) => {
    const Token = req.headers.Token;
    if (Token) {
      jwt.verify(Token, process.env.JWT_ACCESS_KEY, (err, account) => {
        if (err) {
          res.status(403).json({ message: "Token is not valid!" });
        }
        req.account = account;
        next();
      });
    } else {
      res.status(401).json({ message: "You're not authenticated!" });
    }
  },
};

module.exports = accountMiddleware;
