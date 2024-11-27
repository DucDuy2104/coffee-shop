const mongoose  = require('mongoose')
const schema = mongoose.Schema;


const voucher = new schema({
    code: {
        type: String,
        required: true,
        unique: true
    }, 
    discount: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.models.vouchers || mongoose.model('voucher', voucher);