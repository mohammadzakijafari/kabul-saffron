const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
const mongoose = require("mongoose");

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
            },
            quantity,
            totalPrice,
        }

        let newOrder = await Order.create(newOrderData);

        // Add the order to the user's order history
        currentUser.orders.push(newOrder._id);
        await currentUser.save();

        const userCount = await User.findById(user);
        let orderCount = userCount.orders.length;

        res.status(200).send({msg: "Order created successfully", newOrder, orderCount: orderCount});

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
        console.log(user);
       
        const userOrder = await User.findById(user).populate({path: "orders", populate: {path: "products.productId", model: "Product"}});
        if (!userOrder) {
            return res.send({msg: "User is not found"});
        }
        res.status(200).send(userOrder);
        // console.log(userOrder.orders[0].products);

        
        
        // ------------------- For the debugging purpose used ------------------------- 
        // res.send(userOrder);
        // if (userOrder.orders.length > 0) {
        //     console.log(userOrder.orders[0].products);
        // }
    } catch (error) {
        console.log(error);
        
    }
}

/* ----------------------- handling delete order from order schema -------------------------- */
const deleteOrder = async (req, res) => {
    try {
        let user = req.user.id;
        let orderId = req.params.id;
        // const {
        //     orderId
        // } = req.body;

        const userObjectId = new mongoose.Types.ObjectId(user);
        const orderObjectId = new mongoose.Types.ObjectId(orderId);

        let deletedOrder = await User.updateOne(
            {_id: userObjectId },            
            { $pull: { orders: orderObjectId } });
        res.send({msg: "Order Deleted Successfully", deletedOrder});
        // const checkUser = await User.findById(user);
        // if (!checkUser) {
        //     return res.send({msg: "User is not found, please register first"});
        // }
        // const order = await Order.findOne({});
    } catch (error) {
        console.log(error);
    }
}

/* ----------------------- handling update order from order schema -------------------------- */
const updateOrder = async (req, res) => {
    try {
        let orderId = req.params.id; // The ID of the specific order
        
        // Extract the updated fields from the request body
        const { quantity, totalPrice } = req.body;
        // console.log(`Q--------------- ${quantity} P ---------------- ${totalPrice}`);
    
        // Ensure the orderId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
          return res.status(400).json({ message: "Invalid Order ID" });
        }

        // Find the order by its ID and update its totalPrice
        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          {
            $set: {               // Use $set to update both fields
              quantity: quantity,
              totalPrice: totalPrice    
            }
          },
          { new: true } // Return the updated document
        );
    
        if (!updatedOrder) {
          return res.status(404).json({ message: "Order not found." });
        }
    
        // Send the updated order document back as the response
        res.status(200).json(updatedOrder);
    
      } catch (error) {
        console.log("Error updating order:", error);
        res.status(500).json({ message: "An error occurred while updating the order." });
      }
}

module.exports = { createOrder, getUserOrder, deleteOrder, updateOrder };