const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");

// ------------------- Creating Order Function --------------------- 
const createOrder = async (req, res) => {
    try {
        let user = req.user.id;
        const {
            productId,
            quantity,
            totalPrice,
        } = req.body;

        // Checking if user exits in database or not
        let currentUser = await User.findOne({ _id: user });
        if (!currentUser) {
            return res.send({msg: "User not found, first register then login please"});
        }

        // Checking whether product exists in database or not
        let checkProduct = await Product.findById(productId);
        if (!checkProduct) {
            return res.send({msg: "Product is not available in database"});
        }

        // Preparing final order data to be inserted to database
        const newOrderData = {
            user,
            products: {
                productId,
                quantity
            },
            totalPrice,
        }

        let newOrder = await Order.create(newOrderData);

        const userCount = await User.findById(user);
        let orderCount = userCount.orders.length;

        res.status(200).send({msg: "Order created successfully", newOrder, orderCount: orderCount});

        // Add the order to the user's order history
        currentUser.orders.push(newOrder._id);
        await currentUser.save();

    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal Server Error"});
    }
};

/* ----------------------- Getting Order Count -------------------------- */
const getOrderCount = async (req, res) => {
    try {
        let user = req.user.id;
        const orderCount = await User.findById(user);
        // console.log("User Count -------------- ", orderCount);
        if (orderCount) {
            const count = userCount.orders.length;
            console.log(`Count ==================== ${count}`);
            res.send({count});
        }
    } catch (error) {
        console.log(error);
    }
}

/* ----------------------- Getting User Order -------------------------- */
const getUserOrder = async (req, res) => {
    try {
        let user = req.user.id;
       
        
        const userOrder = await User.findById(user).populate({path: "orders", populate: {path: "products.productId", model: "Product"}});
        res.status(200).send(userOrder);
        // console.log(userOrder.orders[0].products);

        if (!userOrder) {
            res.send({msg: "User is not found"});
        }
        
        // res.send(userOrder);
        // if (userOrder.orders.length > 0) {
        //     console.log(userOrder.orders[0].products);
        // }
         // const userCount = await User.findById(user); // Fetch the user by ID

        // if (userCount && userCount.orders) {
        //     const orderCount = userCount.orders.length; // Get the count of orders
        //     res.status(200).send(orderCount);
        //     console.log(`The user has ${orderCount} orders.`);
        // } else if (userCount) {
        //     console.log('The user has no orders.');
        // } else {
        //     console.log('User not found.');
        // }



        // const userCount = await User.findById(user);
        // console.log("User Count -------------- ", userCount);
        // if (userCount) {
        //     const orderCount = userCount.orders.length;
        //     console.log(`Order Count ==================== ${orderCount}`);
        //     res.send({orderCount});
        // }
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = { createOrder, getUserOrder };