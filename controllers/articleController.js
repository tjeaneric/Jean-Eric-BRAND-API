// const multer = require('multer');
// const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
const Article = require('../models/articleModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'dev-data/img/articles');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `article-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an image, Please upload only images', 400), false);
//   }
// };

// const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// exports.uploadFile = async (req, res) => {
//   let imageUrl = '';
//   await cloudinary.uploader.upload(req.file.path, (error, image) => {
//     if (error) {
//       console.log(error);
//       res.send(error);
//     } else {
//       imageUrl = image.url;
//     }
//   });
//   return imageUrl;
// };

// exports.uploadArticlePhoto = upload.single('photo');
// exports.resizeArticlePhoto = (req, res, next) => {
//   if (!req.file) return next();
//   req.file.filename = `article-${req.user.id}-${Date.now()}.jpeg`;
//   sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(`dev-data/img/articles/${req.file.filename}`);

//   next();
// };

exports.uploadFile = async (req, res) => {
  let imageUrl = '';
  await cloudinary.uploader.upload(req.file.path, (error, image) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      imageUrl = image.url;
    }
  });
  return imageUrl;
};

exports.fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image, Please upload only images', 400), false);
  }
};

exports.getAllArticles = factory.getAll(Article);
exports.getArticle = factory.getOne(Article, { path: 'comments' });
exports.createArticle = factory.createOne(Article);
exports.updateArticle = factory.updateOne(Article);
exports.deleteArticle = factory.deleteOne(Article);
