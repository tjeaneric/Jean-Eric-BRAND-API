const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!, shutting down.....');
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected successfully!'));

const port = 8080;
app.listen(port, () => {
  console.log(`app running on port ${port}........`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!, shutting down.....');
  console.log(err.name, err.message);
  process.exit(1);
});
