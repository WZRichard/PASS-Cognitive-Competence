// pages/FruitMatch/FruitMatch.js
import Toast from '../../../miniprogram/miniprogram_npm/@vant/weapp/toast/toast/';

let demoOp = {
  steps: null,
  controller: null,
} //顺序执行计时器
let countDownTimer = null; //计时器
let imageLoadedNum = 0;
const timeLimit = 10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    round: 0, //一共8轮(初始化为0)
    rowNum: 2, //行数（2或3）
    imageSet: [], //随机水果图片集
    answer: 1, //随即答案
    corretNum: 0, //正确题目数量
    countDownNum: timeLimit, //倒计时初始值(单位s)
    difficulty: [2, 2, 3, 3, 4, 4, 5, 6], //关卡困难程度（有几种水果）
    showQuestion: false, //是否开始答题
    showOverlay: false, //answer是否显示
    showGame: false, //是否开始游戏
    showPopup: true, //是否显示帮助
    showImage: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], //图片是否显示
    showImageBefore: [], //保证所有水果都有被展示
    showLevel: false, //是否显示等级
    level: 0, //等级
    slideImgArr: ['https://qbkeass.cn/images/games/fruitMatch/Fruits_info_1.png', 'https://qbkeass.cn/images/games/fruitMatch/fruit2-2.png', 'https://qbkeass.cn/images/games/fruitMatch/fruit2-3.png',], //游戏介绍图
    imageLevel: ["https://qbkeass.cn/images/level/level-A.png", "https://qbkeass.cn/images/level/level-B.png", "https://qbkeass.cn/images/level/level-C.png", "https://qbkeass.cn/images/level/level-D.png"], //游戏等级图
    help: [{
      img: './image/Fruit-info-1.gif',
      text: '进入游戏后，将会有几个隐藏着的水果格子，接下来的时间里会有水果依次翻出，你需要尽可能多的记住各自内的水果',
      startShow: false
    },
    {
      img: './image/Fruit-info-2.gif',
      text: '翻出三次水果后，会展示一张水果图片，请点击隐藏着这个水果的任意一个格子',
      startShow: true
    },
    ], //游戏介绍界面图库
    current: 0,

    testFlag: 0,
  },

  /**
   * 游戏相关函数
   */

  start: function () {
    this.setData({
      round: 1,
      showGame: true,
      showPopup: false,
      countDownNum: timeLimit,
    })
    this.setImage();
  },

  setImage: function () {
    var rowNum = this.data.rowNum;
    var new_row = [['', '', ''], ['', '', ''], ['', '', '']];
    var cnt = 0, row, col;
    while (cnt < this.data.difficulty[this.data.round - 1]) {
      row = this.getRadomInt(rowNum, 0);
      col = this.getRadomInt(rowNum, 0);
      if (new_row[row][col] == '') {
        new_row[row][col] = cnt + 1;
        cnt++;
      }
    }

    while (cnt < rowNum * rowNum) {
      row = this.getRadomInt(rowNum, 0);
      col = this.getRadomInt(rowNum, 0);
      if (new_row[row][col] == '') {
        new_row[row][col] = this.getRadomInt(this.data.difficulty[this.data.round - 1], 0) + 1;
        cnt++;
      }
    }

    // 返回未被修改的图片数量
    let old_row = this.data.imageSet;
    for (let i = 0; i < old_row.length && i < rowNum; i++) {
      for (let j = 0; j < old_row[0].length && j < rowNum; j++) {
        if (old_row[i][j] === new_row[i][j]) {
          imageLoadedNum++;
        }
      }
    }

    if (imageLoadedNum == (this.data.round < 3 ? 4 : 9)) {
      this.setImage();
      return;
    }

    console.log("setRow:" + new_row);
    this.setData({
      imageSet: new_row,
      showImageBefore: [],
    })
  },

  imageLoading: function () {
    imageLoadedNum++
    var round = this.data.round;
    console.log("loading image:" + imageLoadedNum);

    if (round == 0) {
      imageLoadedNum = 0
    } else if (imageLoadedNum == (round < 3 ? 4 : 9)) {
      imageLoadedNum = 0
      let subOp = setInterval(() => {
        this.animation();
        clearInterval(subOp);
      }, 800);
    }
  },

  nextRound: function () {
    var rowNum = this.data.rowNum == 2 && this.data.round == 2 ? this.data.rowNum + 1 : this.data.rowNum;
    console.log("rowNum=" + rowNum);

    let __subOp = setInterval(() => {
      this.hideImage();
      clearInterval(__subOp);
    }, 1000);

    let subOp = setInterval(() => {
      this.setData({
        rowNum: rowNum,
        round: this.data.round + 1,
        countDownNum: timeLimit,
      })
      this.setImage();
      clearInterval(subOp);
    }, 2400);
  },

  animation: function () {

    demoOp.steps = [{
      func: () => this.showImageRandom(false),
      playtime: 1500
    }, {
      func: () => this.hideImage(),
      playtime: 1500
    }, {
      func: () => this.showImageRandom(true),
      playtime: 1500
    }, {
      func: () => this.hideImage(),
      playtime: 1500
    }, {
      func: () => this.showImageRandom(false),
      playtime: 1500
    }, {
      func: () => this.hideImage(),
      playtime: 1500
    }, {
      func: () => this.showAnswer(),
      playtime: 1500
    }, {
      func: () => {
        this.hideAnswer()
        this.countDown()
      }
    }]
    this.syncOperation(demoOp)
  },

  tapImage: function (e) {
    if (!this.data.showQuestion) {
      return;
    }

    var showImage = this.data.showImage
    showImage[e.currentTarget.dataset.row][e.currentTarget.dataset.index] = 1
    this.setData({
      showImage: showImage,
      showQuestion: false,
    })

    clearInterval(countDownTimer);
    if (this.data.imageSet[e.currentTarget.dataset.row][e.currentTarget.dataset.index] == this.data.answer) {
      // 答案正确
      this.setData({
        corretNum: this.data.corretNum + 1,
      });

      if (this.data.round == 8) {
        let _subOp = setInterval(() => {
          Toast("恭喜您 通关了");
          this.showLevel();
          clearInterval(_subOp);
        }, 900);
      } else {
        let _subOp = setInterval(() => {
          Toast("正确 恭喜您");
          this.nextRound();
          clearInterval(_subOp);
        }, 900);
      }
    } else {
      // 答案错误
      let _subOp = setInterval(() => {
        Toast("选错啦");
        this.showLevel();
        clearInterval(_subOp);
      }, 900);
    }
  },

  showImageRandom: function (isround2) {
    var newShowImage = this.data.showImage, pb = this.data.showImageBefore;
    var pc = [], cnt = 0, copy = [];

    //第二关时取相反的值
    if (isround2) {
      for (let i = 0; i < pb.length; i++) {
        for (let j = 0; j < pb[0].length; j++) {
          if (!pb[i][j]) {
            pc.push([i, j]);
            newShowImage[pc[cnt][0]][pc[cnt][1]] = 1;
            cnt++;
          }
        }
      }
    }

    //然给随机显示图片
    for (; cnt < Math.pow(this.data.rowNum, 2) / 2; cnt++) {
      while (true) {
        var pb = [this.getRadomInt(this.data.rowNum, 0), this.getRadomInt(this.data.rowNum, 0)], j;
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
      newShowImage[pc[cnt][0]][pc[cnt][1]] = 1;
    }

    console.log("随机显示" + newShowImage);
    if (!isround2) {
      copy = newShowImage.concat();
    }
    this.setData({
      showImage: newShowImage,
      showImageBefore: copy,
    })
  },

  hideImage: function () {
    this.setData({
      showImage: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      // showImage: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    })
  },

  showAnswer() {
    var answer = this.data.imageSet[this.getRadomInt(this.data.rowNum, 0)][this.getRadomInt(this.data.rowNum, 0)];

    this.setData({
      showOverlay: true,
      answer: answer,
    });
  },

  hideAnswer() {
    this.setData({
      showOverlay: false,
      showQuestion: true,
    });
  },

  countDown: function () {
    let countDownNum = this.data.countDownNum;
    countDownTimer = setInterval(() => {
      if (countDownNum <= 0) {
        clearInterval(countDownTimer)
        this.showLevel();
      } else {
        countDownNum = countDownNum - 1
        this.setData({
          countDownNum: countDownNum,
        })
      }
    }, 1000)
  },

  getScore: function () {
    var score = 0, corretNum = this.data.corretNum;
    if (corretNum < 2) {
      score = corretNum * 0.75;
    } else if (corretNum < 4) {
      score = 1.5 + (corretNum - 2) * 1.25;
    } else {
      score = 4 + (corretNum - 4) * 1.5;
    }

    return score;
  },

  showLevel: function () {

    var score = this.getScore(), level;
    wx.setStorage({ key: "hasShuiguo", data: true })
    wx.setStorage({ key: "shuiguo", data: score })

    if (score >= 85) {
      level = 1;
    } else if (score >= 65) {
      level = 2;
    } else if (score >= 40) {
      level = 3;
    } else {
      level = 4;
    }
    console.log(score);

    let _subOp = setInterval(() => {
      this.setData({
        showLevel: true,
        level: level - 1,
      })
      clearInterval(_subOp);
    }, 2000);

    let subOp = setInterval(() => {
      this.exit();
      clearInterval(subOp);
    }, 5000);
  },

  exit: function () {
    this.setData({
      showLevel: false,
    })

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

  getRadomInt: function (a, b) {
    return parseInt(Math.random() * a + b);
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

  currentHandle(e) {
    let {
      current
    } = e.detail
    this.setData({
      current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option);
    this.setData({
      testFlag: option.testFlag,
    })
    
    var res = wx.getSystemInfoSync();
    this.setData({
      testFlag: option.testFlag,
      gameHeight: 750 / res.windowWidth * res.windowHeight,
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
  onShow: function (option) {
    if (this.data.testFlag == 2) {
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