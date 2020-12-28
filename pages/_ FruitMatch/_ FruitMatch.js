// pages/_ FruitMatch/_ FruitMatch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideImgArr: ['cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/images/wallpaper/Matrix_info_2.png', 'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/images/wallpaper/Matrix_info_3.png', ], //游戏介绍界面
    startGame: false, //是否开始游戏
    score_show: false,
  },

  onLoad: function () {
  },

  start: function (e) {
    //当开始游戏按钮被点击时，隐藏视觉搜索介绍
    this.setData({
      startGame: true,
    })
  },
  
  drawActive: function () {
    //设置定时器，一百毫秒执行一次
    //一百毫秒执行一次，要在mTime时间内画一条线
    //比如100000ms，要进行100000/100=1000次画,1000次画满（700-50)/1000
    var this2 = this;
    var timer = setInterval(function () {
      //现在的长度/原来的长度
      //(this2.data.time*1000-this2.data.mTime)/(this2.data.time*1000)
      var length = 50 + (700 - 50) * (this2.data.mTime) / (this2.data.time * 1000);
      var currentTime = this2.data.mTime - 100;
      this2.setData({
        mTime: currentTime
      });
      if (length > 50) {
        var lineWidth = 5 / this2.data.rate;//px
        var ctx = wx.createCanvasContext('progress_active');//不需要'#'
        ctx.setLineCap('butt');
        ctx.setLineWidth(lineWidth);
        ctx.setStrokeStyle('#E06663');
        ctx.beginPath();
        ctx.moveTo(50 / this2.data.rate, 20);
        ctx.lineTo(length / this2.data.rate, 20);
        ctx.stroke();
        ctx.draw();
      }

    }, 100);
    this2.setData({
      timer: timer
    })
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
    setTimeout(() => this.setData({
      score_show: true,
    }), 2000);
    setTimeout(() => this.setData({
      score_show: false,
    }), 5000);
    clearTimeout();
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