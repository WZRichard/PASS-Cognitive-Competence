// pages/message/message/message.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../age/age'
    })
  },
  goToAge() { 
    wx.navigateTo({ 
      url: '../age/age'
    }) 
  },

  onLoad: function (options) {

  },

})