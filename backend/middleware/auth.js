const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
    let headers = req.headers.authorization;
    // console.log(headers);
    // console.log(headers);
    if (headers) {
        let clientToken = headers.split(" ")[1];
        let verifiedToken = await jwt.verify(clientToken, process.env.SECRET_KEY);
        if (!verifiedToken) {
            return res.send({msg: "Invalid Token"});
        } else {
            req.user = verifiedToken;
            next();
        }
    } else {
        return res.send({msg: "Token is not found"});
    }
}

module.exports = verifyToken;