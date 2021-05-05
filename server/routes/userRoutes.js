const express = require('express');
const {
  signout,
  signup,
  signin,
  protect,
  // restrictTo,
} = require('../controllers/authenticationController');
const { getMe, getUser } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

// Protected routes
router.use(protect);

router.get('/me', getMe, getUser);
router.post('/signout', signout);

module.exports = router;
