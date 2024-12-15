const User = require('../models/user');
const { sendUpdatePassword } = require('../utils/send_update_pass');
const {hashPassword} = require('../utils/hash_password');
const path = require('path');


exports.updateUserInfo = async (req, res) => {
    try {
        const { userId, name, avtar} = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        if(name) {
            user.name = name;
        }
        if(avtar) {
            user.avatar = avtar;
        }
        user.updatedAt = new Date();
        const updatedUser = await user.save();
        return res.status(200).json({ status: true, message: 'Updated user successfully', data: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
        
    }
}

exports.getAllUser =  async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ status: true, message: 'Users fetched successfully', data: users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.sendUpdatePassword = async (req, res) => {
    try {
        const {userId} = req.body;
        if(!userId) {
            return res.status(404).json({ status: false, message: 'User not found!' });
        }
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ status: false, message: 'User not found!' });
        }
        const email = user.email;
        const name = user.name;
        sendUpdatePassword(email, name, 'Cập nhật mật khẩu');
        return res.status(200).json({ status: true, message: 'Một email đã được gửi đến địa chỉ email của bạn.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.renderPasswordView = async (req, res) => {
    try {
        const email = req.query.email;
        const viewsPath = path.join(__dirname, '..', 'views')
        return res.render(path.join(viewsPath, 'reset_pass'), {
            email: email
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

exports.updatePassword = async (req, res) => {
    try {
        var { email, newPass } = req.query;
        newPass = await hashPassword(newPass); 
        const user = await User.findOneAndUpdate({ email: email }, { password:  newPass}, { new: true });
        if(!user) {
            return res.status(404).json({ status: false, message: 'User not found!' });
        }
        const viewsPath = path.join(__dirname, '..', 'views')
        return res.render(path.join(viewsPath, 'update_pass_success'));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}