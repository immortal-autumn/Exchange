// miniprogram/pages/lovePack/packInfo.js
var app = getApp()

Page({
  /**
   * Page initial data
   */
  data: {
    disabled: false,
    defaultSize: "default",
    plain: false,
    loading: false,
    postcode: '',
    email: '',
    amountGet: 0
  },

  postcode: function(e) {
    this.setData({
      postcode: e.detail.value
    })
  },

  email: function(e) {
    this.setData({
      email: e.detail.value
    })
  },

  submission: function(e) {
    if (this.data.postcode == '') {
      wx.showToast({
        title: '你没有填写邮编！',
        icon: 'none',
      })
      return
    }
    if (this.data.email == '') {
      wx.showToast({
        title: '你没有填写邮箱！',
        icon: 'none',
      })
      return
    }
    const db = wx.cloud.database()
    var date = new Date()
    wx.cloud.callFunction({
      name: 'verfication',
      data: {
        collectionName: 'confirmation',
        email: this.data.email,
      },
      success: res => {
        var postcode = this.data.postcode.trim().replace(' ', '').toLowerCase()
        var list = res.result.data
        if (list.length == 0) {
          wx.showModal({
            title: '查无此人',
            content: '请检查你的格式是否正确',
            showCancel: false,
            confirmText: '重新检查'
          })
        }
        for (var i = 0; i < list.length; ++i) {
          var correct = list[i].Postcode.trim().replace(' ', '').toLowerCase()
          if (postcode === correct && list[i].Status == 0) {
            wx.cloud.callFunction({
              name: 'updateStatus',
              data: {
                collectionName: 'confirmation',
                email: this.data.email,
              },
              success: res => {
                wx.showModal({
                  title: '认证完成',
                  content: '你的认证已经完成, 请点击确认并且务必不要退出下个界面！',
                  showCancel: false,
                  confirmText: '我要领取',
                  success(res) {
                    wx.redirectTo({
                      url: '../verify/alert',
                    })
                  }
                })
              },
              fail: res => {
                console.log(res)
              }
            })
          }
          else {
            if (postcode !== correct) {
              wx.showModal({
                title: '认证失败',
                content: '你的邮编似乎不对啊！！',
              })
            }
            else {
              wx.showModal({
                title: '认证失败',
                content: '你似乎已经领取过了你的健康包！',
              })
            }
          }
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'countPiece',
      data: {
        collectionName: 'confirmation',
      },
      success: res => {
        this.setData({
          amountGet: res.result.total
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})