const router = require("express").Router();
const accountControllers = require("../Controllers/account");
const { authorizationToken } = require("../helpers/jwt_helpers");

router.post("/register", accountControllers.REGISTER);
router.post("/login", accountControllers.LOGIN);
router.get("/logout", accountControllers.LOGOUT);
router.get("/list", accountControllers.LIST_ACCOUNT);
router.get("/profile", authorizationToken, accountControllers.PROFILE);
router.get("/search",accountControllers.SEARCH_ACCOUNT)
router.put("/active", accountControllers.ACTIVE_ACCOUNT)

module.exports = router;
