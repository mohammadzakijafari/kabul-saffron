const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyAdmin = async (req, res, next) => {
    let headers = req.headers.authorization;
    console.log(headers);
    // console.log(headers);
    if (headers) {
        let adminToken = headers.split(" ")[1];
        let verifiedAdminToken = await jwt.verify(adminToken, process.env.SECRET_KEY);
        if (verifiedAdminToken !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
            return res.send({msg: "Invalid Token"});
        } else {

            // req.user = verifiedToken;
            next();
        }
    } else {
        return res.send({msg: "User is not logged in"});
    }
}

module.exports = verifyAdmin;