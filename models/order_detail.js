const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderDetail = new schema({
    order: {
        type: mongoose.Types.ObjectId,
        ref: 'order',
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
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.models.orderDetails || mongoose.model('orderDetail', orderDetail);