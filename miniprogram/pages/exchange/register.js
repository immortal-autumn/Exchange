Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ["医用物品", "消毒用品", "生活用品", "其他用品"],
    disabled: false,
    defaultSize: 'default',
    plain: false,
    loading: false,
    register_catagory: '',
    register_name: '',
    register_amount: 0
  },

  // Only store the index value to storage for space complexity
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value,
      register_catagory: e.detail.value
    })
  },

  name: function (e) {
    this.setData({
      register_name: e.detail.value
    })
  },

  amount: function (e) {
    this.setData({
      register_amount: e.detail.value
    })
  },

  submission: function () {
    // submission function
    const db = wx.cloud.database()
    db.collection("Item").add({
      data: {
        type: this.data.register_catagory,
        name: this.data.register_name,
        amount: this.data.register_amount
      },
      success: function(res) {
        wx.showToast({
          title: 'Success!',
          icon: 'success',
          duration: 2000,
          mask: false,
          success: function() {
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          }
        })
      },
      fail: function(res) {
        wx.showToast({
          title: 'Failed...',
          duration: 2000,
          mask: true
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从用户获取权限： OpenID等等
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '物资注册',
      path: '/pages/exchange/register',
    }
  }
})