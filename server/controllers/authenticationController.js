const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

// ** Utilities

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

// ** Middlewares

exports.protect = catchAsync(async (req, res, next) => {
  // get the token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if there is token available
  if (!token) return next(new AppError('Please signin to continue', 401));

  // verify the token and check if the token is expired
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check the user exists
  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError('User belonging to the token does not exist.', 401)
    );

  // check if password is not changed after issuing the token
  if (user.isPasswordChanged(decoded.iat))
    return next(
      new AppError('User changed password! Please login again.', 401)
    );

  // grant access to the protected route
  req.user = user;

  next();
});

exports.restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return next(
      new AppError('You do not have permission to perform this action.', 403)
    );

  next();
};

// ** Route handlers

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const user = await User.create({ name, email, password, confirmPassword });

  createSendToken(user, 201, res);
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exits first
  if (!email || !password)
    return next(new AppError('Please provide email and password', 400));

  // get the user and password
  const user = await User.findOne({ email: email }).select('+password');

  // check if user exists and password is correct
  if (!user || !(await user.isPasswordCorrect(password, user.password)))
    return next(new AppError('Please provide valid email and password', 401));

  // send token
  createSendToken(user, 200, res);
});

exports.signout = (req, res, next) => {
  res.clearCookie('token');
  res.status(200).json({
    status: 'success',
    message: 'This is sign out route.',
  });
};
