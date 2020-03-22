const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const postSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    // username so posts can be kept
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    // so likes can be given only once
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      text: {
        type: String,
        required: true,
      },
      name: { type: String },
      avatar: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],

  date: { type: Date, default: Date.now },
});

module.exports = Post = mongoose.model('post', postSchema);
