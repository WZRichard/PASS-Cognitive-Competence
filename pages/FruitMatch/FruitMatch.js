// pages/FruitMatch/FruitMatch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cnt_row: 2,
    round: 1,
    difficulty: [2, 2, 3, 3, 4, 4, 5, 6],
    row: [],
    src: ['./data/apple.png', './data/banana.png', './data/grape.png',
      './data/pear.png', './data/strawberry.png', './data/watermelon.png'],

  },

  /**
   * 游戏相关函数
   */

  set_row: function () {
    var new_row = [[], [], []];
    for (let i = 0; i < this.data.cnt_row; i++) {
      for (let j = 0; j < this.data.cnt_row; j++) {
        new_row[i].push(this.data.src[this.getRadom()]);
      }
    }
    this.setData({
      row: new_row,
    })
  },

  getRadom: function () {
    return parseInt(Math.random() * this.data.difficulty[this.data.round - 1]);
  },

  tap_image: function (e) {
    console.log(e.currentTarget.dataset.num);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.set_row();
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