// pages/message/has/has.js
const app = getApp()

Page({
  data: {
    items: [
      {name: 1, value: "是", selected: false},
      {name: 0, value: "否", selected: false}
    ],
    hasIf: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../sex/sex',
      url: '../edu/edu'
    })
  },
  goToSex() {
    wx.navigateTo({ 
      url: '../sex/sex'
    }) 
  },
  goToEdu() {
    if(app.globalData.message.childHas == "" || this.data.hasIf == false) {
      wx.showToast({
        title: "请选择答案",
        icon: 'none',
        duration: 1500
      })
    }
    else {
      wx.setStorage({key: "childHas", data: app.globalData.message.childHas}),
      wx.navigateTo({ 
        url: '../edu/edu'
      }) 
    }
  },
  //数据倒入后台
  radioChange: function(e) {
    app.globalData.message.childHas = e.detail.value
    this.setData({
      hasIf: true
    });
    // console.log(e.detail)
    // wx.showToast({
    //   title: e.detail.value,
    //   icon: 'none',
    //   duration: 1500
    // })
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
    wx.hideHomeButton();
  },

})