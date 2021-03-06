const mongoose = require('mongoose');
const config = require('config'); // found because of config module installed
const db = config.get('mongoURI');
console.log(db);

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true, // these 2 options because of deprecation warning
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.err(err.message);
    process.exit(1); // exit with failure
  }
};

module.exports = connectDB;
