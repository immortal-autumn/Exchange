//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    info_vis: true,
    nickname: '',
  },

  onLoad: function() {
    // 登录
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        wx.showToast({
          title: '登陆成功.jpg',
          duration: 1000,
          mask: true
        })
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        wx.showToast({
          title: '登陆失败，建议重新登录.jpg',
          duration: 1000,
          icon: 'none',
          mask: true
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                nickname: res.userInfo.nickName,
                info_vis: false,
              })
              //Set nickname to global
              app.globalData.nickName = res.userInfo.nickName
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        nickname: e.detail.userInfo.nickName,
        info_vis: false,
      })
      app.globalData.nickName = e.detail.userInfo.nickName
    }
  },
})
