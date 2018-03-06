/**
 * post demo
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const postSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Post', postSchema);
