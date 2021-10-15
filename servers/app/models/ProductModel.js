const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 200
    },
    image: {
        type: String,
        default: 'noimage.png'
    },
    code: {
        type: String,
        maxLength: 50,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    view: {
        type: Number,
        default: 1
    },
    describe: {
        type: String,
        maxLength: 500,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    percentDiscount: {
        type: Number,
        default: 0
    },
    follow: {
        type: Boolean,
        default: false
    },
    note: {
        type: Boolean,
        default: false,
        required: true,
    },
    bin: {
        type: Boolean,
        default: false,
        required: true
    },
    active: {
        type: String,
        default: true,
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateModified: {
        type: Date,
        default: Date.now,
        required: true
    },
    userCreate: {
        type: String,
        default: 'tanhunh'
    },
    userModified: {
        type: String,
        default: 'tanhunh'
    },
});

module.exports = mongoose.model("Product", Product)