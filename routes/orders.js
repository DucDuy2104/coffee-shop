const express = require('express')
const router = express.Router()
const { createOrder, getAllOrders, getOrdersByUser, getOrderDetail,
    confirmOrder, shipOrder, completeOrder, cancelOrder, getOrderByStatus
 } = require('../controllers/orders')

// Tạo đơn hàng
// route: http://localhost:8000/orders/create
// body: { userId, voucherCode, addressId }
router.post('/create', createOrder)

// Lấy tất cả đơn hàng
// route: http://localhost:8000/orders
router.get('/', getAllOrders)

// Lấy đơn hàng theo người dùng
// route: http://localhost:8000/orders/user?userId={userId}
router.get('/user', getOrdersByUser)

// Lấy chi tiết đơn hàng
// route: http://localhost:8000/orders/detail/{orderId}
router.get('/detail/:orderId', getOrderDetail)

// Xác nhận đơn hàng
// route: http://localhost:8000/orders/confirm
// body: {orderId}
router.put('/confirm', confirmOrder)

// Chuyển sang đang giao
// route: http://localhost:8000/orders/ship
// body: {orderId}
router.put('/ship', shipOrder)

// Hoàn tất đơn hàng
// route: http://localhost:8000/orders/complete
// body: {orderId}
router.put('/complete', completeOrder)

// Hủy đơn hàng
// route: http://localhost:8000/orders/cancel
// body: {orderId}
router.put('/cancel', cancelOrder)

// Lấy đơn hàng theo trạng thái
// route: http://localhost:8000/orders/status?status={status}&userId={userId}
router.get('/status', getOrderByStatus)




module.exports = router;

