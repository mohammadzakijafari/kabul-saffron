const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const { placeOrderCashPayment, placeOrderStripe, userOrders, verifyStripe } = require("../controllers/payment");

router.post("/payment/cash", verifyToken, placeOrderCashPayment);
router.post("/payment/stripe", verifyToken, placeOrderStripe);
router.post("/payment/userorders", verifyToken, userOrders);
router.post("/payment/verifystripe", verifyToken, verifyStripe);

module.exports = router;