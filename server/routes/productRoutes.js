const express = require('express');

const {
  protect,
  restrictTo,
} = require('../controllers/authenticationController');
const {
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductPhoto,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.get('/:id/photo', getProductPhoto);

router.use(protect);
router.use(restrictTo('admin'));

router.post('/', createProduct);
router.route('/:id').patch(updateProduct).delete(deleteProduct);

module.exports = router;
