const express = require('express');
const multer = require('multer');

const articleController = require('../controllers/articleController');
const authController = require('../controllers/authController');
const commentRouter = require('./commentRoutes');

const router = express.Router();

const storageFile = multer.diskStorage({});
const upload = multer({
  storage: storageFile,
  file: articleController.fileFilter,
});

router.use('/:articleId/comments', commentRouter);

router
  .route('/')
  .get(articleController.getAllArticles)
  .post(
    authController.protect,
    upload.single('photo'),
    articleController.createArticle
  );

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
