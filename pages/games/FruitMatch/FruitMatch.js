// pages/FruitMatch/FruitMatch.js
import Toast from '../../../miniprogram/miniprogram_npm/@vant/weapp/toast/toast/';

let subOp = null
let demoOp = {
  steps: null,
  controller: null,
}
let countDownTimer = null //计时器
let cnt_image_loading = 0

Page({

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
    // cnt_image_loading: 0, //水果图片加载完毕后开始显示
    slideImgArr: ['https://qbkeass.cn/images/games/fruitMatch/Fruits_info_1.png', 'https://qbkeass.cn/images/games/fruitMatch/fruit2-2.png', 'https://qbkeass.cn/images/games/fruitMatch/fruit2-3.png',], //游戏介绍界面图库
    startGame: false, //是否开始游戏
    popup_show: false, //帮助是否显示
    helper_content: '方框中隐藏着不同的水果\n请尽可能多的记住它们', //帮助内容
    helper_state: 0, //帮助状态
    binggo_cnt: 0,
    level_image: ["https://qbkeass.cn/images/level/level-A.png", "https://qbkeass.cn/images/level/level-B.png", "https://qbkeass.cn/images/level/level-C.png", "https://qbkeass.cn/images/level/level-D.png"],
    level_show: false,
    level: 0,
    testFlag: 0,
  },

  /**
   * 游戏相关函数
   */

  set_row: function () {
    var cnt_row = this.data.cnt_row;
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
    // let cnt_image_loading = this.data.cnt_image_loading;
    let old_row = this.data.row;
    for (let i = 0; i < this.data.row.length && i < cnt_row; i++) {
      for (let j = 0; j < this.data.row[0].length && j < cnt_row; j++) {
        if (old_row[i][j] === new_row[i][j]) {
          cnt_image_loading++;
        }
      }
    }

    if (cnt_image_loading == (this.data.round < 3 ? 4 : 9)) {
      this.set_row();
      return;
    }

    console.log(new_row);
    this.setData({
      row: new_row,
      img_hidden_before: [], //保证所有水果都有被展示
      // cnt_image_loading: cnt_image_loading,
    })
  },

  getRadom_int: function (a, b) {
    return parseInt(Math.random() * a + b);
  },

  next_round: function () {
    var cnt_row = this.data.cnt_row == 2 && this.data.round == 2 ? this.data.cnt_row + 1 : this.data.cnt_row;
    console.log("cnt_row=" + cnt_row);

    var __subOp = setInterval(() => {
      this.hide_all();
      clearInterval(__subOp);
    }, 1000);

    subOp = setInterval(() => {
      this.setData({
        cnt_row: cnt_row,
        round: this.data.round + 1, //一共8轮
        question_begin: 0,
        countDownNum: '10',
      })
      this.set_row();
      clearInterval(subOp);
    }, 2400);
  },

  tap_image: function (e) {
    if (!this.data.question_begin) {
      return;
    }

    var img_hidden = this.data.img_hidden
    img_hidden[e.currentTarget.dataset.row][e.currentTarget.dataset.index] = 1
    this.setData({
      img_hidden: img_hidden,
    })

    clearInterval(countDownTimer);
    if (this.data.helper_state > 0) {
      if (this.data.row[e.currentTarget.dataset.row][e.currentTarget.dataset.index] == this.data.answer) {
        this.setData({
          popup_show: true,
          helper_state: 4,
          helper_content: '恭喜您答对了\n继续您的挑战吧',
          binggo_cnt: this.data.binggo_cnt + 1,
        })
      } else {
        this.setData({
          popup_show: true,
          helper_state: 5,
          helper_content: '抱歉答案错误\n再接再厉吧',
        })
      }
    } else if (this.data.row[e.currentTarget.dataset.row][e.currentTarget.dataset.index] == this.data.answer) {

      this.setData({
        binggo_cnt: this.data.binggo_cnt + 1,
      });

      if (this.data.round == 8) {
        var _subOp = setInterval(() => {
          Toast("恭喜您 通关了");
          this.reset_all();
          clearInterval(_subOp);
        }, 900);
      } else {
        var _subOp = setInterval(() => {
          Toast("正确 恭喜您");
          this.next_round();
          clearInterval(_subOp);
        }, 900);
      }
    } else {
      var _subOp = setInterval(() => {
        Toast("选错啦");
        this.reset_all();
        clearInterval(_subOp);
      }, 900);
    }
  },

  reset_all: function () {

    this.get_score();
    var score = this.data.score, level;
    wx.setStorage({ key: "hasShuiguo", data: true })
    wx.setStorage({ key: "shuiguo", data: score })

    if (score >= 90) {
      level = 1;
    } else if (score < 90 && score >= 75) {
      level = 2;
    } else if (score < 75 && score >= 60) {
      level = 3;
    } else {
      level = 4;
    }
    console.log(score);

    var _subOp = setInterval(() => {
      this.setData({
        level_show: true,
        level: level - 1,
      })
      clearInterval(_subOp);
    }, 2000);

    subOp = setInterval(() => {
      this.exit();
      clearInterval(subOp);
    }, 5000);
  },

  exit: function () {
    this.setData({
      level_show: false,
    })

    // this.setData({
    //   cnt_row: 2, //行数（2或3）
    //   round: 0, //一共8轮
    //   img_hidden: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], //是否显示
    //   img_hidden_before: [], //保证所有水果都有被展示
    //   question_begin: 0,
    //   countDownNum: '10',
    // })

    if (this.data.testFlag == 0) {
      wx.switchTab({
        url: '/pages/games/index',
      })
    } else if (this.data.testFlag == 1) {
      wx.redirectTo({
        url: '/pages/games/RecieveAttention/index?testFlag=1',
      })
    } else {
      wx.redirectTo({
        url: '/pages/games/RecieveAttention/index?testFlag=2',
      })
    }
  },

  get_score: function () {
    var score = 0, binggo_cnt = this.data.binggo_cnt;
    if (binggo_cnt < 2) {
      score = binggo_cnt * 0.75;
    } else if (binggo_cnt < 4) {
      score = 1.5 + (binggo_cnt - 2) * 1.25;
    } else {
      score = 4 + (binggo_cnt - 4) * 1.5;
    }

    this.setData({
      score: score * 10,
    })
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

    console.log("==" + pa);
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
    this.setData({
      img_hidden: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      // img_hidden: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    })
  },

  image_loaded: function () {
    cnt_image_loading++
    var round = this.data.round;
    console.log("loading image:" + cnt_image_loading);

    if (round == 0) {
      cnt_image_loading = 0
    } else if (cnt_image_loading == (round < 3 ? 4 : 9)) {
      cnt_image_loading = 0
      if (this.data.helper_state == 0) {
        subOp = setInterval(() => {
          this.animation();
          clearInterval(subOp);
        }, 800);
      }
    }
    // console.log(cnt_image_loading);
  },

  animation: function () {

    demoOp.steps = [{
      func: () => this.random_show(false),
      playtime: 1500
    }, {
      func: () => this.hide_all(),
      playtime: 1500
    }, {
      func: () => this.random_show(true),
      playtime: 1500
    }, {
      func: () => this.hide_all(),
      playtime: 1500
    }, {
      func: () => this.random_show(false),
      playtime: 1500
    }, {
      func: () => this.hide_all(),
      playtime: 1500
    }, {
      func: () => this.onClickShow(),
      playtime: 1500
    }, {
      func: () => {
        this.onClickHide()
        this.countDown()
      }
    }]
    this.syncOperation(demoOp)
  },

  syncOperation: function (op) {
    if (op && op.steps) {
      let stepIdx = 0;
      clearTimeout(op.controller);

      function play() {
        if (stepIdx < op.steps.length) {
          op.steps[stepIdx].func();
          op.controller = setTimeout(play, op.steps[stepIdx++].playtime);
        }
      }

      play();
    }
  },

  /**
   * 计时器
   */
  countDown: function () {
    let countDownNum = this.data.countDownNum;
    countDownTimer = setInterval(() => {
      if (countDownNum <= 0) {
        clearInterval(countDownTimer)

        this.reset_all();
      } else {
        countDownNum = countDownNum - 1

        this.setData({
          countDownNum: countDownNum,
        })
        // console.log(countDownNum)
      }
    }, 1000)
  },

  // 修改2.0
  onClickShow() {
    var answer = this.data.row[this.getRadom_int(this.data.cnt_row, 0)][this.getRadom_int(this.data.cnt_row, 0)];

    this.setData({
      overlay_show: true,
      answer: answer,
    });
  },

  onClickHide() {
    this.setData({
      overlay_show: false,
      question_begin: 1,
    });
  },

  // noop() { },

  start: function () {
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
        demoOp.steps = [{
          func: () => this.random_show(false),
          playtime: 1500
        }, {
          func: () => this.hide_all(),
          playtime: 1500
        }, {
          func: () => this.random_show(true),
          playtime: 1500
        }, {
          func: () => this.hide_all(),
          playtime: 1500
        }, {
          func: () => this.random_show(false),
          playtime: 1500
        }, {
          func: () => this.hide_all(),
          playtime: 1500
        }, {
          func: () => this.setData({
            popup_show: true,
            helper_content: '记住接下来展示的水果',
          }),
          playtime: 500
        }]
        this.syncOperation(demoOp)
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
        demoOp.steps = [{
          func: () => this.onClickShow(),
          playtime: 1500
        }, {
          func: () => {
            this.onClickHide()
            this.setData({
              popup_show: true,
              helper_content: '在方框中找出一个相同的水果\n注意不要超时咯',
            })
          },
          playtime: 1500
        }]
        this.syncOperation(demoOp)
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
          helper_state: 0,
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
  onLoad: function (option) {
    console.log(option);
    this.setData({
      testFlag: option.testFlag,
    })
    console.log(this.data.testFlag);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (option) {
    if(this.data.testFlag==2){
      wx.hideHomeButton();
    }
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
    clearTimeout(demoOp.controller)
    clearInterval(countDownTimer);
    clearInterval(subOp);
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