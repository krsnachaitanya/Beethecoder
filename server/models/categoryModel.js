const mongoose = require('mongoose');

mongoose.Schema.Types.String.set('trim', true);

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name.'],
      maxlength: [32, 'Maximum length of a category name is 32 characters.'],
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
