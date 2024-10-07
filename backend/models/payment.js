const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    orderItems: [
      {
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
        quantity: {
          type: Number,
        },
        totalPrice: {
          type: Number,
        }
      }
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
      default: 'USD',
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['stripe', 'paypal', 'cod', 'creditCard'],  // Enum for various payment methods
    },
    transactionId: {
      type: String,
      required: true, // Unique transaction ID from payment gateway (e.g., Stripe or PayPal)
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],  // Different statuses for payment
      default: 'pending',
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    // Optional: Store additional metadata if necessary
    metadata: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

const Payment = mongoose.model('Payment', paymentSchema);


module.exports = Payment;