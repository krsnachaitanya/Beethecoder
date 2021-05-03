const mongoose = require('mongoose');
const validator = require('validator');

// Make all strings be trimmed by default
mongoose.Schema.Types.String.set('trim', true);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    minlength: [8, 'User name length must be between 8 and 40 characters.'],
    maxlength: [40, 'User name length must be between 8 and 40 characters.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email address.'],
  },
  userInfo: String,
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords do not match!',
    },
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  purchases: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
