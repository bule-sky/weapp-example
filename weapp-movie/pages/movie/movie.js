const SubjectsUtil = require('../../utils/SubjectsUtil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/static/img/001.jpg',
      '/static/img/002.jpg',
      '/static/img/003.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    movies:[],
    hidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let hidden = this.data.hidden;
    if (!hidden) {
      wx.showLoading({
        title: '加载中...',
      })

      setTimeout(function(){
        wx.hideLoading()
      },1500)
    }

    this.loadMovie();
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
  loadMovie: function() {
    var self = this;
    let _url = SubjectsUtil._api
    wx.request({
      url: _url+'/v2/movie/in_theaters',
      header: {'content-type': 'application/xml'},
      success: function(res) {
        let subjects = res.data.subjects;
        SubjectsUtil.processSubjects(subjects)
        self.setData({movies:subjects,hidden:true});
      }
    })
  },
  detail(e){
    getApp().detail(e)
  }
})