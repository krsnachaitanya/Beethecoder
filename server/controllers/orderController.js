const { Order } = require('../models/orderModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).populate(
    'user',
    '_id name'
  );

  if (!orders) return next(new AppError('No orders found!', 400));

  res
    .status(200)
    .json({ status: 'success', results: orders.length, data: { orders } });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create(req.body);
  if (!order) return next(new AppError('Order not placed', 400));
  res.status(200).json({ status: 'success', data: { order } });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'products.product',
    'name price'
  );
  if (!order) return next(new AppError('Order not found', 404));
  req.order = order;
  next();
});

exports.getOrderStatus = catchAsync(async (req, res, next) => {
  const orders = await Order.schema.path('status').enumValues();

  res
    .status(200)
    .json({ status: 'success', results: orders.length, data: { orders } });
});

exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(
    req.params.orderId,
    { status: req.body.status },
    {
      new: true,
    }
  );

  res.status(200).json({ status: 'success', data: { order } });
});
