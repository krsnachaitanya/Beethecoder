const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('User not found', 404));

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
