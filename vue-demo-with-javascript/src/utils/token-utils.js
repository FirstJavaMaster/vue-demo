const userInfoKey = 'user-info'
const tokenKey = 'access-token'

export default {
  // 保存用户信息
  setUserInfo (data) {
    localStorage.setItem(userInfoKey, JSON.stringify(data))
    localStorage.setItem(tokenKey, data.token)
  },

  // 获取用户信息
  getUserInfo () {
    const userInfo = localStorage.getItem(userInfoKey)
    return (userInfo && userInfo !== 'undefined' && userInfo !== 'null') ? JSON.parse(userInfo) : undefined
  },

  // 获取token
  getToken () {
    return localStorage.getItem(tokenKey)
  },

  // 移除token
  removeUserInfo () {
    localStorage.removeItem(userInfoKey)
    localStorage.removeItem(tokenKey)
  },

  // 用户是否登录
  isLogin () {
    const token = this.getToken()
    const userInfo = this.getUserInfo()
    return token && userInfo
  }
}
