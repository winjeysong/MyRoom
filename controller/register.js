/**
 * register
 */

const bcrypt = require('bcrypt');
const User = require('../models/user');
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

module.exports = userRegister;
