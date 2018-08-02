//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var configs = wx.getStorageSync('configs');
    /*if(JSON.stringify(configs) == "{}"){
      configs = this.initConfigs();
    }*/
    if(!configs) {
      configs = this.initConfigs();
    }
    wx.setStorageSync('configs',configs);
  },
  initConfigs() {
    var config1 = {
      id: "config1",
      name: "立论阶段",
      state: true,
      time: 180,
      voice: 15,
      desc: "\n\n（一）正方一辩开篇立论，@,\n（二）反方一辩开篇立论，@"
    }
    var config2 = {
      id: "config2",
      name: "驳立论阶段",
      state: true,
      time: 120,
      voice: 15,
      desc: "\n\n（一）反方二辩驳对方立论，@\n（二）正方二辩驳对方立论，@"
    }
    var config3 = {
      id: "config3",
      name: "质辩环节",
      state: true,
      time: 90,
      voice: 15,
      desc: "\n\n（一）正方三辩提问反方一、二、四辩各一个问题，反方辩手分别应答。三个问题累计回答时间为@。\n（二）反方三辩提问正方一、二、四辩各一个问题，正方辩手分别应答。三个问题累计回答时间为@。"
    }
    var config4 = {
      id: "config4",
      name: "自由辩论",
      state: true,
      time: 240,
      voice: 15,
      desc: "（一）自由辩论 @"
    }
    var config5 = {
      id: "config5",
      name: "总结陈词",
      state: true,
      time: 180,
      voice: 15,
      desc: "\n\n（一）反方四辩总结陈词，@。\n（二）正方四辩总结陈词，@。"
    }

    var configs = {config1,config2,config3,config4,config5};
    return configs;
  }
})