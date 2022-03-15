const Comment = require('../models/commentModel');
const factory = require('./handlerFactory');

exports.setArticleCommentIds = (req, res, next) => {
  //Allow nested routes
  if (!req.body.article) req.body.article = req.params.articleId;
  next();
};

exports.getAllComments = factory.getAll(Comment);
exports.getComment = factory.getOne(Comment);
exports.createComment = factory.createOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
