const fs = require('fs');
const formidable = require('formidable');
const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { getOne, getAll, deleteOne } = require('./handlerFactory');

// ** Utility Functions

const readFilePromise = (file) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('⚠️  File not found');
      resolve(data);
    });
  });

const parseForm = (req) => {
  const form = new formidable.IncomingForm({ keepExtensions: true });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      const { path: filePath, name, size, type: contentType } =
        files.photo || {};
      if (size > 3000000) {
        reject(
          new AppError(
            'File size larger than 2mb is not allowed. Please try again',
            400
          )
        );
      }
      if (err) reject(new AppError(err.message, 400));
      else
        resolve({
          ...fields,
          photo: files.photo
            ? { filePath, size, contentType, name }
            : undefined,
        });
    });
  });
};

// ** Route Handlers

exports.createProduct = catchAsync(async (req, res, next) => {
  const doc = await parseForm(req);

  if (!doc) return next(new AppError(('Creating product failed.', 400)));

  if (doc.photo) {
    doc.photo.data = await readFilePromise(doc.photo.filePath);
  }

  const newProduct = await Product.create(doc);

  if (!newProduct) return next(new AppError(('Creating product failed.', 400)));

  res.status(200).json({
    status: 'success',
    data: { Product: newProduct },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const doc = await parseForm(req);

  if (!doc) return next(new AppError(('Updating product failed.', 400)));

  if (doc.photo) {
    doc.photo.data = await readFilePromise(doc.photo.filePath);
  }

  const product = await Product.findByIdAndUpdate(req.params.id, doc, {
    new: true,
  });

  if (!product) return next(new AppError(('Updating product failed.', 400)));

  res.status(200).json({
    status: 'success',
    data: { Product: product },
  });
});

exports.getAllProducts = getAll(Product);
exports.getProduct = getOne(Product);
exports.deleteProduct = deleteOne(Product);
