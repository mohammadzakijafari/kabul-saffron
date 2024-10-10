const express = require("express");
const router = express.Router();

const {register, login, adminLogin } = require("../controllers/user");

router.post("/users/register", register);
router.post("/users/login", login);
router.post("/users/admin", adminLogin);

module.exports = router;