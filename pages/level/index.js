// pages/level/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    child_icon:"https://qbkeass.cn/images/icon/child.png",
    level_icon:"https://qbkeass.cn/images/icon/level2.png",
    level_list:[],
    userInfo:{},
    childAge:"",
    mylevel: "",
    allPass:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      userInfo: app.globalData.userInfo,
    }),
    wx.getStorage({
      key: "childAge",
      success: function(e){
        that.setData({
          childAge: e.data
        })
      }
    }),
    wx.request({
      url: 'https://qbkeass.cn/pass/getLevel.php',
      data: {
        'wx_id' : app.globalData.openid
      },
      method: 'GET',
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
      },
      success: function(res){
        that.setData({
          mylevel: res.data.level,
          allPass: res.data.all_pass
        })
      }
    }),
    wx.request({
      url: 'https://qbkeass.cn/pass/getTop20.php',
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
      },
      success: function(res){
        console.log("start")
        var i= 101;
        var list=[];
        for(i=101;i<121;i++) {
          if(res.data[i] != undefined) {
              list.push(res.data[i])
              console.log(res.data[i])
          }
        }
        that.setData({
          level_list:list
        })
        console.log(that.data.level_list)
      }
    })

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
  onShareAppMessage: function () {

  }
})