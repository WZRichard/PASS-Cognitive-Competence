// pages/me/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      menu_list:[
        {
          id:1,
          name:"排行榜",
          icon:'/pic/me_icon/排行榜.png',
          pagePath:'/pages/level/index'
        },
        {
          id:2,
          name:"PASS模型科普",
          icon:'/pic/me_icon/科普.png',
          pagePath:'/pages/introduction/index'
        },
        {
          id:3,
          name:"关于我们",
          icon:'/pic/me_icon/关于我们.png',
          pagePath:'/pages/about/index'
        },
        {
          id:4,
          name:"设置",
          icon:'/pic/me_icon/设置.png',
          pagePath:'/pages/setting/index'
        }
      ],
      go_icon:'/pic/me_icon/箭头右.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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