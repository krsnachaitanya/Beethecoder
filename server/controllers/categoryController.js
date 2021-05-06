const Category = require('../models/categoryModel');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');
const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require('./handlerFactory');

exports.getAllCategories = getAll(Category);
exports.createNewCategory = createOne(Category);
exports.getCategory = getOne(Category);
exports.updateCategory = updateOne(Category);
exports.deleteCategory = deleteOne(Category);
