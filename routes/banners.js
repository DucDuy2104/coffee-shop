const express = require('express')
const router = express.Router();
const { updateBanner, getBanners } = require('../controllers/banners');

// Cập nhật banners
// route: http://localhost:8080/banners/update
// body: { banner, footer1, footer2 }
router.put('/update', updateBanner);

// Lấy banner
// route: http://localhost:8080/banners/
router.get('/', getBanners )

module.exports = router;