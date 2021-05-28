const express = require('express');
const {
  protect,
  restrictTo,
} = require('../controllers/authenticationController');
const {
  stripePayment,
  getPaymentStatus,
} = require('../controllers/paymentController');

const router = express();

router.use(protect);
router.use(restrictTo('user'));

router.route('/stripe').post(stripePayment);
router.get('/sessions/:id', getPaymentStatus);

module.exports = router;
