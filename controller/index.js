/**
 * @index js
 */

const { userRegister, userLogin, userDisplay, userUpdate } = require('./user');
const { postSave, postsGet, postShow } = require('./post');

module.exports = {
  userRegister,
  userLogin,
  userDisplay,
  userUpdate,
  postSave,
  postsGet,
  postShow,
};
