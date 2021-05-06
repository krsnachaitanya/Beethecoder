const express = require('express');
const {
  protect,
  restrictTo,
} = require('../controllers/authenticationController');
const {
  getCategory,
  updateCategory,
  deleteCategory,
  createNewCategory,
  getAllCategories,
} = require('../controllers/categoryController');

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.route('/').get(getAllCategories).post(createNewCategory);
router
  .route('/:id')
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
