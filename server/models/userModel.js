const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Make all strings be trimmed by default
mongoose.Schema.Types.String.set('trim', true);

const userSchema = new mongoose.Schema(
  {
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
      trim: false,
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
    passwordChangedAt: Date,
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    purchases: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const saltRounds = 12;
  this.password = await bcrypt.hash(this.password, saltRounds);
  this.confirmPassword = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  currentPassword,
  userPassword
) {
  return await bcrypt.compare(currentPassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
