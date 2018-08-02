var SubjectsUtil = require('../../utils/SubjectsUtil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMovie(options.id);
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

  },  
  loadMovie: function(movieId) {
    var self = this;
    let _url = SubjectsUtil._api
    // var movieId = wx.getStorageSync('moveId');
    wx.request({
      url: _url+'/v2/movie/subject/'+movieId,
      header: {'content-type': 'application/xml'},
      success: function(res) {
        let subjects = res.data;
        SubjectsUtil.processSubject(subjects)
        self.setData({movies:subjects});
      }
    })
  },
})