const express = require('express');

const router = express.Router();
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');

router.route('/').post(messageController.createMessage);

router.use(authController.protect, authController.restrictTo('admin'));

router.route('/').get(messageController.getAllMessages);

router
  .route('/:id')
  .get(messageController.getOneMessage)
  .delete(messageController.deleteMessage);

module.exports = router;
