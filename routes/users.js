var express = require('express');
var router = express.Router();
var { updateUserInfo, getAllUser, sendUpdatePassword, renderPasswordView, updatePassword } = require('../controllers/users');

//Cập nhật thông in người dùng
//route: http://localhost:8000/users/update
//body: { userId, name, avatar }
router.put('/update', updateUserInfo);


// Lấy tất cả người dùng
// route: http://localhost:8000/users
router.get('/', getAllUser);


// Gửi mail cập nhật mật khẩu
// route: http://localhost:8000/users/send-mail-update-password
// body: { userId }
router.put('/send-mail-update-password', sendUpdatePassword)

// Render cập nhật mật khẩu
// route: http://localhost:8000/user/update-pass-view?email={email}
router.get('/update-pass-view', renderPasswordView);


// Cập nhật mật khẩu
// route: http://localhost:8000/users/update-pass?email=${email}&newPass={newPassword}
router.get('/update-pass', updatePassword)


module.exports = router;
