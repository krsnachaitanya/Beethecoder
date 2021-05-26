const express = require('express');
const {
  protect,
  restrictTo,
} = require('../controllers/authenticationController');
const { stripePayment } = require('../controllers/paymentController');

const router = express();

router.use(protect);
router.use(restrictTo('user'));

router.route('/stripe').post(stripePayment);

module.exports = router;
