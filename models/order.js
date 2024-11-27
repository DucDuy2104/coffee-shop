const mongoose = require('mongoose');
const schema = mongoose.Schema;

const order = new schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['ordered' ,'preparing', 'shipping', 'completed', 'cancelled'],
        default: 'ordered'
    },
    address: {
        type: mongoose.Types.ObjectId,
        ref: 'address',
        required: true
    },
    voucher: {
        type: mongoose.Types.ObjectId,
        ref: 'voucher',
        default: null
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


module.exports = mongoose.models.orders || mongoose.model('order', order);