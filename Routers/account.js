const router = require("express").Router();
const accountControllers = require("../Controllers/account");
const middlewareAccounts = require("../Middlewares/account");

router.post("/register", accountControllers.REGISTER);
router.post("/login", accountControllers.LOGIN);
router.get("/logout", accountControllers.LOGOUT);
router.get('/list', middlewareAccounts.VERIFY_ADMIN, accountControllers.LIST_ACCOUNT);
router.get('/profile', middlewareAccounts.VERIFY_TOKEN, accountControllers.PROFILE);

module.exports = router;
