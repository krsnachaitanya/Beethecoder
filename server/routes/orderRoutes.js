const express = require('express');
const {
  protect,
  restrictTo,
} = require('../controllers/authenticationController');
const {
  getOrder,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateOrderStatus,
} = require('../controllers/orderController');
// const { updateStock } = require('../controllers/productController');
// const { pushOrderInPurchaseList } = require('../controllers/userController');

const router = express();

router.use(protect);
router.use(restrictTo('user'));

router.route('/').get(getAllOrders).post(createOrder);
router.get('/:id', getOrder);

router.use(restrictTo('admin'));

router.get('/status', getOrderStatus);
router.patch('/status/:orderId', updateOrderStatus);

module.exports = router;
