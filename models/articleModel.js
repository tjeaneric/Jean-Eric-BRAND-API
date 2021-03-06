const mongoose = require('mongoose');
// const validator = require('validator');

const articleSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      // required: [true, 'An article must have a photo'],
      default: 'default.jpg',
    },
    title: {
      type: String,
      required: [true, 'An Article must have a title '],
      trim: true,
      maxlength: [
        100,
        'An Article title must have less or equal than 100 characters',
      ],
      minlength: [
        10,
        'An Article title must have more or equal than 10 characters',
      ],
      // validate: [
      //   validator.isAlphanumeric,
      //   'Article title must only contain Alpha Numeric characters',
      // ],
    },
    author: {
      type: String,
      trim: true,
      required: [true, 'An Article must have an Author'],
    },
    preview: {
      type: String,
      required: [true, 'An Article must have a preview'],
      trim: true,
    },
    body: {
      type: String,
      required: [true, 'An Article must have a body'],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now().toString(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Virtual populate
articleSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'article',
  localField: '_id',
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
