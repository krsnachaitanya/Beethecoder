const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');

const app = express();

// * CORS
app.use(cors());

// * Logging request information
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// * Body parser reading data from body to req.body
app.use(express.json({ limit: '10kb' }));

// * Mounting routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);

// * Error handler for undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// * Global error handler
app.use(globalErrorHandler);

module.exports = app;
