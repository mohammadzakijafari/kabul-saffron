const Payment = require("../models/payment");

const placeOrderCashPayment = async (req, res) => {
    let user = req.user.id;
    try {
        const {productsId, orderItems, amount, firstName, lastName, email, address, phone } = req.body;
        // Extract the productId values into an array of ObjectIds
        // const productIdsArray = productsId.map(item => item.productId);
        const newPayment = await Payment.create({
            user,
            // productsId: productIdsArray,
            orderItems,
            amount,
            address,
            paymentMethod: "cod",
            firstName,
            lastName,
            email,
            address,
            phone,
            paymentStatus: 'pending', // Default status
        });

        res.status(201).json({
            success: true,
            data: newPayment,
            msg: "Payment Place successfully"
        });
        // console.log(`${user} ---------${paymentMethod} --------- ${amount} --------- ${firstName} --------- `, orderItems);

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

const placeOrderStripe = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

const userOrders = async(req, res) => {
    try {
        let userId = req.user.id;
        // Populate orderItems' orderId first, then populate productId inside the Order schema
        const orderPayment = await Payment.find({ user: userId })
            .populate({
                path: 'orderItems.orderId',  // First populate orderId in the orderItems array
                model: 'Order',
                populate: {
                    path: 'products.productId', // Then populate productId inside the populated Order model
                    model: 'Product'
                }
            })
            .populate({ path: 'productsId', model: 'Product' }); // Populating productsId in Payment schema directly

        // const orderPayment = await Payment.find({ user: userId }).populate({path: 'orderItems.orderId', model: 'Order'}).populate({path: 'productId', medel: 'Product'});
        res.status(200).send({msg: "Order for Payment", orderPayment});
    } catch (error) {
        console.log(error);
    }
}

module.exports = { placeOrderCashPayment, placeOrderStripe, userOrders };