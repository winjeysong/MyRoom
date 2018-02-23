/**
 * register
 */
const User = require('../models/user');
const { resultMsg } = require('./const');

async function userRegister(ctx) {
  const { username, email, password, cellphone, website } = ctx.request.body;
  const res = {
    flag: false,
    msg: resultMsg.REGISTER_FAILURE,
  };

  const user = await User.findOne({ username });
  // check if the username is already exsited
  if (!user) {
    const addUser = new User({
      username,
      email,
      password,
      cellphone,
      website,
    });

    await addUser.save((err) => {
      if (err) {
        Object.defineProperty(ctx, 'body', { value: res });
      } else {
        Object.defineProperty(ctx, 'body', {
          value: {
            flag: true,
            msg: resultMsg.REGISTER_SUCCESS,
          },
        });
      }
    });
  } else {
    Object.defineProperty(ctx, 'body', {
      value: {
        ...res,
        msg: resultMsg.REGISTER_USER_EXISTED,
      },
    });
  }
}

module.exports = userRegister;
