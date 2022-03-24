const mongoose = require('mongoose');
const validator = require('validator');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Your name is required!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  subject: {
    type: String,
    required: [true, 'Subject is required!'],
  },
  message: {
    type: String,
    required: [true, 'Please the message cannot be empty'],
    maxlength: [500, 'A message must be below 500 characters'],
    minlength: [10, 'A message must be above 10 characters'],
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
