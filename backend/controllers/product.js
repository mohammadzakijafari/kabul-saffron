const Product = require("../models/product");
const cloudinary = require('cloudinary').v2;

// Getting all Listings from DB
const getAllProducts = async (req, res) => {
    try {
        let product = await Product.find();
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal Server Error"});
    }
}

// Getting all products from DB
const getSingleProduct = async (req, res) => {
    try {
        let id = req.params.id;
        let product = await Product.findById({_id: id});
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal Server Error"});
    }
};

// Creating a Listing to the DB
const createProduct = async (req, res) => {
    try {
        const {
            productName,
            description,
            regularPrice,
            discountPrice,  
            productFeature,
            addedBy,
            isAvailable,
        } = req.body;

        // let clientData = req.body;
        addedBy = req.user.id;
        const image1 = req.files.image1 &&  req.files.image1[0];
        const image2 = req.files.image2 &&  req.files.image2[0];
        const image3 = req.files.image3 &&  req.files.image3[0];
        const image4 = req.files.image4 &&  req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((image) => image !== undefined);

        let imageUrl = await Promise.all(
            images.map( async(image) => {
                let result = await cloudinary.uploader.upload(image.path, {resource_type: 'image'});
                //console.log(result.secure_url);
                return result.secure_url;
            })
        )

        const productData = {
            productName,
            description,
            regularPrice,
            discountPrice,
            productFeature,
            addedBy,
            images: imageUrl,
        }
        console.log("Images ------", imageUrl);
        res.json({});
        // console.log(req.user.id);
        // let addedBy = req.user.id;
        // let CompleteProductData = {
        //     ...clientData,
        //     addedBy
        // };
        let newProduct = await Product.create(productData);
        res.status(200).send({ msg: "New Product Created Successfully", newProduct });
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal Server Error"});
    }
}

// Updating a Listing in DB
const updateProduct = async (req, res) => {
    try {
        let updateProductId = req.params.id;
        let updateProductData = req.body;
        let updateProduct = await Product.findOne({_id: updateProductId});
        if (updateProduct) {
            await Product.findByIdAndUpdate(updateProductId, updateProductData);
            res.status(200).send({ msg: "Product Updated Successfully" });
        } else {
            return res.send({ msg: "Product is not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal Server Error"});
    }
}

// Deleting a Listing in DB
const deleteProduct = async (req, res) => {
    try {
        let deleteProductId = req.params.id;
        console.log(deleteId);
        let deleteProduct = await Product.findOne({_id: deleteProductId});
        if (deleteProduct) {
            await Product.findOneAndDelete({_id: deleteProductId});
            res.status(200).send({ msg: "Product Deleted Successfully" });
        } else {
            return res.send({ msg: "Product is not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal Server Error"});
    }
}

module.exports = { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct }