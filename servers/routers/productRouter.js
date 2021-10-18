const express = require('express');
const {
    uploadImageProduct
} = require('../common/uploadFile')

const productController = require('../app/controllers/ProductController');

const router = express.Router();
// *[GET]
router.get("/get-product", productController.getProduct);
router.get("/product/category/get", productController.getCategory);
router.get("/product/category/group", productController.getProductCategory);

// *[POST]
router.post("/product/create", uploadImageProduct('fileIMG'), productController.createProduct);
router.post("/product/category/create", productController.createCategory);

module.exports = router;