const Payment = require("../models/payment");
const Stripe = require("stripe");
const User = require("../models/user");

const currency = "usd";
/* ------------------- Stripe gateway initialize --------------------------- */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const placeOrderCashPayment = async (req, res) => {
    let user = req.user.id;
    try {
        const {productsId, productsName, orderItems, amount, firstName, lastName, email, address, phone } = req.body;
        // console.log(productsId);
        console.log(orderItems);
        // Extract the productId values into an array of ObjectIds
        const productIdsArray = productsId.map(item => item.productId);
        const productNamesArray = productsName.map(item => item.productName);
        const newPayment = await Payment.create({
            user,
            // productsId: productIdsArray,
            // productNamesArray,
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
        let user = req.user.id;
        const {productsName, orderItems, amount, firstName, lastName, email, address, phone } = req.body;
        const { origin } = req.headers;

        const PaymentData = {
            user,
            orderItems,
            amount,
            address,
            paymentMethod: "Stripe",
            firstName,
            lastName,
            email,
            address,
            phone,
            paymentStatus: 'pending', // Default status
        };

        const newPayment = new Payment(PaymentData)
        await newPayment.save();

        const line_items = orderItems.map((paymentItem) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: paymentItem.productName
                },
                unit_amount: amount * 100
            },
            quantity: paymentItem.quantity
        }))

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newPayment._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newPayment._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({success:true, session_url: session.url});
    } catch (error) {
        console.log(error);
    }
}

/* ----------------------- Verify Stripe Controller function ---------------------- */
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === "true") {
            await Payment.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true});
        } else {
            await Payment.findByIdAndDelete(orderId);
            res.json({success: false});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, msg: error.message});
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


/* ----------------------- Getting All orders -------------------------- */
const getAllPaymentOrders = async (req, res) => {
    try {
        let orderPayment = await Payment.find();
        res.status(200).send(orderPayment);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal Server Error"});
    }
}

module.exports = { placeOrderCashPayment, placeOrderStripe, userOrders, verifyStripe, getAllPaymentOrders };