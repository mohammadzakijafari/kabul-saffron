const mongoose = require("mongoose");

require("dotenv").config();
const uri = process.env.MONOGODB_URI;

main()
    .then(() => console.log("DB connected Successfully"))
    .then((error) => console.log(error));

async function main() {
    mongoose.connect(uri);
}

module.exports = main;