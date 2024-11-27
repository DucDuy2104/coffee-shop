const express = require('express')
const router = express.Router();
const { updateBanner } = require('../controllers/banners');

// Cập nhật banners
// route: http://localhost:8080/banners
// body: { banner, footer1, footer2 }
router.put('/update', updateBanner);

module.exports = router;