/**
 * user posts
 */

const moment = require('moment');
const jwt = require('jwt-then');
const { jwt_secret } = require('../config/config');
const Post = require('../models/post');
const { postMsg } = require('./const');

async function postSave(ctx) {
  // get post title, content, and authorId
  const { postInfo, author } = ctx.request.body;
  const token = ctx.headers.authorization;
  const payload = await jwt.verify(token.split(' ')[1], jwt_secret); // decode jwt payload
  // const payload = ctx.state.jwtdata; // decoded payload processed by koa-jwt

  await Post.findOne({ author });
  const addPost = new Post({
    username: payload.name,
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

async function postsGet(ctx) {
  const token = ctx.headers.authorization;
  const payload = await jwt.verify(token.split(' ')[1], jwt_secret); // decode jwt payload
  // const payload = ctx.state.jwtdata; // decoded payload processed by koa-jwt
  const id = ctx.params.id;
  // get all posts of one author(=user._id).
  await Post.find({ author: id }, (err, posts) => {
    if (token) {
      if (posts.length === 0) {
        ctx.body = [{
          content: '欢迎来到新家，开始写一篇新文章吧！',
        }];
      } else if (payload.name === posts[0].username) {
        ctx.body = posts;
      }
    }
  });
}

async function postShow(ctx) {
  const token = ctx.headers.authorization;
  const payload = await jwt.verify(token.split(' ')[1], jwt_secret); // decode jwt payload
  // const payload = ctx.state.jwtdata; // decoded payload processed by koa-jwt
  const postId = ctx.params.postid;
  const select = 'title date content username';
  await Post.findById(postId, select, (err, post) => {
    if (token) {
      if (payload.name === post.username) {
        ctx.body = post;
      }
    } else {
      ctx.body = {
        title: 'No Data.',
        date: '',
        content: 'No Data.',
      };
    }
  });
}

module.exports = {
  postSave,
  postsGet,
  postShow,
};
