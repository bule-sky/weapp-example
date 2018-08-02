let _quest = require("../../utils/default.js");
let app = getApp();

Page({
  _index: 0,
  /**
   * 页面的初始数据
   */
  data: {
    desc: "新疆话四级太简单、六级话有点难，八级完全不会啊有木有？新疆的小伙伴们都自卑了！——新疆微电影",
    shareData: "微信关注--新疆微电影",
    shareTxt: "邀请小伙伴一起玩",
    isTest: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    title: '',
    partner: 0,
    items: [],
    questData:[],
    isStatus: '',
    isScore: false,
    ScoreTitle: '',
    ScoreDesc: '',
    Answer:'',
    score: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cumulation = wx.getStorageSync('cumulation');
    this.setData({partner:cumulation.length})
  },
  loadQuest(_quest){
    var _quest = _quest[this._index];
    var title  = _quest.title;
    var option = _quest.option;
    var ischeck = false;
    var Answer = _quest.Answer;
    this.setData({title:title,items:option,isStatus:ischeck,Answer:Answer})
  },
  startTest() {
    let _questData = _quest.QuestionData.QuestionList;
    this.setData({isTest:false,questData:_questData})
    this.loadQuest(_questData)
  },
  radioChange: function(e) {
    let self = this;
    let _questData = this.data.questData;
    let _value = e.detail.value;
    this._index++;

    if (_value.indexOf(this.data.Answer) == 0) {
      if (this.data.score<=100) {
        wx.setStorageSync('score', this.data.score +=5);        
      }
    }

    if (this._index >= _questData.length) {
      this.setData({isScore:true})
      this.scoreLevel();
      return;
    }

    setTimeout(()=>{
      if (self._index >=20) {return;}
      self.loadQuest(_questData)
    },1000);
  },
  scoreLevel(){
    var _scoreVal = wx.getStorageSync('score');
    let _scoreData = _quest.QuestionData.scoreLevel;
    let _scoreRank = _quest.QuestionData.scoreRank;
    let patt =/[^\-]+/g;
    for (var i = 0; i < _scoreRank.length; i++) {
      let _arr = _scoreRank[i].match(patt);
      let min = _arr[0];
      let max = _arr[1];
       if (_scoreVal>min && _scoreVal<=max){
         this.setData({ScoreTitle:_scoreData[i].title,ScoreDesc:_scoreData[i].desc})
       }
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
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '新疆方言小程序',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
    
  }
})