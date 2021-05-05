const express = require('express');
const {
  signout,
  signup,
  signin,
  protect,
  restrictTo,
} = require('../controllers/authenticationController');
const {
  getMe,
  getUser,
  getAllUsers,
  updateMe,
  userPurchaseList,
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

// ** Protect routes
router.use(protect);

router.get('/me', getMe, getUser);
router.patch('/updateMe', updateMe);
router.post('/signout', signout);
router.get('/orders', userPurchaseList);

// ** Admin routes
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers);

module.exports = router;
