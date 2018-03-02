/**
 * display user info
 */

const User = require('../models/user');

async function userDisplay(ctx) {
  const id = ctx.params.id;
  const select = 'username email cellphone residence website';
  await User.findById(id, select, (err, user) => {
    if (user) {
      if (id === String(user._id)) {
        ctx.body = user;
      }
    }
  });
}

module.exports = userDisplay;
