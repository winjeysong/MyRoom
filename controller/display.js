/**
 * display user info
 */

const jwt = require('jwt-then');
const { jwt_secret } = require('../config/config');
const User = require('../models/user');

async function userDisplay(ctx) {
  const id = ctx.params.id;
  const token = ctx.headers.authorization;
  const payload = await jwt.verify(token.split(' ')[1], jwt_secret); // decode jwt payload
  // const payload = ctx.state.jwtdata;
  // decoded payload processed by koa-jwt, same as the value above
  const select = 'username email cellphone residence website';
  const user = await User.findById(id, select);
  if (user) {
    if (id === String(user._id) && payload.name === user.username) {
      ctx.body = user;
    }
  }
}

module.exports = userDisplay;
