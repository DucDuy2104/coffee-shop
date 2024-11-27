const express = require('express');
const router = express.Router();
const { createVoucher, deleteVoucher, getAllVouchers } = require('../controllers/vouchers')

// Tạo voucher
// route: http://localhost:8000/vouchers/create
// body: { code, discount }
router.post('/create', createVoucher);

// Xoá voucher
// route: http://localhost:8000/vouchers/delete
// body: { voucherId }
router.delete('/delete', deleteVoucher)

// Lấy tất cả voucher
// route: http://localhost:8000/vouchers
router.get('/', getAllVouchers)


module.exports = router;