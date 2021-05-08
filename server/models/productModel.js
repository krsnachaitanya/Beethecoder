const mongoose = require('mongoose');

mongoose.Schema.Types.String.set('trim', true);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name.'],
      maxlength: [32, 'Maximum length of a product name is 32 characters.'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description.'],
      maxlength: [2000, 'Maximum length of description is 2000 characters.'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price for product.'],
      maxlength: [32, 'Maximum length of price is 32 characters.'],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product must have category.'],
    },
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

productSchema.pre(
  /find\b|findOne\b|findOneAndUpdate\b|!findOneAndDelete\b/,
  function (next) {
    this.select('-photo -__v -updatedAt -createdAt');
    next();
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
