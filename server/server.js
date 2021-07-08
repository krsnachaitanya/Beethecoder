const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log({ error: err.name, message: err.message });
  console.log('⚠️  UNCAUGHT_EXCEPTION! Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './.env' });

const app = require('./app');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Database connected successfully.'));

const server = app.listen(process.env.PORT, () =>
  console.log(`👉 Listening on - http://localhost:${process.env.PORT}`)
);

process.on('unhandledRejection', (err) => {
  console.log({ error: err.name, message: err.massage });
  console.log('⚠️  UNHANDLED_REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
