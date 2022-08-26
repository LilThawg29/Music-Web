const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  createAccessToken: (user) => {
    return new Promise((resolve, reject) => {
      JWT.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30d" },
        (err, accessToken) => {
          if (err) reject(createError.InternalServerError());
          resolve(accessToken);
        }
      );
    });
  },
  authorizationToken: (req, res, next) => {
    try {
      if (!req.headers["authorization"])
        return next(createError.Unauthorized());
      const authHeader = req.headers["authorization"];
      const bearerToken = authHeader.split(" ");
      const token = bearerToken[1];
      JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          const message =
            err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
          return next(createError.Unauthorized(message));
        }
        req.id = decoded.id;
        next();
      });
    } catch (error) {
      next(createError.Unauthorized());
    }
  },
  isAdmin: (req, res, next) => {
    try {
      if (!req.headers["authorization"])
        return next(createError.Unauthorized());
      const authHeader = req.headers["authorization"];
      console.log(authHeader);
      const bearerToken = authHeader.split(" ");
      const token = bearerToken[1];

      JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.log("Loi o err day");
          const message =
            err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
          return next(createError.Unauthorized(message));
        }
        req.id = decoded.id;
        if (decoded.role != 0) {
          return next("You 're not admin");
        }
        next();
      });
    } catch (error) {
      next(createError.Unauthorized());
    }
  },
};
