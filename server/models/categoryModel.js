const mongoose = require('mongoose');
const slugify = require('slugify');

mongoose.Schema.Types.String.set('trim', true);

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name.'],
      maxlength: [32, 'Maximum length of a category name is 32 characters.'],
      unique: true,
    },
    slug: String,
  },
  { timestamps: true }
);

categorySchema.pre('save', function (next) {
  const partialSlug = slugify(this.name, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  });
  this.slug = `${partialSlug}-${this._id}`;
  next();
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
