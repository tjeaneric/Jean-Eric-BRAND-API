const express = require('express');

const router = express.Router();
const articleController = require('../controllers/articleController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(authController.protect, articleController.getAllArticles)
  .post(authController.protect, articleController.createArticle);
router
  .route('/:id')
  .get(articleController.getOneArticle)
  .patch(authController.protect, articleController.updateArticle)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    articleController.deleteArticle
  );

module.exports = router;
