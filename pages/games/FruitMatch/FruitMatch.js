// pages/FruitMatch/FruitMatch.js
import Toast from '../../../miniprogram/miniprogram_npm/@vant/weapp/toast/toast/';

Page({
  // 待填返回函数
  return_score: function () {
    var score = 0, round = this.data.round - 1;
    if (round < 2) {
      score = round * 0.75;
    } else if (round < 4) {
      score = 1.5 + (round - 2) * 1.25;
    } else {
      score = 4 + (round - 4) * 1.5;
    }

    console.log(score);
    this.setData({
      score: score,
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    cnt_row: 2, //行数（2或3）
    round: 0, //一共8轮(初始化为0)
    difficulty: [2, 2, 3, 3, 4, 4, 5, 6], //关卡困难程度（有几种水果）
    row: [], //随机水果图片集
    src: ['1', '2', '3', '4', '5', '6'],
    answer: '1', //随即答案
    img_hidden: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], //是否显示
    img_hidden_before: [], //保证所有水果都有被展示
    question_begin: 0, //题目是否开始作答
    overlay_show: false, //answer是否显示
    timer: '', //计时器
    countDownNum: '10', //倒计时初始值(单位s)
    score: 0, //获得分数
    cnt_image_loading: 0, //水果图片加载完毕后开始显示
    slideImgArr: ['cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/Game_ FruitMatch/Fruits_info_1.png', 'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/Game_ FruitMatch/fruit2-2.png', 'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/Game_ FruitMatch/fruit2-3.png',], //游戏介绍界面图库
    startGame: false, //是否开始游戏
    popup_show: false, //帮助是否显示
    helper_content: '方框中隐藏着不同的水果\n请尽可能多的记住它们', //帮助内容
    helper_state: 0, //帮助状态
    level_image: ["cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/images/level/level-A.png", "cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/images/level/level-B.png", "cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/images/level/level-C.png", "cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/images/level/level-D.png"],
    level_show: false,
    level: 0,

    testFlag:0,
  },

  /**
   * 游戏相关函数
   */

  set_row: function () {
    let cnt_row = this.data.cnt_row == 2 && this.data.round == 2 ? this.data.cnt_row + 1 : this.data.cnt_row;
    var new_row = [['', '', ''], ['', '', ''], ['', '', '']];
    var cnt = 0, row, col;
    while (cnt < this.data.difficulty[this.data.round - 1]) {
      row = this.getRadom_int(cnt_row, 0);
      col = this.getRadom_int(cnt_row, 0);
      if (new_row[row][col] == '') {
        new_row[row][col] = this.data.src[cnt];
        cnt++;
      }
    }
    // console.log(this.data.round);
    // console.log(this.data.difficulty[this.data.round - 1]);
    // console.log("===" + new_row);
    while (cnt < cnt_row * cnt_row) {
      row = this.getRadom_int(cnt_row, 0);
      col = this.getRadom_int(cnt_row, 0);
      if (new_row[row][col] == '') {
        new_row[row][col] = this.data.src[this.getRadom_int(this.data.difficulty[this.data.round - 1], 0)];
        cnt++;
      }
    }

    // 返回未被修改的图片数量
    let cnt_image_loading = this.data.cnt_image_loading;
    let old_row = this.data.row;
    for (let i = 0; i < this.data.row.length && i < cnt_row; i++) {
      for (let j = 0; j < this.data.row[0].length && j < cnt_row; j++) {
        if (old_row[i][j] === new_row[i][j]) {
          cnt_image_loading++;
        }
      }
    }
    this.setData({
      row: new_row,
      cnt_image_loading: cnt_image_loading,
    })
  },

  getRadom_int: function (a, b) {
    return parseInt(Math.random() * a + b);
  },

  next_round: function () {
    var cnt_row = this.data.cnt_row == 2 && this.data.round == 2 ? this.data.cnt_row + 1 : this.data.cnt_row;
    this.setData({
      cnt_row: cnt_row,
      round: this.data.round + 1, //一共8轮
      img_hidden: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], //是否显示
      img_hidden_before: [], //保证所有水果都有被展示
      question_begin: 0,
      countDownNum: '10',
    })

    this.set_row();
  },

  tap_image: function (e) {
    if (!this.data.question_begin) {
      return;
    }

    clearInterval(this.data.timer);
    if (this.data.helper_state > 0) {
      if (this.data.row[e.currentTarget.dataset.row][e.currentTarget.dataset.index] == this.data.answer) {
        this.setData({
          popup_show: true,
          helper_state: 4,
          helper_content: '恭喜您答对了\n继续您的挑战吧',
        })
      } else {
        this.setData({
          popup_show: true,
          helper_state: 5,
          helper_content: '抱歉答案错误\n再接再厉吧',
        })
      }
    } else if (this.data.row[e.currentTarget.dataset.row][e.currentTarget.dataset.index] == this.data.answer) {
      if (this.data.round == 8) {
        // wx.showToast({
        //   title: '恭喜您通关了',
        //   icon: 'none',
        //   duration: 2000,
        // })

        this.reset_all();
      } else {
        wx.showToast({
          title: '正确 恭喜您',
          icon: 'none',
          duration: 2000,
        })

        this.next_round();
      }
    } else {
      // Toast.fail('选错啦');
      this.reset_all();
    }
  },

  reset_all: function () {
    if (this.data.helper_state == 0) {
      this.return_score();
    }
    console.log(this.data.helper_state);

    var score = this.data.score*10, level;
    if (score >= 90) {
      level=1;
    } else if (score < 90 && score >= 75) {
      level=2;
    } else if (score < 75 && score >= 60) {
      level=3;
    } else {
      level=4;
    }

    console.log(score);

    this.setData({
      level_show: true,
      level: level-1,
    })

    setTimeout(() => this.exit(), 2500);
    clearTimeout();

    this.setData({
      cnt_row: 2, //行数（2或3）
      round: 0, //一共8轮
      img_hidden: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], //是否显示
      img_hidden_before: [], //保证所有水果都有被展示
      question_begin: 0,
      countDownNum: '10',
    })

    if (this.data.helper_state!=0 ) {
      this.setData({
        startGame: 0,
        helper_state: 0,
      })
    }
  },

  exit: function() {
    this.setData({
      level_show: false,
    })

    if(this.data.testFlag==0)
    {
      wx.reLaunch({
        url: '/pages/games/index',
      })
    }else if(this.data.testFlag==1){
      wx.redirectTo({
        url: '/pages/games/visualSearch/index?testFlag=1',
      })
    }else{
      wx.reLaunch({
        url: '/pages/training/index',
      })
    }
  },

  random_show: function (isround2) {
    var pa = this.data.img_hidden, pb = this.data.img_hidden_before;
    var pc = [], cnt = 0;

    // console.log("="+pa);
    //取相反的值
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
        //已经存在的话就不放入
        for (j = 0; j < pc.length; j++) {
          if (pc[j][0] === pb[0] && pc[j][1] === pb[1]) {
            break;
          }
        }
        if (j === pc.length) {
          pc.push(pb);
          break;
        }
      }
      pa[pc[cnt][0]][pc[cnt][1]] = 1;
    }

    // console.log("=="+pa);
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
    let pa = this.data.img_hidden;
    for (let i = 0; i < pa.length; i++) {
      for (let j = 0; j < pa[0].length; j++) {
        pa[i][j] = 0;
      }
    }

    this.setData({
      img_hidden: pa,
    })
  },

  image_loaded: function (e) {
    var cnt_image_loading = this.data.cnt_image_loading + 1;
    let round = this.data.round;

    // console.log("="+cnt_image_loading);
    if (round == 0) {
      this.setData({
        cnt_image_loading: 0,
      })
    } else if (cnt_image_loading == (round < 3 ? 4 : 9)) {
      // console.log("loaded");
      if (this.data.helper_state == 0) {
        this.animation();
      }
      this.setData({
        cnt_image_loading: 0,
      })
    } else {
      this.setData({
        cnt_image_loading: cnt_image_loading,
      })
    }
  },

  animation: function () {
    let answer = this.data.row[this.getRadom_int(this.data.cnt_row, 0)][this.getRadom_int(this.data.cnt_row, 0)];

    setTimeout(() => this.random_show(false), 1000);
    setTimeout(() => this.hide_all(), 4000);
    setTimeout(() => this.random_show(true), 5000);
    setTimeout(() => this.hide_all(), 8000);
    setTimeout(() => this.random_show(false), 9000);
    setTimeout(() => this.hide_all(), 12000);
    setTimeout(() => this.setData({
      answer: answer,
      question_begin: 1,
    }), 12500);
    setTimeout(() => this.onClickShow(), 12500);
    setTimeout(() => this.onClickHide(), 15500);
    setTimeout(() => this.countDown(), 15500);

    clearTimeout();
  },

  /**
   * 计时器
   */
  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;
    that.data.timer = setInterval(function () {
      if (countDownNum <= 0) {
        clearInterval(that.data.timer);
        // Toast.fail('时间到');
        
        that.reset_all();
      } else {
        countDownNum = countDownNum - 0.05;
        that.setData({
          countDownNum: countDownNum,
        })
      }
    }, 50)
  },

  // 修改2.0
  onClickShow() {
    this.setData({ overlay_show: true });
  },

  onClickHide() {
    this.setData({ overlay_show: false });
  },

  noop() { },

  start: function (e) {
    //当开始游戏按钮被点击时，隐藏视觉搜索介绍
    this.setData({
      round: 1,
      cnt_row: 2,
      startGame: true,
    })
    this.set_row();
  },

  helper: function () {
    this.setData({
      popup_show: true,
      startGame: true,
      helper_content: '方框中隐藏着不同的水果\n请尽可能多的记住它们',
      helper_state: 1,

      round: 1,
      cnt_row: 2,
    });

    this.set_row();
  },

  help_next: function () {
    let state = this.data.helper_state;
    switch (state) {
      case 1: {
        this.setData({
          popup_show: false,
          helper_state: 2,
        })
        setTimeout(() => this.random_show(false), 1000);
        setTimeout(() => this.hide_all(), 4000);
        setTimeout(() => this.random_show(true), 5000);
        setTimeout(() => this.hide_all(), 8000);
        setTimeout(() => this.random_show(false), 9000);
        setTimeout(() => this.hide_all(), 12000);
        setTimeout(() => this.setData({
          popup_show: true,
          helper_content: '记住接下来展示的水果',
        }), 12500);
        clearTimeout();
        break;
      }
      case 2: {
        let answer = this.data.row[this.getRadom_int(this.data.cnt_row, 0)][this.getRadom_int(this.data.cnt_row, 0)];

        this.setData({
          popup_show: false,
          answer: answer,
          question_begin: 1,
          helper_state: 3,
        })
        setTimeout(() => this.onClickShow(), 500);
        setTimeout(() => this.onClickHide(), 3500);
        setTimeout(() => this.setData({
          popup_show: true,
          helper_content: '在方框中找出一个相同的水果\n注意不要超时咯',
        }), 3500);
        clearTimeout();
        break;
      }
      case 3: {
        this.setData({
          popup_show: false,
        })
        this.countDown()
        break;
      }
      case 4: {
        this.setData({
          popup_show: false,
          helper_state: -1,
        })

        this.next_round();
        break;
      }
      case 5: {
        this.setData({
          popup_show: false,
        })
        this.reset_all();
        break;
      }
    }
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
    clearInterval(this.data.timer);
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