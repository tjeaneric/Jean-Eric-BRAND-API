const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './env' });
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!, shutting down.....');
  console.log(err);
  process.exit(1);
});

const app = require('./app');

let DB;
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  DB = process.env.DB_DEV;
} else if (process.env.NODE_ENV === 'test') {
  // DB = process.env.DB_TEST;
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log('DB connected successfully!'));
} else if (process.env.NODE_ENV === 'production') {
  DB = process.env.DB_PROD;
} else DB = process.env.DB_DEV;

mongoose
  .connect(
    'mongodb+srv://jeanerix:K3X8OzJwmnwIXEs8@cluster0.yv9n2.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('DB connected successfully!'));

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}........`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!, shutting down.....');
  console.log(err.name, err.message);
  process.exit(1);
});

module.exports = server;
