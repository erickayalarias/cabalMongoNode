const mongoose = require('mongoose');
const validator = require('validator');

const PostsSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
    communities: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'communities',
      },
    ],
    type: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    likes: [
      {
        type: String,
      },
    ],
    file: {
      type: String,
    },
    comments: [
      {
        type: String,
      },
    ],
    publicationDate: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('posts', PostsSchema);
