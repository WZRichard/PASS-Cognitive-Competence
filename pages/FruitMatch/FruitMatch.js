// pages/FruitMatch/FruitMatch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    row: [],
    src: ['./data/apple.png', './data/banana.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.set_row()
  },

  set_row: function () {
    this.setData({
      row: [
        [this.data.src[0], this.data.src[1]],
        [this.data.src[0], this.data.src[1]],
      ],
    })
  },

  /**
   * 游戏内部函数
   */
  tap_image: function (e) {
    console.log(e.currentTarget.dataset.num);
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