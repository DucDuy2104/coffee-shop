const express = require('express');
const router = express.Router();
const { register, verifyCode, login } = require('../controllers/auth')


// Đăng ký
// router: http://localhost:8000/auth/register
// body: { name, email, password}
router.post('/register', register);

// Xác minh
// router: http://localhost:8000/auth/verify?email={email}&code={code}
router.get('/verify', verifyCode);

// Đăng nhập
// router: http://localhost:8000/auth/login
// body: { email, password }
router.post('/login', login);


module.exports = router;