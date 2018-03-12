/**
 * constants
 */

module.exports = {
  resultMsg: {
    REGISTER_FAILURE: '注册未成功，请重新注册',
    REGISTER_USER_EXISTED: '该用户已存在，请登陆或更换用户名',
    REGISTER_SUCCESS: '注册成功',
    LOGIN_USER_NOT_EXISTENCE: '用户不存在，请注册',
    LOGIN_SUCCESS: '登陆成功',
    LOGIN_PASSWD_ERR: '密码错误，请重新输入',
    MODIFY_USER_INFO_SUCCESS: '资料修改成功，请重新登陆',
    MODIFY_PASSWD_NOT_EQUAL: '校验失败，请重新输入原密码',
  },
  postMsg: {
    SAVE_POST_SUCCESS: '文章保存成功',
    MODIFY_POST_SUCCESS: '文章已编辑并保存成功',
    DELETE_POST_SUCCESS: '文章删除成功',
  },
  authMsg: {
    AUTH_FAILURE: '认证失败，请重新登陆',
  },
};
