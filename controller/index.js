/**
 * @index js
 */

const { userRegister, userLogin, userDisplay } = require('./user');
const { postSave, postsGet, postShow } = require('./post');

module.exports = {
  userRegister,
  userLogin,
  userDisplay,
  postSave,
  postsGet,
  postShow,
};
