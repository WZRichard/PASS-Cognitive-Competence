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
    hasEdu: false,
    wx_id: "",
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../has/has',
      url: '/pages/index/index'
    })
  },
  goToHas() { 
    wx.navigateTo({ 
      url: '../has/has'
    }) 
  },
  goToIndex() { 
    var that = this;
    if(app.globalData.message.parentEdu == "" || this.data.hasEdu == false) {
      wx.showToast({
        title: "请选择学历",
        icon: 'none',
        duration: 1500
      })
    }
    else {
      wx.setStorage({key: "parentEdu", data: app.globalData.message.parentEdu}),
      wx.getStorage({
        key: "openId",
        success: function(e){
          that.setData ({
            wx_id: e.data
          })
        }
      })
      wx.request({
        url: 'https://qbkeass.cn/pass/userLogin.php',
        data: {
          "wx_id": app.globalData.openid,
          "wx_name": String(that.data.userInfo.nickName),
          "wx_avatar": String(that.data.userInfo.avatarUrl),
          "child_age": parseInt(app.globalData.message.childAge),
          "parents_edu": String(app.globalData.message.parentEdu),
          "child_sex": String(app.globalData.message.childSex)
        },
        method: 'POST', 
        header:{
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
        },
        success: function(res){
          console.log(res.data)
          wx.setStorage({key: "hasMessage", data: "true"})
        }
      })
      wx.reLaunch({
        url: '/pages/training/index'
      })
    }
    
  },
  //e.detail存放了id和text的内容
  getData:function(e){
    app.globalData.message.parentEdu = e.detail.text
    this.setData({
      hasEdu: true
    });
  },
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },

})