/**
 * user operation with login, register, info display
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtThen = require('jwt-then');
const User = require('../models/user');
const { jwt_secret } = require('../config/config');
const { resultMsg } = require('./const');

async function userRegister(ctx) {
  const { username, email, password, residence, cellphone, website } = ctx.request.body;
  const res = {
    flag: false,
    msg: resultMsg.REGISTER_FAILURE,
  };

  const hash = await bcrypt.hash(password, 10); // hash password with bcrypt
  const user = await User.findOne({ username });
  // check if the username is already exsited
  if (!user) {
    const addUser = new User({
      username,
      email,
      password: hash,
      residence,
      cellphone,
      website,
    });

    const newUser = await addUser.save();
    if (!newUser.errors) {
      ctx.body = {
        flag: true,
        msg: resultMsg.REGISTER_SUCCESS,
      };
    } else {
      ctx.body = res;
    }
  } else {
    ctx.body = {
      ...res,
      msg: resultMsg.REGISTER_USER_EXISTED,
    };
  }
}

async function userLogin(ctx) {
  const res = {
    flag: false,
    msg: resultMsg.LOGIN_USER_NOT_EXISTENCE,
  };
  // get value from request
  const { username, password } = ctx.request.body;

  if (username) {
    const userToken = {
      name: username,
    };
    // generate jwt
    const token = jwt.sign(userToken, jwt_secret, { expiresIn: '1h' });

    // check user in database with mongoose
    const user = await User.findOne({ username });
    if (!user) {
      ctx.body = res;
    } else {
      // compare the original password with hash password
      const compare = await bcrypt.compare(password, user.password);
      ctx.body = compare ? {
        flag: true,
        msg: resultMsg.LOGIN_SUCCESS,
        id: user._id,
        token,
      } : {
        ...res,
        msg: resultMsg.LOGIN_PASSWD_ERR,
      };
    }
  }
}

async function userDisplay(ctx) {
  const id = ctx.params.id;
  const token = ctx.headers.authorization;
  const payload = await jwtThen.verify(token.split(' ')[1], jwt_secret); // decode jwt payload
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

module.exports = {
  userRegister,
  userLogin,
  userDisplay,
};
