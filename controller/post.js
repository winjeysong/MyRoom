/**
 * user posts
 */

const moment = require('moment');
const jwt = require('jwt-then');
const { jwt_secret } = require('../config/config');
const Post = require('../models/post');
const { postMsg, authMsg } = require('./const');

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
      msg: postMsg.SAVE_POST_SUCCESS,
    };
  }
}

async function postsGet(ctx) {
  const token = ctx.headers.authorization;
  const payload = await jwt.verify(token.split(' ')[1], jwt_secret); // decode jwt payload
  // const payload = ctx.state.jwtdata; // decoded payload processed by koa-jwt
  const id = ctx.params.id;
  const res = {
    flag: false,
    msg: authMsg.AUTH_FAILURE,
  };
  // get all posts of one author(=user._id).
  const posts = await Post.find({ author: id }).sort({ date: -1 });
  if (token) {
    if (posts.length === 0) {
      ctx.body = [{
        content: '欢迎来到新家，开始写一篇新文章吧！',
      }];
    } else if (payload.name === posts[0].username) {
      ctx.body = posts;
    } else {
      ctx.body = res;
    }
  } else {
    ctx.body = res;
  }
}

async function postShow(ctx) {
  const token = ctx.headers.authorization;
  const payload = await jwt.verify(token.split(' ')[1], jwt_secret); // decode jwt payload
  // const payload = ctx.state.jwtdata; // decoded payload processed by koa-jwt
  const postId = ctx.params.postid;
  const select = 'title date content username';
  const post = await Post.findById(postId, select);
  if (post) {
    if (token) {
      if (payload.name === post.username) {
        ctx.body = post;
      }
    }
  } else if (!post) {
    ctx.body = {
      title: 'No Data.',
      date: '',
      content: 'No Data.',
    };
  }
}

async function postUpdate(ctx) {
  const postId = ctx.params.postid;
  const { title, content } = ctx.request.body;
  const token = ctx.headers.authorization;
  const payload = await jwt.verify(token.split(' ')[1], jwt_secret); // decode jwt payload
  const oldPost = await Post.findById(postId, 'username');
  if (token) {
    if (payload.name === oldPost.username) {
      await Post.findByIdAndUpdate(postId, {
        title,
        content,
        date: moment().format('YYYY-MM-DD HH:mm'),
      });

      ctx.body = {
        flag: true,
        msg: postMsg.MODIFY_POST_SUCCESS,
      };
    }
  }
}

async function postDelete(ctx) {
  const postId = ctx.params.postid;
  const token = ctx.headers.authorization;
  const payload = await jwt.verify(token.split(' ')[1], jwt_secret); // decode jwt payload
  const post = await Post.findById(postId, 'username');
  const res = {
    flag: false,
    msg: authMsg.AUTH_FAILURE,
  };
  if (token) {
    if (payload.name === post.username) {
      await Post.findByIdAndRemove(postId);

      ctx.body = {
        flag: true,
        msg: postMsg.DELETE_POST_SUCCESS,
      };
    } else {
      ctx.body = res;
    }
  } else {
    ctx.body = res;
  }
}


module.exports = {
  postSave,
  postsGet,
  postShow,
  postUpdate,
  postDelete,
};
