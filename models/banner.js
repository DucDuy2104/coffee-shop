const mongoose = require('mongoose');
const schema = mongoose.Schema;

const banner = new schema({
    banner: {
        type: String,
        required: true
    },
    footer1: {
        type: String,
        required: true
    },
    footer2: {
        type: String,
        required: true
    }
})

module.exports = mongoose.models.banners || mongoose.model('banner', banner);