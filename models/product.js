const mongoose = require('mongoose');
const schema = mongoose.Schema;


const product = new schema({
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://qfautomation.b-cdn.net/uploads/no-product-found.png'
    },
    description: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    priceL: {
        type: Number,
        required: true
    },
    priceM: {
        type: Number,
        required: true
    },
    priceS: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.models.products || mongoose.model("product", product);
