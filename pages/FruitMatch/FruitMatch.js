// pages/FruitMatch/FruitMatch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cnt_row: 2, //行数（2或3）
    round: 1, //一共8轮
    difficulty: [2, 2, 3, 3, 4, 4, 5, 6], //关卡困难程度（有几种水果）
    row: [], //随机水果图片集
    src: ['./data/apple.png', './data/banana.png', './data/grape.png', './data/pear.png', './data/strawberry.png', './data/watermelon.png'],
    answer: './data/apple.png', //随即答案src
    img_hidden: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], //是否显示
    img_hidden_before: [], //保证所有水果都有被展示
    opacity_Q: 0,
    opacity_B: false,
    timer: '',
    countDownNum: '10', //倒计时初始值
  },

  /**
   * 游戏相关函数
   */

  set_row: function () {
    var new_row = [['', '', ''], ['', '', ''], ['', '', '']];
    var cnt = 0;
    while (cnt < this.data.difficulty[this.data.round - 1]) {
      row = this.getRadom_int(this.data.cnt_row, 0);
      col = this.getRadom_int(this.data.cnt_row, 0);
      if (new_row[row][col] == '') {
        new_row[row][col] = this.data.src[cnt];
        cnt++;
      }
    }
    while (cnt < this.data.cnt_row * this.data.cnt_row) {
      row = this.getRadom_int(this.data.cnt_row, 0);
      col = this.getRadom_int(this.data.cnt_row, 0);
      if (new_row[row][col] == '') {
        new_row[row][col] = this.data.src[this.getRadom_int(this.data.difficulty[this.data.round - 1], 0)];
        cnt++;
      }
    }

    this.setData({
      row: new_row,
    })
  },

  getRadom_int: function (a, b) {
    return parseInt(Math.random() * a + b);
  },

  next_round: function () {
    cnt_row = this.data.cnt_row == 2 && this.data.round == 2 ? this.data.cnt_row + 1 : this.data.cnt_row;
    this.setData({
      cnt_row: cnt_row,
      round: this.data.round + 1, //一共8轮
      img_hidden: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], //是否显示
      img_hidden_before: [], //保证所有水果都有被展示
      opacity_Q: 0,
    })

    this.set_row();

    this.begin();
  },

  tap_image: function (e) {
    if (!this.data.opacity_Q) {
      return;
    }

    if (this.data.round == 8) {
      this.reset_all();
      wx.showToast({
        title: '恭喜您通关了！',
        icon: 'none',
        duration: 2000,
      })
    } else if (this.data.row[e.currentTarget.dataset.row][e.currentTarget.dataset.index] == this.data.answer) {
      wx.showToast({
        title: '正确 恭喜您！',
        icon: 'none',
        duration: 2000,
      })
      this.next_round();
    } else {
      this.reset_all();

      wx.showModal({
        title: '选错啦',
        confirmText: '再来一次',
        cancelText: '返回',
        success(res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // } else 
          if (res.cancel) {
            this.tap_back();
          }
        }
      })
    }
  },

  reset_all: function () {
    this.setData({
      cnt_row: 2, //行数（2或3）
      round: 1, //一共8轮
      img_hidden: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], //是否显示
      img_hidden_before: [], //保证所有水果都有被展示
      opacity_Q: 0,
      opacity_B: false,
    })

    this.set_row();
  },

  random_hidden_show: function (isround2) {
    var pa = this.data.img_hidden, pb = this.data.img_hidden_before;
    var pc = [], cnt = 0;

    if (pb.length > 0) {
      for (let i = 0; i < pb.length; i++) {
        for (let j = 0; j < pb[0].length; j++) {
          if (!pb[i][j]) {
            pc.push([i, j]);
            pa[pc[cnt][0]][pc[cnt][1]] = 1;
            cnt++;
          }
        }
      }
    }

    for (; cnt < Math.pow(this.data.cnt_row, 2) / 2; cnt++) {
      while (true) {
        var pb = [this.getRadom_int(this.data.cnt_row, 0), this.getRadom_int(this.data.cnt_row, 0)], j;
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
      pa[pc[cnt][0]][pc[cnt][1]] = 1;
    }

    var copy = [];
    if (!isround2) {
      copy = JSON.parse(JSON.stringify(pa));
    }
    this.setData({
      img_hidden: pa,
      img_hidden_before: copy,
    })
  },

  hide_all: function () {
    var pa = this.data.img_hidden;
    for (let i = 0; i < this.data.cnt_row; i++) {
      for (let j = 0; j < this.data.cnt_row; j++) {
        pa[i][j] = 0;
      }
    }

    this.setData({
      img_hidden: pa,
    })
  },

  begin: function () {
    let that = this;
    setTimeout(() => that.random_hidden_show(false), 1000);
    setTimeout(() => that.hide_all(), 4000);
    setTimeout(() => that.random_hidden_show(true), 5000);
    setTimeout(() => that.hide_all(), 8000);
    setTimeout(() => that.random_hidden_show(false), 9000);
    setTimeout(() => that.hide_all(), 12000);
    setTimeout(() => that.setData({
      answer: that.data.row[that.getRadom_int(that.data.cnt_row, 0)][that.getRadom_int(that.data.cnt_row, 0)],
      opacity_Q: 1,
    }), 12500);
    setTimeout(() => that.countDown(), 12500);
    clearTimeout();
  },

  tap_button: function (e) {
    this.setData({
      opacity_B: true,
    })
    this.begin();
  },
  /**
   * 计时器
   */
  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.data.timer = setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
      //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
      if (countDownNum == 0) {
        wx.showToast({
          title: '时间到！',
          duration: 2000,
          icon: 'none',
        })
        that.reset_all();
        clearInterval(that.data.timer);
        //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
        //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
        // clearInterval(that.data.timer);
        //关闭定时器之后，可作其他处理codes go here
      } else {
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })
      }
    }, 1000)
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