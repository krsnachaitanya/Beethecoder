const mongoose = require('mongoose');
const slugify = require('slugify');

mongoose.Schema.Types.String.set('trim', true);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name.'],
      maxlength: [45, 'Maximum length of a product name is 45 characters.'],
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please provide a description.'],
      maxlength: [2000, 'Maximum length of description is 2000 characters.'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price for product.'],
      maxlength: [10, 'Maximum length of price is 10 characters.'],
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

productSchema.pre('save', function (next) {
  const partialSlug = slugify(this.name, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  });
  this.slug = `${partialSlug}-${this._id}`;
  next();
});

// productSchema.pre(
//   /find\b|findOne\b|findOneAndUpdate\b|!findOneAndDelete\b/,
//   function (next) {
//     this.select('-__v -updatedAt -createdAt');
//     next();
//   }
// );

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
