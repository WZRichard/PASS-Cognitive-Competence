// pages/FruitMatch/FruitMatch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cnt_row: 3, //行数（2或3）
    round: 8, //一共8轮
    difficulty: [2, 2, 3, 3, 4, 4, 5, 6],
    row: [],
    src: ['./data/apple.png', './data/banana.png', './data/grape.png', './data/pear.png', './data/strawberry.png', './data/watermelon.png'],
    img_hidden: [[true, true, true], [true, true, true], [true, true, true]],
  },

  /**
   * 游戏相关函数
   */

  set_row: function () {
    var new_row = [[], [], []];
    for (let i = 0; i < this.data.cnt_row; i++) {
      for (let j = 0; j < this.data.cnt_row; j++) {
        new_row[i].push(this.data.src[this.getRadom_int(this.data.difficulty[this.data.round - 1], 0)]);
      }
    }
    this.setData({
      row: new_row,
    })
  },

  getRadom_int: function (a, b) {
    return parseInt(Math.random() * a + b);
  },

  tap_image: function (e) {
    console.log(e.currentTarget.dataset.num);
    this.random_hidden_hide();
  },

  random_hidden_show: function () {
    let pa = this.data.img_hidden;
    let pc = [];
    for (let i = 0; i < Math.pow(this.data.cnt_row, 2) / 2; i++) {
      while (true) {
        let pb = [this.getRadom_int(this.data.cnt_row, 0), this.getRadom_int(this.data.cnt_row, 0)], j;
        for (j = 0; j < pc.length; j++) {
          if (pc[j][0] == pb[0] && pc[j][1] == pb[1]) {
            break;
          }
        }
        if (j == pc.length) {
          pc.push(pb);
          break;
        }
      }
      pa[pc[i][0]][pc[i][1]] = false;
    }
    this.setData({
      img_hidden: pa,
    })
  },

  random_hidden_hide: function () {
    let pa = this.data.img_hidden;
    for (let i = 0; i < this.data.cnt_row; i++) {
      for (let j = 0; j < this.data.cnt_row; j++) {
        pa[i][j] = true;
      }
    }
    this.setData({
      img_hidden: pa,
    })
  },

  begin: function () {
    setTimeout(() => this.random_hidden_show(), 1000);
    setTimeout(() => this.random_hidden_hide(), 4000);
    setTimeout(() => this.random_hidden_show(), 5000);
    setTimeout(() => this.random_hidden_hide(), 8000);
    setTimeout(() => this.random_hidden_show(), 9000);
    setTimeout(() => this.random_hidden_hide(), 12000);
    clearTimeout();
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
    this.begin();
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