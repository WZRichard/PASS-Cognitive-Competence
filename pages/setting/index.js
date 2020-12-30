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
    hasEdu: false,
    childAge: "",
    childSex: "",
    parentEdu: ""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '/pages/me/index'
    })
  },
  goToMe() {
    var that = this
    wx.request({
      url: 'https://qbkeass.cn/pass/userUpdate.php',
      data: {
        "wx_id": app.globalData.openid,
        "child_age": parseInt(that.data.childAge),
        "parents_edu": String(that.data.parentEdu),
        "child_sex": String(that.data.childSex)
      },
      method: 'POST', 
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
      },
      success: function(res){
        console.log(res.data)
      }
    })
    wx.reLaunch({ 
      url: '../me/index'
    })
  },
  //数据倒入后台
  radioChange1: function(e) {
    app.globalData.message.childSex = e.detail.value
    wx.setStorage({
      key:"childSex",
      data:e.detail.value
    })
    this.setData({
      childSex: e.detail.value
    })
  },
  radioChange2: function(e) {
    app.globalData.message.childHas = e.detail.value
    this.setData({
      hasIf: true
    });
  },
  getData1:function(e){
    app.globalData.message.childAge = e.detail.text
    wx.setStorage({
      key:"childAge",
      data:e.detail.text
    })
    this.setData({
      childAge: e.detail.text
    })
  },
  getData2:function(e){
    app.globalData.message.parentEdu = e.detail.text
    wx.setStorage({
      key:"parentEdu",
      data:e.detail.text
    })
    this.setData({
      parentEdu: e.detail.text
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: "childAge",
      success: function(e){
        that.setData({
          childAge: e.data
        })
      }
    }),
    wx.getStorage({
      key: "childSex",
      success: function(e){
        that.setData({
          childSex: e.data
        })
      }
    }),
    wx.getStorage({
      key: "parentEdu",
      success: function(e){
        that.setData({
          parentEdu: e.data
        })
      }
    })
  },

})