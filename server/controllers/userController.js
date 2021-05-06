const User = require('../models/userModel');
const Order = require('../models/orderModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// ** Utilities

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('User not found', 404));

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

// ** Middlewares

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// ** Route Handlers

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword)
    return next(
      new AppError(
        'This route is not password updated. Please use /updateMyPassword',
        400
      )
    );

  // filter object to update only name and email
  const filteredObj = filterObj(req.body, 'name', 'email');

  const user = await User.findByIdAndUpdate(req.user.id, filteredObj, {
    new: true,
    runValidators: true,
  });

  if (!user)
    return next(new AppError('Unable to update user. Please try again.', 500));

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.userPurchaseList = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).populate(
    'user',
    'id name'
  );

  if (!orders) return next(new AppError('No order in this account', 400));

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: { orders },
  });
});

exports.pushOrderInPurchaseList = catchAsync(async (req, res, next) => {
  const purchases = [];
  req.body.order.products.forEach(
    (product) =>
      purchases.push[
        {
          id: product._id,
          name: product.name,
          description: product.description,
          category: product.category,
          quantity: product.quantity,
          amount: req.body.order.amount,
          transaction_id: req.body.order.transaction_id,
        }
      ]
  );

  // store this in db
  await User.findOneAndUpdate(
    { id: req.body.user.id },
    { $push: { purchases: purchases } },
    { new: true }
  );

  next();
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});
