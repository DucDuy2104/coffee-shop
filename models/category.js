const mongoose = require('mongoose');
const schema = mongoose.Schema;

const category = new schema({
    name: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
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



module.exports = mongoose.models.categories || mongoose.model("category", category);