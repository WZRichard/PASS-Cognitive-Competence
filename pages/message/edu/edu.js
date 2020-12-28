// pages/message/edu/edu.js
const app = getApp()

Page({
  data: {
    selectArray: [
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
      url: '../has/has',
      url: '/pages/training/index'
    })
  },
  goToHas() { 
    wx.navigateTo({ 
      url: '../has/has'
    }) 
  },
  goToIndex() { 
    if(app.globalData.message.parentEdu == "" || this.data.hasEdu == false) {
      wx.showToast({
        title: "请选择学历",
        icon: 'none',
        duration: 1500
      })
    }
    else {
      wx.setStorage({key: "hasMessage", data: "true"})
      wx.setStorage({key: "parentEdu", data: app.globalData.message.parentEdu}),
      wx.reLaunch({
        url: '/pages/training/index',
      })
      
    }
    
  },
  //e.detail存放了id和text的内容
  getData:function(e){
    app.globalData.message.parentEdu = e.detail.text
    this.setData({
      hasEdu: true
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

})