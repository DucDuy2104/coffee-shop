const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    token: {
        type: String
    },
    tokenExpiration: {
        type: Date
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    isVerified: {
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



module.exports = mongoose.models.users || mongoose.model("user", user);