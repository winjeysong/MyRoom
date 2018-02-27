/**
 * login
 */

const User = require('../models/user');
const { resultMsg } = require('./const');

async function userLogin(ctx) {
  const res = {
    flag: false,
    msg: resultMsg.LOGIN_USER_NOT_EXISTENCE,
  };
  // get value from request
  const { username, password } = ctx.request.body;

  // check user in database with mongoose
  await User.findOne({ username }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      ctx.body = res;
      // Object.defineProperty(ctx, 'body', { value: res });
    } else {
      ctx.body = password === user.password ? {
        flag: true,
        msg: resultMsg.LOGIN_SUCCESS,
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

module.exports = userLogin;
