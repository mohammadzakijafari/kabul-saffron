const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    cardNumber: {
        type: String,
        required: [true, 'Please provide a card number'],
        trim: true,
        maxlength: [14, 'Card number cannot be more than 14 characters'],
    },
    cardHolderName: {
        type: String,
        required: [true, 'Please provide a card holder name'],
        trim: true,
        maxlength: [100, 'Card holder name cannot be more than 100 characters'],
    },
});