const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

const { createOrder, getAllOrders, getUserOrder, deleteOrder, updateOrder } = require("../controllers/order");

router.post("/orders/create", verifyToken , createOrder);
router.post("/orders/admin", adminAuth, getAllOrders);
router.get("/orders", verifyToken, getUserOrder);
router.post("/orders/delete/:id", verifyToken, deleteOrder);
router.put("/orders/update/:id", verifyToken, updateOrder);

module.exports = router;