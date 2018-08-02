// http://api.map.baidu.com/geocoder/v2/?ak=IK8FV1HOrulOyhSLnWdHp19hTDq4SflQ&location=22.53332,113.93041&output=json

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '武汉',
    Temp: '',
    tips: '',
    weather:'',
    future:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadInfo();
  },

  loadInfo: function() {
    let self = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        self.loadCity(latitude,longitude)
        /*wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })*/
      }
    })
  },
  loadCity: function(latitude,longitude){
    let Ak ="IK8FV1HOrulOyhSLnWdHp19hTDq4SflQ";
    let url ="https://api.map.baidu.com/geocoder/v2"
    let self = this;
    wx.request({
      url: url+'/?ak='+Ak+'&location='+latitude+','+longitude+'&output=json',
      header: {'content-type': 'application/json'},
      success: function(res) {
        var city = res.data.result.addressComponent.city
        city = city.replace('市','');
        self.setData({city:city});
        self.loadWeather(city)
      }
    })
  },
  loadWeather(city) {
    // https://www.sojson.com/open/api/weather/json.shtml?city=%E5%8C%97%E4%BA%AC
    // http://wthrcdn.etouch.cn/weather_mini?city=%E6%AD%A6%E6%B1%89
    let url = "http://wthrcdn.etouch.cn/weather_mini?"
    let self = this;
    let patt =/<!\[CDATA\[(.*)\]\]>/
    wx.request({
      url: url+'city='+city,
      header: {'Content-Type': 'application/json'},
      success: function(res) {
        let {forecast,ganmao,wendu,yesterday} = res.data.data;
        let {date,fengli,fengxiang,high,low,type} =forecast.shift();

        for(var i in forecast){
         forecast[i].fengli = forecast[i].fengli.match(patt)[1];
        }
        
        self.setData({
          tips:ganmao,
          Temp:wendu,
          weather:type+" "+fengxiang+" "+fengli.match(patt)[1],
          future: forecast
        });
      }
    })
  }

})