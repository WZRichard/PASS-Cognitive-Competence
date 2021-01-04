// pages/message/sex/sex.js
const app = getApp()

Page({
  data: {
    items: [
      {name: 1, value: "男", selected: false},
      {name: 0, value: "女", selected: false}
    ],
    hasSex: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../age/age',
      url: '../has/has'
    })
  },
  goToAge() { 
    wx.navigateTo({ 
      url: '../age/age'
    }) 
  },
  goToHas() {
    if(app.globalData.message.childSex == "" || this.data.hasSex == false) {
      wx.showToast({
        title: "请选择性别",
        icon: 'none',
        duration: 1500
      })
    }
    else {
      wx.setStorage({key: "childSex", data: app.globalData.message.childSex}),
      wx.navigateTo({ 
        url: '../has/has'
      }) 
    }
  },
  //数据倒入后台
  radioChange: function(e) {
    app.globalData.message.childSex = e.detail.value
    this.setData({
      hasSex: true
    });
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
    wx.hideHomeButton();
  },

})