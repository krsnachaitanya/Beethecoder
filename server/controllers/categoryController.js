const Category = require('../models/categoryModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: { category },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!category) return next(new AppError('Category not found', 404));

  res.status(200).json({
    status: 'success',
    data: { category },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id, {
    select: 'name',
  });

  if (!category) return next(new AppError('Category not found', 404));

  res.status(200).json({
    status: 'success',
    message: `Collection: '${category.name}' deleted successfully.`,
  });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  res.status(201).json({
    status: 'success',
    data: { categories },
  });
});

exports.createNewCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { category },
  });
});
