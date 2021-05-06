const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// ** Utilities

const noDocFound = new AppError(
  'Document not found, please search again with different ID',
  404
);

const jsonSuccessResponse = (res, status, data, message) =>
  res.status(status).json({
    status: 'success',
    message: message || undefined,
    results: data.length > 1 ? data.length : undefined,

    data: { documents: data },
  });

// ** Handler Factory Functions

// * Get all the documents from the collection
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find();

    jsonSuccessResponse(res, 200, doc);
  });

// * Create a document in a collection
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (!doc) return next(noDocFound);

    jsonSuccessResponse(res, 201, doc);
  });

// * Get a document by ID param
exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) return next(noDocFound);

    jsonSuccessResponse(res, 200, doc);
  });

// * Update a document by ID param
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doc) return next(noDocFound);

    jsonSuccessResponse(res, 200, doc);
  });

// * Delete a document by ID param
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id, {
      select: 'name',
    });

    if (!doc) return next(noDocFound);

    const message = `Document: '${doc.name}' deleted successfully.`;
    jsonSuccessResponse(res, 200, doc, message);
  });
