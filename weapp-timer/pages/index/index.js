//index.js
//获取应用实例
Page({
  leftMove:0,
  rightMove:0,
  /**
   * 页面的初始数据
   */
  data: {
    actionSheetItems:[],
    title: "",
    desc: "",
    voice: 0,
    leftAnimationData: {},
    rightAnimationData: {},
    leftTime:0,
    rightTime:0,
    src: '../../static/sound/countdown.mp3',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  actionSheetTap(e) {
    let self = this;
        self.rightStop();
        self.leftStop();
    var configs = wx.getStorageSync('configs');
    var listItem = this.data.actionSheetItems;
    wx.showActionSheet({
      itemList: listItem,
      success: function(res) {
        var id = 'config'+(res.tapIndex+1);
        let tapconfig = configs[id];
        var desc = tapconfig.desc.replace(/@/g, tapconfig.time+'秒');
        self.setData({title:tapconfig.name,desc:desc,leftTime:tapconfig.time,rightTime:tapconfig.time,voice:tapconfig.voice})
      },
      fail: function(res) {
        console.log('数据加载失败，请稍后重试！！');
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var configs = wx.getStorageSync('configs');
    var actionSheetItems = [];
    var first = true;
    for(var i in configs) {
        var config = configs[i];
        if(config.state) {
          if (first) {
            var desc = config.desc.replace(/@/g, config.time+'秒');
            this.setData({title:config.name,desc:desc,leftTime:config.time,rightTime:config.time,voice:config.voice});
            first = false;
          }
          actionSheetItems.push(config.name); 
        }
    }
    this.setData({actionSheetItems:actionSheetItems})
  },
  leftStop() {
    clearInterval(this.leftTimer);
    this.leftTimer = 0;
    this.audioPause();
  },
  leftStart() {
    let self = this;
        self.rightStop();
    if (this.leftTimer && this.leftTimer!=0) {
      self.leftStop();
      return;
    }

    var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
    })

    
    animation.rotate(self.leftMove+=100).step();
    self.setData({
      leftAnimationData:animation.export()
    })

    var leftTimer = setInterval(()=>{
      var _leftTime = self.data.leftTime;
      if (_leftTime <= 0) {
        self.leftStop();
          return;
      }else if(_leftTime <= self.data.voice) {
        self.audioPlay()
      }

      animation.rotate(self.leftMove+=100).step();
      self.setData({
        leftAnimationData:animation.export(),
        leftTime:self.data.leftTime - 1
      })
    },1000)
    self.leftTimer = leftTimer;

  },
  rightStop() {
    clearInterval(this.rightTimer);
    this.rightTimer = 0;
    this.audioPause();
  },
  rightStart() {
    let self = this;
        self.leftStop();
    if (this.rightTimer && this.rightTimer!=0) {
      self.rightStop();
      return;
    }

    var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
    })

    animation.rotate(this.rightMove+=100).step();
    this.setData({
      rightAnimationData:animation.export()
    })

    var rightTimer = setInterval(()=>{
      var _rightTime = self.data.rightTime;
      if (_rightTime <= 0) {
        self.rightStop();
          return;
      }else if(_rightTime <= self.data.voice) {
        self.audioPlay()
      }

      animation.rotate(self.rightMove+=100).step();
      self.setData({
        rightAnimationData:animation.export(),
        rightTime:_rightTime - 1
      })
    },1000)
    self.rightTimer = rightTimer;
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  }
})