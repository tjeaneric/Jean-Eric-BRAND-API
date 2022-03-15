const Article = require('../models/articleModel');
const factory = require('./handlerFactory');

exports.getAllArticles = factory.getAll(Article);
exports.getArticle = factory.getOne(Article, { path: 'comments' });
exports.createArticle = factory.createOne(Article);
exports.updateArticle = factory.updateOne(Article);
exports.deleteArticle = factory.deleteOne(Article);
