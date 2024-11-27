const mongoose = require('mongoose')
const schema = mongoose.Schema;

const cart = new schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true
    },
    size: {
        type: String,
        required: true
    }, 
    total: {
        type: Number,
        required: true,
        default: 0
    },
    quantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.models.carts || mongoose.model('cart', cart);