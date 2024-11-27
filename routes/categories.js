const express = require('express');
const router = express.Router();
const { createCategory,
    getAllCategory,
    getCategoryWithProducts,
    update,
    deleteCategory } = require('../controllers/categories');


// Tạo danh mục
// route: http://localhost:8000/categories/create
// body: { name }
router.post('/create', createCategory)

// Lây tất cả danh mục
// route: http://localhost:8000/categories
router.get('/', getAllCategory)

// Lấy tất cả danh mục với sản phẩm
// route: http://localhost:8000/categories/with-products
router.get('/with-products', getCategoryWithProducts)

// Cập nhật danh mục
// route: http://localhost:8000/categories/update
// body: { name, categoryId }
router.put('/update', update)

// Xoá danh mục ( xoá cả sản phẩm của danh mục )
// route: http://localhost:8000/categories/delete
// body: { categoryId }
router.delete('/delete', deleteCategory)

module.exports = router;