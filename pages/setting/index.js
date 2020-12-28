// pages/setting/index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    selectArray1: [
      { "id": "7","text": "7岁" },
      { "id": "8","text": "8岁" },
      { "id": "9","text": "9岁" },
      { "id": "10","text": "10岁" },
      { "id": "11","text": "11岁" },
      { "id": "12","text": "12岁" },
    ],
    hasAge: false,
    items1: [
      {name: 1, value: "男", selected: false},
      {name: 0, value: "女", selected: false}
    ],
    hasSex: false,
    items2: [
      {name: 1, value: "是", selected: false},
      {name: 0, value: "否", selected: false}
    ],
    hasIf: false,
    selectArray2: [
      { "id": "1","text": "小学" },
      { "id": "2","text": "初中" },
      { "id": "3","text": "高中" },
      { "id": "4","text": "专科" },
      { "id": "5","text": "本科及以上" },
    ],
    hasEdu: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '/pages/me/index'
    })
  },
  goToMe() {
    if(this.data.hasAge == true) {
      wx.setStorage({key: "childAge", data: app.globalData.message.childAge})
    }
    if(this.data.hasSex == true) {
      wx.setStorage({key: "childSex", data: app.globalData.message.childSex})
    }
    if(this.data.hasIf == true) {
      wx.setStorage({key: "childHas", data: app.globalData.message.childHas})
    }
    if(this.data.hasEdu == true) {
      wx.setStorage({key: "parentEdu", data: app.globalData.message.parentEdu})
    }
    wx.reLaunch({
      url: '/pages/me/index',
    })
  },
  //数据倒入后台
  radioChange1: function(e) {
    app.globalData.message.childSex = e.detail.value
    this.setData({
      hasSex: true
    });
  },
  radioChange2: function(e) {
    app.globalData.message.childHas = e.detail.value
    this.setData({
      hasIf: true
    });
  },
  getData1:function(e){
    app.globalData.message.childAge = e.detail.text
    this.setData({
      hasAge: true
    });
  },
  getData2:function(e){
    app.globalData.message.parentEdu = e.detail.text
    this.setData({
      hasEdu: true
    });
  },
  onLoad: function (options) {
    
  },

})