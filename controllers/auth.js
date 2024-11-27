const User = require('../models/user');
const { hashPassword, verifyPassword } = require('../utils/hash_password');
const { generateVerificationCode } = require('../utils/random_code');
const { sendEmail } = require('../utils/send_code');


exports.register = async (req, res) => {
    try {
        var { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: false, message: 'Email already exists' });
        }
        if(!name || !email || !password) { 
            return res.status(400).json({ status: false, message: 'Missing required fields' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)) {
            return res.status(400).json({ status: false, message: 'Invalid email format' });
        }

        if (password.length < 6) {
            return res.status(400).json({ status: false, message: 'Password must be at least 6 characters long' });
        }

        const hashedPassword = await hashPassword(password);

        const token = generateVerificationCode();
        const currentDate = new Date();
        const tokenExpiration = new Date(currentDate.getTime() + 15 * 60 * 1000);
        const user = await User.create({
            name, email, password: hashedPassword, token, tokenExpiration: tokenExpiration
        })

        sendEmail(email, name, token, `Xác minh tài khoản ${name}`)

        return res.status(200).json({ status: true, message: 'Registered successfully, please open yout mail box to verify your account' });

    } catch (error) {

    }
}


exports.verifyCode = async (req, res) => {
    try {
        const { email, code } = req.query;

        const user = await User.findOne({ email });
        if (user.isVerified) {
            return res.status(400).json({ status: false, message: 'Account has already been verified' });
        }

        if (!user || user.token !== code) {
            return res.status(400).json({ status: false, message: 'Invalid verification code' });
        }
        user.isVerified = true;
        await user.save();
        return res.redirect('http://localhost:8000/success');
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Server error' });
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: false, message: 'User not found' });
        }

        if (!user.isVerified) {
            const token = generateVerificationCode();
            const currentDate = new Date();
            const tokenExpiration = new Date(currentDate.getTime() + 15 * 60 * 1000);
            user.token = token;
            user.tokenExpiration = tokenExpiration;
            await user.save();
            await sendEmail(email, token, `Xác minh tài khoản ${user.name}`)
            return res.status(400).json({ status: false, message: 'Please verify your account, please open your mail box to verify your account' });
        }

        const isMatch = await verifyPassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: 'Incorrect password' });
        }

        const returnedUser = user.toObject();
        delete returnedUser.password;
        delete returnedUser.token;
        delete returnedUser.tokenExpiration;

        return res.status(200).json({ status: true, message: 'Login successfully', data: returnedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}