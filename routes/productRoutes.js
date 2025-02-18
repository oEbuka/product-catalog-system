const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.get('/category-analysis', productController.getCategoryAnalysis);
router.get('/product-stats', productController.getProductStatistics)

module.exports = router;