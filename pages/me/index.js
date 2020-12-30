// pages/me/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      childAge: "",
      childSex: "",
      userInfo: {},
      menu_list:[
        {
          id:1,
          name:"排行榜",
          icon:'https://qbkeass.cn/images/icon/level.png',
          pagePath:'/pages/level/index'
        },
        {
          id:2,
          name:"关于我们",
          icon:'https://qbkeass.cn/images/icon/about.png',
          pagePath:'/pages/about/index'
        },
        {
          id:3,
          name:"设置",
          icon:'https://qbkeass.cn/images/icon/setting.png',
          pagePath:'/pages/setting/index'
        }
        // ,
        // {
        //   id:4,
        //   name:"PASS模型科普",
        //   icon:'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/pass_pic/me_icon/科普.png',
        //   pagePath:'/pages/temp2/index'
        // }
      ],
      go_icon:'https://qbkeass.cn/images/icon/to-right.png'
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
    wx.getStorage({
      key: "childSex",
      success: function(e){
        that.setData({
          childSex: e.data
        })
      },
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

  },

  onItemClick: function (e) {
    var pageId=e.currentTarget.dataset.pageid;
    var pageUrl = this.data.menu_list[pageId-1].pagePath
    console.log(e);
    console.log(pageId);
    console.log(pageUrl)
    wx.navigateTo({
      url: pageUrl
    })
  }

})