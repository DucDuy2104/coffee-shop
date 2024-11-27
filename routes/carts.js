const express = require('express')
const router = express.Router();
const { addToCart, getCarts, deleteCart, increQuantity, decreQuantity } = require('../controllers/carts')

// Thêm vào giỏ hàng
// route: http://localhost:8000/carts/add
// body: { userId, productId, size, quantity }
router.post('/add', addToCart)

// Lây giỏ hàng
// route: http://localhost:8000/carts?userId={userId}
router.get('/', getCarts);

// Xoá sản phẩm khỏi giỏ hàng
// route: http://localhost:8000/carts/delete
// body: { cartId }
router.delete('/delete', deleteCart);


// Tăng số lượng
// route: http://localhost:8000/carts/incre
// body: { cartId }
router.put('/incre', increQuantity);

// Giảm số lượng
// route: http://localhost:8000/carts/decre
// body: { cartId }
router.put('/decre', decreQuantity);


// Làm trống giỏ hàng
// route: http://localhost:8000/carts/clear/{userId}
router.delete('/clear/:userId', deleteCart);

module.exports = router;