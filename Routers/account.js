const router = require("express").Router();
const accountControllers = require("../Controllers/account")

router.post("/register", accountControllers.REGISTER);
router.post("/login", accountControllers.LOGIN);
router.get("/logout", accountControllers.LOGOUT);

module.exports = router;
