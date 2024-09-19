const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product");

router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);
router.post("/products/create", createProduct);
router.put("/products/update/:id", updateProduct);
router.delete("/products/delete/:id", deleteProduct);

module.exports = router;