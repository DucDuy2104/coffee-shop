const User = require('../models/user');


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