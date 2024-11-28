const mongoose = require('mongoose');
const schema = mongoose.Schema;

const review = new schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    assets: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})



module.exports = mongoose.models.reviews || mongoose.model('review', review);