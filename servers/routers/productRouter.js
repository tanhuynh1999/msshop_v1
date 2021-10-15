const express = require('express');
const {
    uploadImageProduct
} = require('../common/uploadFile')

const productController = require('../app/controllers/ProductController');

const router = express.Router();
// *[GET]
router.get("/get-product", productController.getProduct);
// *[POST]
router.post("/product/create", uploadImageProduct('fileIMG'), productController.createProduct);

module.exports = router;