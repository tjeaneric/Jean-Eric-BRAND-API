const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

const articleRouter = require('./routes/articleRoutes');
const userRouter = require('./routes/userRoutes');

const commentRouter = require('./routes/commentRoutes');
const messageRouter = require('./routes/messageRoutes');

//1)GLOBAL MIDDLEWARES

//CORS ENABLED FOR ALL ORIGINS
app.use(cors());

//Set security HTTP headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!',
});
app.use('/api', limiter);

//Body parser, reading data from body into req.body
app.use(express.json());
app.use(cookieParser());

//Data sanitization against Nosql query injection
/*
example of NoSQL query injection
--------------------------------
{
  "email": {"$gt":""},
  password: "pass1234"const hpp = require('hpp');
}
*/
app.use(mongoSanitize());

//Data sanitization against XSS attacks
app.use(xss());

//Prevent parameter pollution
app.use(hpp());

//Test middleware
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});
//3)ROUTES
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to my API',
  });
});
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/messages', messageRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(`The address ${req.originalUrl} is wrong, try again!`, 404)
  );
});

//ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

//4)SERVER

module.exports = app;
