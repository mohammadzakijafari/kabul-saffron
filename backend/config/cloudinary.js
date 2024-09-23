const cloudinary = require('cloudinary').v2;
require("dotenv").config();

// const connectCloudinary = async () => {
//     console.log(`Cloudinary API = ${process.env.CLOUDINARY_API_KEY}`);
//     cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_SECRET_KEY,
//     });
// };

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

module.exports = cloudinary;