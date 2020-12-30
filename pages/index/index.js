// pages/training/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //testFlag=0游戏库玩家自主练习, testFlag=1玩家进行测验, testFlag=2玩家进行首次测验
    testFlag: 0,
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
  onClick: function (){
    //测验页面游戏顺序：1.颜色判别 2.计划连接 3.句子问题 4.视觉搜索 5.矩阵问题 6.字词回忆 7.水果配对 8.接受的注意
    // /pages/games/colorDiscrimination/index
    // /pages/games/jihualianjie/jihualianjie
    // /pages/games/SentenceRepetition/index
    // /pages/games/visualSearch/index
    //  /pages/games/Matrix_pro/Matrix_pro
    //  /pages/games/zicihuiyi/zicihuiyi
    // /pages/games/FruitMatch/FruitMatch
    //  /pages/games/RecieveAttention/index
    this.setData({
     testFlag:true,
    })
    console.log(this.data.testFlag)
    const pages = getCurrentPages();
    console.log(pages)
    wx.redirectTo({
      url:'/pages/games/colorDiscrimination/index?testFlag=2',  //跳转页面的路径，可带参数？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
      // url:'/pages/games/RecieveAttention/index?testFlag=2',
      success:function(){},        //成功后的回调；
      fail:function(){},          //失败后的回调；
      complete:function(){}      //结束后的回调(成功，失败都会执行)
  })

  }
})