const SubjectsUtil = require('../../utils/SubjectsUtil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal:"",
    movies:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    
  }
  ,
  loading(hidden) {
    if (!hidden) {
      wx.showLoading({
        title: '加载中...',
      })

      setTimeout(function(){
        wx.hideLoading()
      },1500)
    }
  },
  bindKeyInput: function(e) {
    this.setData({inputVal:e.detail.value});
  },
  model(){
    wx.showModal({
      title: '温馨提示',
      content: '请输入您要查询的关键字！ 如：超人归来',
      showCancel:false,
      confirmText:"俺晓得啦"
    });
  },
  search() {
    let self = this;
    let _url = SubjectsUtil._api;
    let _keyword = self.data.inputVal;
    if (!_keyword) {
      self.model();
      return false;
    }
    self.loading(false);
    wx.request({
      url: _url+'/v2/movie/search?q='+_keyword,
      header: {'Content-Type': 'application/xml'},
      success: function(res) {
        let subjects = res.data.subjects;
        SubjectsUtil.processSubjects(subjects)
        self.setData({movies:subjects});
        self.loading(true);
      }
    })
  },
  detail(e){
    getApp().detail(e)
  }
})