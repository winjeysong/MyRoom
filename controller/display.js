/**
 * display user info
 */

const User = require('../models/user');

async function userDisplay(ctx) {
  const id = ctx.params.id;
  const select = 'username password email cellphone residence website';
  await User.findById(id, select, (err, user) => {
    if (err) {
      throw err;
    }
    if (user) {
      if (id === String(user._id)) {
        ctx.type = 'json';
        user.password = '******';
        ctx.body = user;
      }
    }
  });
}

module.exports = userDisplay;
