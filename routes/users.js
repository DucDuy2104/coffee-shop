var express = require('express');
var router = express.Router();
var { updateUserInfo, getAllUser } = require('../controllers/users');

//Cập nhật thông in người dùng
//route: http://localhost:8000/users/update
//body: { userId, name, avatar }
router.put('/update', updateUserInfo);


// Lấy tất cả người dùng
// route: http://localhost:8000/users
router.get('/', getAllUser);

module.exports = router;
