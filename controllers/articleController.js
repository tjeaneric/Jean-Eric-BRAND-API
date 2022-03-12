const Article = require('../models/articleModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllArticles = catchAsync(async (req, res, next) => {
  //EXECUTE QUERRY
  const features = new APIFeatures(Article.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const articles = await features.query;

  //SENDING RESPONSE
  res.status(200).json({
    status: 'success',
    results: articles.length,
    data: {
      articles,
    },
  });
});

exports.getOneArticle = catchAsync(async (req, res, next) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return next(new AppError('No Article found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      article,
    },
  });
});

exports.createArticle = catchAsync(async (req, res, next) => {
  const newArticle = await Article.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      article: newArticle,
    },
  });
});

exports.updateArticle = catchAsync(async (req, res, next) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!article) {
    return next(new AppError('No Article found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      article,
    },
  });
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
  const article = await Article.findByIdAndDelete(req.params.id);

  if (!article) {
    return next(new AppError('No Article found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    message: 'Article deleted',
    data: null,
  });
});
