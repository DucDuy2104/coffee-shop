const express = require('express');
const router = express.Router();
const { createReview, getReviewsByUser, getReviewsByProduct, deleteReview } = require('../controllers/reviews')

// Tạo đánh giá
// route: http://localhost:8000/reviews/create
// body: { userId, productId, rating, content, assets }
router.post('/create', createReview)

// Lấy tất cả đánh giá của người dùng
// route: http://localhost:8000/reviews/user/{userId}
router.get('/user/:userId', getReviewsByUser)

// Lấy tất cả đánh giá của sản phẩm
// route: http://localhost:8000/reviews/product/{productId}
router.get('/product/:productId', getReviewsByProduct)

// Xoá đánh giá
// route: http://localhost:8000/reviews/delete
// body: { reviewId }
router.delete('/delete', deleteReview)


module.exports = router;
