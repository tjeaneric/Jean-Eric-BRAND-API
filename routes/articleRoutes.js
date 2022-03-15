const express = require('express');

const articleController = require('../controllers/articleController');
const authController = require('../controllers/authController');
const commentRouter = require('./commentRoutes');

const router = express.Router();

router.use('/:articleId/comments', commentRouter);

router
  .route('/')
  .get(articleController.getAllArticles)
  .post(authController.protect, articleController.createArticle);

router
  .route('/:id')
  .get(articleController.getArticle)
  .patch(authController.protect, articleController.updateArticle)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    articleController.deleteArticle
  );

module.exports = router;
