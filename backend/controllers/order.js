const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");


const createOrder = async (req, res) => {
    try {
        let currentUser = req.user.id;
        const {
            productId,
            quantity,
            totalPrice,
        } = req.body;

        // Checking if user exits in database or not
        let user = await User.findOne({ _id: currentUser });
        if (!user) {
            return res.send({msg: "User not found, first register then login please"});
        }

        // Checking whether product exists in database or not
        let product = await Product.findById(productId);
        if (!product) {
            return res.send({msg: "Product is not available in database"});
        }

        // Preparing final order data to be inserted to database
        const newOrderData = {
            currentUser,
            products: {
                productId,
                quantity,
            },
            totalPrice,
        }

        let newOrder = await Order.create(newOrderData);
        res.status(200).send({msg: "Order created successfully", newOrder});

    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal Server Error"});
    }
};

module.exports = { createOrder };