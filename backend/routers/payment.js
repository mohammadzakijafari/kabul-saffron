const express = require("express");
const router = express.Router();

const { placeOrderCashPayment, placeOrderStripe } = require("../controllers/payment");

router.post("/payment/cash", placeOrderCashPayment);
router.post("/payment/stripe", placeOrderStripe);

module.exports = router;