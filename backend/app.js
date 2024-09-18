const express = require("express");
const db = require("./config/connection");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/", require("./routers/user"));

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});