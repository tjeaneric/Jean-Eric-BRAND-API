const mongoose = require('mongoose');
const validator = require('validator');

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, 'The sender name required'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    comment: {
      type: String,
      required: [true, 'A comment can not be empty'],
    },
    createdAt: {
      type: Date,
      default: Date.now().toString(),
    },
    article: {
      type: mongoose.Schema.ObjectId,
      ref: 'Article',
      required: [true, 'A comment must belong to an Article!'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// commentSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'article',
//     select: 'title',
//   });
//   next();
// });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
