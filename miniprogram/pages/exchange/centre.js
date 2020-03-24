// miniprogram/components/exchange-centre/exchange-centre.js
Page({

  /**
   * Page initial data
   */
  data: {
    items: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'fetchDatabase',
      success: res => {
        console.log(res)
        this.setData({
          items: res.result.data
        })
      },
      fail: res => {
        wx.showToast({
          title: 'Failed! Please contact admin: Elwin',
          icon: 'none',
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
    wx.showToast({
      title: '木的啦XD',
      icon: 'none'
    })
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})