const express = require("express");
const db = require("./config/connection");
const connectCloudinary = require("./config/cloudinary");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/", require("./routers/user"));
app.use("/", require("./routers/product"));
app.use("/", require("./routers/order"));
app.use("/", require("./routers/payment"));

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});