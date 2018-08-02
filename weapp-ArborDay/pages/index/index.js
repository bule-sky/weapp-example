Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    isStatus: false,
    isVary: false,
    Timer: 10,
    Number: 0,
    animationData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  setTimer() {
   let Timers = setInterval(function() {      
      var time = this.data.Timer-1;
      if (time<=0) {
        this.model();
        clearInterval(Timers);
      }
      this.setData({Timer: time});
    }.bind(this), 1000)
    
  },
  model() {
    let self = this;
    wx.showModal({
      title: '温馨提示',
      confirmText: "再浇一次",
      cancelText: "更多游戏",
      content: '我居然浇了'+this.data.Number+'桶水！！不服来战！！！',
      success: function(res) {
        if (res.confirm) {
          self.setData({Timer:10,Number:0});
          self.begin();
        } else if (res.cancel) {
          console.log('更多游戏请关注：xx公众号！！')
          self.setData({Timer:10,Number:0});
          self.begin();
        }
      }
    })

  },
  begin() {
    this.setData({isShow: false});
    this.setTimer();
  },
  pour() {
    let self = this;
    
    this.setData({isStatus: true});
    setTimeout(function(){
      self.setData({isStatus: false});      
    },1500)

    setTimeout(function(){
      this.setData({isVary: false});      
    }.bind(this),2000)
    
    var num = this.data.Number + 1;
    this.waterAnimate(num);
  },
  waterAnimate(num) {
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 5
    })

    console.log(num)

    setTimeout(function(num) {
      animation.translateY(460).step({ duration: 1000 })
      this.setData({
        animationData:animation,
        isVary: true,
        Number: num
      })
    }.bind(this,num), 1000);

    if (this.data.isStatus) {
      animation.translateY(0).step({ duration: 1,delay:0,timingFunction:"linear" })
      this.setData({
        animationData:animation.export()        
      })
    }


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
})