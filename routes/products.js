const express = require('express');
const router = express.Router();
const { createProduct, 
    updateProduct, 
    deleteProduct, 
    getAllProducts, 
    getProductsByCategory, 
    search } = require('../controllers/products')

// Tạo sản phẩm
// route: http://localhost:8000/products/create
// body: { name, description, image, categoryId, priceL, priceM, priceH }
router.post('/create', createProduct)


// Cập nhật sản phẩm
// route: http://localhost:8000/products/update
// body: { name, description, priceL, priceM, priceS, image }
router.put('/update', updateProduct)

// Xoá sản phẩm
// route: http://localhost:8000/products/delete
// body: { productid }
router.delete('/delete', deleteProduct)


// Lấy tất cả sản phẩm
// route: http://localhost:8000/products
router.get('/', getAllProducts)

// Lấy sản phẩm theo danh mục
//route: http://localhost:8000/products/{categoryId}
router.get('/:categoryId', getProductsByCategory)

// Tìm kiếm sản phẩm
// route: http://localhost:8000/products/search?query={query}
router.get('/search', search)

module.exports = router;