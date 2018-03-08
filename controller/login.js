/**
 * login
 */

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { resultMsg } = require('./const');
const { jwt_secret } = require('../config/config');

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
    await User.findOne({ username }, (err, user) => {
      if (!user) {
        ctx.body = res;
        // Object.defineProperty(ctx, 'body', { value: res });
      } else {
        ctx.body = password === user.password ? {
          flag: true,
          msg: resultMsg.LOGIN_SUCCESS,
          id: user._id,
          token,
        } : {
          ...res,
          msg: resultMsg.LOGIN_PASSWD_ERR,
        };
        // Object.defineProperty(ctx, 'body', {
        //   value: password === user.password ? {
        //     flag: true,
        //     msg: resultMsg.LOGIN_SUCCESS,
        //   } : {
        //     ...res,
        //     msg: resultMsg.LOGIN_PASSWD_ERR,
        //   },
        // });
      }
    });
  }
}

module.exports = userLogin;
