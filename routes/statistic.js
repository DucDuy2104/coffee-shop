const express = require('express');
const router = express.Router();
const { ordersStatistic, accountsStatistic } = require('../controllers/statistic');


// Thống kê đơn hàng
// route: http://localhost:8000/statistic/orders?year={year}
router.get('/orders', ordersStatistic)

// Thống kê tài khoản
// route: http://localhost:8000/statistic/accounts?year={year}
router.get('/accounts', accountsStatistic)

module.exports = router;