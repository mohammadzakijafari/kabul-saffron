const Payment = require("../models/payment");

const placeOrderCashPayment = async (req, res) => {
    try {
        const { user, product, orderItems, amount, address, paymentMethod, transactionId } = req.body;
        const newPayment = await Payment.create({
            user,
            product,
            orderItems,
            amount,
            address,
            paymentMethod,
            transactionId,
            paymentStatus: 'pending', // Default status
        });

        res.status(201).json({
            success: true,
            data: newPayment
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const placeOrderStripe = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = { placeOrderCashPayment, placeOrderStripe };