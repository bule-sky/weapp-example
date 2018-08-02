Page({

  /**
   * 页面的初始数据
   */
  data: {
    logs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.getStorage({
      key: 'callogs',
      success: function(res) {
        self.setData({
          logs:res.data
        })
      } 
    })
  },
})