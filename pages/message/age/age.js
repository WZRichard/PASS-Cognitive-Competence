// pages/message/age/age.js
const app = getApp()

Page({
  data: {
    selectArray: [
      { "id": "7","text": "7岁" },
      { "id": "8","text": "8岁" },
      { "id": "9","text": "9岁" },
      { "id": "10","text": "10岁" },
      { "id": "11","text": "11岁" },
      { "id": "12","text": "12岁" },
    ],
    hasAge: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../sex/sex'
    })
  },
  goToSex() { 
    if(app.globalData.message.childAge == "" || this.data.hasAge == false) {
      wx.showToast({
        title: "请选择年龄",
        icon: 'none',
        duration: 1500
      })
    }
    else {
      wx.setStorage({key: "childAge", data: app.globalData.message.childAge}),
      wx.navigateTo({ 
        url: '../sex/sex'
      }) 
    }
    
  },
  //e.detail存放了id和text的内容
  getData:function(e){
    app.globalData.message.childAge = e.detail.text
    this.setData({
      hasAge: true
    });
    // console.log(e.detail)
    // wx.showToast({
    //   title: e.detail.text,
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