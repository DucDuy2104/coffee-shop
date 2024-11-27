const express = require('express');
const router = express.Router();
const { createAddress, deleteAddress, updateAddress, getUserAddresses } = require('../controllers/addresses');

// Tạo địa chỉ
// route: http://localhost:8000/addresses/create
// body: { userId, address, phone, recipientName }
router.post('/create', createAddress)

// Xoá địa chỉ
// route: http://localhost:8000/addresses/delete
// body: { addressId }
router.delete('/delete', deleteAddress)

// Sửa địa chỉ
// route: http://localhost:8000/addresses/update
// body: { addressId, phone, recipientName, address }
router.put('/update', updateAddress)

// Lấy danh sách địa chỉ của người dùng
// route: http://localhost:8000/addresses/{userId}
router.get('/user/:userId', getUserAddresses)

module.exports = router;