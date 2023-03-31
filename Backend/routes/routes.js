const user = require("../controllers/user");
const express = require("express");
const router = express.Router();

router.post("/signup", cors(corsOptions), user.signup);
// router.post("/login", user.login);

module.exports = router;
