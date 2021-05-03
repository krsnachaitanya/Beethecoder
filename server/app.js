const express = require('express');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

// Logging request information
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// body parser reading data from body to req.body
app.use(express.json({ limit: '10kb' }));

// mounting routes
app.use('/api/v1/users', userRouter);

// error handler for undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error handler
app.use(globalErrorHandler);

module.exports = app;
