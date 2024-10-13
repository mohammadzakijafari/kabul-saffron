const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

const { placeOrderCashPayment, placeOrderStripe, userOrders, verifyStripe, getAllPaymentOrders, paymentUpdateStatus } = require("../controllers/payment");

router.post("/payment/cash", verifyToken, placeOrderCashPayment);
router.post("/payment/stripe", verifyToken, placeOrderStripe);
router.post("/payment/userorders", verifyToken, userOrders);
router.post("/payment/verifystripe", verifyToken, verifyStripe);

router.post("/payment/orders", adminAuth, getAllPaymentOrders);
router.post("/payment/update-status", adminAuth, paymentUpdateStatus);

module.exports = router;