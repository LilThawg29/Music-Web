const router = require("express").Router();
const musicControllers = require("../Controllers/music");
const middlewareAccounts = require("../Middlewares/account");
const upload = require("../multer");


router.post('/create', upload.fields([{ name: 'src_music', maxCount: 1 }, { name: 'image_music', maxCount: 1 }]),middlewareAccounts.VERIFY_TOKEN, musicControllers.CREATE_MUSIC);

module.exports = router;