// miniprogram/pages/verify/alert.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    time: 0,
    open_id: "null"
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var date = new Date()
    this.setData({
      time: date.toString(),
      open_id: app.globalData.openid
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