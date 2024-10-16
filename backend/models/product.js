const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Please provide a title for the product'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description for the product'],
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
        validate: {
          validator: function (value) {
            return value < this.regularPrice;
          },
          message: "Discount price should be less than the regular price",
        },
    },
    productFeature: {
        type: String,
        required: true,
        enum: ["featured", "best-seller", "first-quality", "second-quality"], // You can add more types
      },
    images: {
      type: [String],
      validate: [
        {
          validator: function (v) {
            return v.length <= 4;
          },
          message: 'You can upload a maximum of 4 images',
        },
      ],
      required: [true, 'Please provide at least one image for the listing'],
    },
    // addedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [true, 'Product must have an owner'],
    // },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;