const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Database connected successfully.'));

app.listen(process.env.PORT, () =>
  console.log(`👉 Listening on port: http://localhost:${process.env.PORT}`)
);
