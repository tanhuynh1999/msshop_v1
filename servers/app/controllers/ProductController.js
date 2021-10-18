const productModel = require('../models/ProductModel');
const categoryModel = require('../models/CategoryModel');
const productCategoryModel = require('../models/ProductCategory');
const {
    typeCategory
} = require('../../common/type');

class ProductController {
    // *[GET]
    getProduct = (req, res, next) => {
        productModel.find({
            bin: false,
            active: true
        }, function (err, data) {
            res.json({
                data: data,
                success: true
            });
        }).sort({
            dateCreate: -1
        })
    }

    getCategory = function (req, res) {
        categoryModel.find({
            bin: false,
            active: true,
            type: typeCategory.PRODUCT
        }, function (err, data) {
            res.json({
                data: data,
                success: true
            });
        }).sort({
            name: -1
        }).projection({
            _id: 1,
            name: 1
        })
    }

    getProductCategory = (req, res) => {
        productCategoryModel.find({
            active: true,
        }, function (err, data) {
            res.json({
                data: data,
                success: true
            });
        }).projection({
            _id: 1,
            idProduct: 1,
            idCategory: 1
        })
    }

    // *[POST]

    createProduct = (req, res) => {

        const productNew = new productModel(req.query);
        productNew.image = req.file.filename;

        this.groupProductCategory(productNew._id, req.query.category);
        productNew.save();

        res.json({
            success: true
        })
    }

    createCategory = (req, res) => {
        const categoryNew = new categoryModel(req.query);
        categoryNew.type = typeCategory.PRODUCT;
        categoryNew.save();

        res.json({
            success: true
        })
    }

    checkError = (query) => {
        const checkUser = 'tanhuynh';
        if (query.userAPI == checkUser) {
            return true;
        }
        return false;
    }

    // ! GROUP
    groupProductCategory = (idProduct, arrIdCategory) => {
        for (let i = 0; i < arrIdCategory.length; i++) {
            const productCategoryNew = new productCategoryModel();
            productCategoryNew.idProduct = idProduct;
            productCategoryNew.idCategory = arrIdCategory[i];
            productCategoryNew.save();
        }
    }
}

module.exports = new ProductController();