const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const { createOrder } = require("../controllers/order");

router.post("/orders/create", createOrder);

module.exports = router;