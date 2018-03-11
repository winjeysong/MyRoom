/**
 * @index js
 */

const { userRegister, userLogin, userDisplay, userUpdate } = require('./user');
const { postSave, postsGet, postShow, postUpdate } = require('./post');

module.exports = {
  userRegister,
  userLogin,
  userDisplay,
  userUpdate,
  postSave,
  postsGet,
  postShow,
  postUpdate,
};
