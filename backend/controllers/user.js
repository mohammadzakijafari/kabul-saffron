const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        let {username, email, password} = req.body;
        if(!username && !email && !password) {
            return res.send({ msg: "All fields username, email and password are required" });
        }
        let oldUser = await User.findOne({ email });
        if(oldUser) {
            return res.send({ msg: "User already exits, please register with a new email" })
        }
        
        let hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND));
        let newUser = await User.create({ username, email, password: hashedPassword });
        return res.status(200).send({ msg: "User Registered Successfully, please login", newUser});
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email && !password) {
            return res.send({msg: "Both email and password are required"});
        }
        let oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.send({msg: "User is not found, please register first"});
        }
        let isValidPassword = bcrypt.compare(password, oldUser.password);
        if (!isValidPassword) {
            return res.send({msg: "Password is wrong"});
        }

        // Generating payload and token
        let payload = {
            id: oldUser._id,
            username: oldUser.username
        }
        // Sign in and generating secret key
        let token = await jwt.sign(payload, process.env.SECRET_KEY);
        console.log(token);
        return res.status(200).send({msg: "Login successful, welcome", token});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal Server Error"});
    }
}

module.exports = { register, login };