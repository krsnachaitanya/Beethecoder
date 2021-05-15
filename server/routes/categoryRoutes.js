const express = require('express');
const {
  protect,
  restrictTo,
} = require('../controllers/authenticationController');
const {
  getCategory,
  updateCategory,
  deleteCategory,
  createCategory,
  getAllCategories,
} = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getAllCategories);

router.use(protect);
router.use(restrictTo('admin'));

router.post('/', createCategory);
router
  .route('/:id')
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
