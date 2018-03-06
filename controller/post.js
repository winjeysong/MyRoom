/**
 * user posts
 */

// const User = require('../models/user');
const Post = require('../models/post');
const { postMsg } = require('./const');
const moment = require('moment');

async function postSave(ctx) {
  // get post title, content, and authorId
  const { postInfo, author } = ctx.request.body;

  await Post.findOne({ author });
  const addPost = new Post({
    author,
    title: postInfo.title,
    content: postInfo.content,
    date: moment().format('YYYY-MM-DD HH:mm'),
  });

  const newPost = await addPost.save();
  if (!newPost.errors) {
    ctx.body = {
      flag: true,
      msg: postMsg.POSTS_SAVE_SUCCESS,
    };
  }
}

async function postGet(ctx) {
  const id = ctx.params.id;
  // get all posts of one author(=user._id).
  await Post.find({ author: id }, (err, posts) => {
    ctx.body = posts;
  });
}

module.exports = {
  postSave,
  postGet,
};
