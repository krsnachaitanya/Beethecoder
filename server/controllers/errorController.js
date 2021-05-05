const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  // operational error, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming error or other unknown error: don't leak error details to client
  } else {
    // console.error('Error ⚠️', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong! Please try again.',
    });
  }
};

const handlecastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const errKey = Object.keys(err.keyValue)[0];
  const errValue = Object.values(err.keyValue)[0];
  return new AppError(
    `'${errKey}' with a value of '${errValue}' already exists. Try again with a different value.`,
    400
  );
};

const handleValidationErrorDB = (err) => new AppError(err.message, 400);

const handleJWTError = () =>
  new AppError('Invalid token! Please login again.', 401);

const handleJWTExpiredError = () =>
  new AppError('Token expired! Please login again.', 401);

const globalErrorHandler = (err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // Assign manually, error.message is a non enumerable property
    let error = { message: err.message, ...err };

    if (error.value !== undefined && error.path !== undefined)
      error = handlecastErrorDB(error);

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    if (/validation failed/i.test(error._message))
      error = handleValidationErrorDB(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
