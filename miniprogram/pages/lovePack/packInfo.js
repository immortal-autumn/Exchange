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
    name: '',
    id: '',
  },

  name: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  id: function(e) {
    this.setData({
      id: e.detail.value
    })
  },

  submission: function(e) {
    if(this.data.name == '') {
      wx.showToast({
        title: '写名字！',
        icon: 'none',
      })
      return
    }
    if (this.data.id == '') {
      wx.showToast({
        title: '报学号！',
        icon: 'none',
      })
      return
    }
    const db = wx.cloud.database()
    var date = new Date()
    db.collection("packCollection").add({
      data: {
        time: date,
        nick_name: app.globalData.nickName,
        name: this.data.name,
        id: this.data.id,
      },
      success: function (res) {
        wx.showToast({
          title: 'Success!',
          icon: 'success',
          duration: 2000,
          mask: false,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: 'Failed...',
          duration: 2000,
          mask: true
        })
      },
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'checkRegister',
      data: {
        collectionName: 'packCollection',
      },
      success: res => {
        console.log(res)
        if(res.result.data.length != 0) {
          wx.showModal({
            title: '重复领取提示',
            content: '你已经注册或者领取过，领取时间为\r\n' + res.result.data[0].time + '\r\n请找学联负责人确认',
            showCancel: false,
            confirmText: '阅',
            success: function(res) {
              wx.navigateBack({
                delta: 1
              })
            },
          })
        }
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