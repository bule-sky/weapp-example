// pages/config/config.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    configs: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var configs = wx.getStorageSync('configs');
    this.setData({configs:configs});
  },
  switchChange: function (e){
    var id = e.target.id;
    var configs = this.data.configs;
    var config = configs[id];
    if (!config) {
      config = new Object();
      configs[id] = config;
    }
    config.state = e.detail.value;
    console.log(e)
    this.setData({configs:configs});
    wx.setStorageSync('configs', configs)
  },
  sliderChange: function (e){
    var id = e.target.id;
    var configs = this.data.configs;
    var config = configs[id];
    if (!config) {
      config = new Object();
      configs[id] = config;
    }
    config.time = e.detail.value;
    this.setData({configs:configs});
    wx.setStorageSync('configs', configs)
  },
  radioChange: function (e){
    var id = e.target.id;
    var configs = this.data.configs;
    var config = configs[id];
    if (!config) {
      config = new Object();
      configs[id] = config;
    }
    config.voice = e.detail.value;
    this.setData({configs:configs});
    wx.setStorageSync('configs', configs)
  }
})