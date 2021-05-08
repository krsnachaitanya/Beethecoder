const mongoose = require('mongoose');

const productCartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
  },
  name: String,
  quantity: Number,
  Price: Number,
});

const orderSchema = new mongoose.Schema(
  {
    products: [productCartSchema],
    transactionId: {},
    amount: Number,
    address: String,
    status: {
      type: String,
      default: 'received',
      enum: ['cancelled', 'delivered', 'shipped', 'processing', 'received'],
    },
    updated: Date,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'You can not order with out user'],
    },
  },
  { timestamps: true }
);

const ProductCart = mongoose.model('ProductCart', productCartSchema);
const Order = mongoose.model('Order', orderSchema);
module.exports = { Order, ProductCart };
