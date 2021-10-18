const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 200
    },
    image: {
        type: String,
        default: 'noimage.jpg'
    },
    code: {
        type: String,
        maxLength: 50,
        default: ''
    },
    view: {
        type: Number,
        default: 1,
        required: true
    },
    type: {
        type: Number,
        required: true
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
    follow: {
        type: Boolean,
        default: false,
        required: true
    },
    note: {
        type: Boolean,
        default: false,
        required: true
    },
    bin: {
        type: Boolean,
        default: false,
        required: true
    },
    active: {
        type: Boolean,
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
        default: 'tanhuynh'
    },
    userModified: {
        type: String,
        default: 'tanhuynh'
    },
});

module.exports = mongoose.model("Category", Category)