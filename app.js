/**
 * 公共逻辑脚本
 */
App({
  // 全局数据todos
  todos: [
    { text: 'Learning Javascript', completed: true },
    { text: 'Learning ES2016', completed: true },
    { text: 'Learning 支付宝小程序', completed: false },
  ],

  userInfo: null,

  // 全局方法
  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.userInfo) resolve(this.userInfo);

      // 调用用户授权api获取用户信息
      my.getAuthCode({
        scopes: ['auth_user'],
        success: authcode => {
          console.info(authcode);

          my.getAuthUserInfo({
            success: res => {
              this.userInfo = res;
              resolve(this.userInfo);
            },
            fail: () => {
              reject({});
            },
          });
        },
        fail: () => {
          reject({});
        },
      });
    });
  },
});
