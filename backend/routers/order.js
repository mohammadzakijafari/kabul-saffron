const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const { createOrder, getUserOrder, deleteOrder } = require("../controllers/order");

router.post("/orders/create", verifyToken , createOrder);
router.get("/orders", verifyToken, getUserOrder);
router.post("/users", deleteOrder);

module.exports = router;