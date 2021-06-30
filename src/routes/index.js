const { Router } = require('express');

const router = Router();
const { getProducts, getProductById, createProduct, deleteProduct, updateProduct } = require('../controllers/products.controller');







//products routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);


module.exports = router;