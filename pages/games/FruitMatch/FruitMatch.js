// pages/FruitMatch/FruitMatch.js
import Toast from '../../../miniprogram/miniprogram_npm/@vant/weapp/toast/toast/';

let demoOp = {
  steps: null,
  controller: null,
} //顺序执行计时器
let countDownTimer = null; //计时器
let imageLoadedNum = 0;
let available = {
  startButton: true,
  helpButton: true,
  nextButton: false,
  // selectImage: false,
}
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
    showGame: true, //是否开始游戏
    showPopup: true, //是否显示帮助
    showImage: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], //图片是否显示
    showImageBefore: [], //保证所有水果都有被展示
    showLevel: false, //是否显示等级
    level: 0, //等级
    helperContent: '方框中隐藏着不同的水果\n请尽可能多的记住它们', //帮助内容
    helperState: 0, //帮助状态
    slideImgArr: ['https://qbkeass.cn/images/games/fruitMatch/Fruits_info_1.png', 'https://qbkeass.cn/images/games/fruitMatch/fruit2-2.png', 'https://qbkeass.cn/images/games/fruitMatch/fruit2-3.png',], //游戏介绍图
    imageLevel: ["https://qbkeass.cn/images/level/level-A.png", "https://qbkeass.cn/images/level/level-B.png", "https://qbkeass.cn/images/level/level-C.png", "https://qbkeass.cn/images/level/level-D.png"], //游戏等级图

    testFlag: 0,
  },

  /**
   * 游戏相关函数
   */

  start: function () {
    if (!available.startButton) {
      return;
    } else {
      available.startButton = false
      available.helpButton = false
    }

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
      if (this.data.helperState == 0) {
        let subOp = setInterval(() => {
          this.animation();
          clearInterval(subOp);
        }, 800);
      } else {
        let subOp = setInterval(() => {
          available.nextButton = true
          this.helpNext();
          clearInterval(subOp);
        }, 800);
      }
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
    if (this.data.helperState > 0) {
      // 帮助界面
      available.startButton = true
      available.helpButton = true
      if (this.data.imageSet[e.currentTarget.dataset.row][e.currentTarget.dataset.index] == this.data.answer) {
        this.setData({
          showPopup: true,
          helperState: 0,
          helperContent: '恭喜您答对了\n开始您的挑战吧',
        })
      } else {
        this.setData({
          showPopup: true,
          helperState: 0,
          helperContent: '抱歉答案错误\n再接再厉吧',
        })
      }

      let subOp = setInterval(() => {
        this.hideImage();
        clearInterval(subOp);
      }, 1000);

    } else if (this.data.imageSet[e.currentTarget.dataset.row][e.currentTarget.dataset.index] == this.data.answer) {
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
        if (this.data.helperState == 0) {
          this.showLevel();
        } else {
          // 帮助界面
          available.startButton = true
          available.helpButton = true
          this.setData({
            showPopup: true,
            helperState: 0,
            helperContent: '抱歉超时啦\n再接再厉吧',
            corretNum: this.data.corretNum + 1,
          })

          let subOp = setInterval(() => {
            this.hideImage();
            clearInterval(subOp);
          }, 1000);
        }
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

  helper: function () {
    if (!available.helpButton) {
      return;
    } else {
      available.startButton = false
      available.helpButton = false
    }

    this.setData({
      showPopup: false,
      helperState: 1,
      showGame: true,
      round: 1,
      countDownNum: timeLimit,
    })
    this.setImage()
  },

  helpNext: function () {
    if (!available.nextButton) {
      return;
    } else {
      available.nextButton = false
    }

    let state = this.data.helperState;
    switch (state) {
      case 1: {
        this.setData({
          helperState: 2,
        })
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
          func: () => {
            available.nextButton = true
            this.setData({
              showPopup: true,
              helperContent: '记住接下来展示的水果',
            })
          },
          playtime: 500
        }]
        this.syncOperation(demoOp)
        break;
      }
      case 2: {
        let answer = this.data.imageSet[this.getRadomInt(this.data.rowNum, 0)][this.getRadomInt(this.data.rowNum, 0)];

        this.setData({
          showPopup: false,
          answer: answer,
          showQuestion: true,
          helperState: 3,
        })
        demoOp.steps = [{
          func: () => this.showAnswer(),
          playtime: 1500
        }, {
          func: () => {
            available.nextButton = true
            this.hideAnswer()
            this.setData({
              showPopup: true,
              helperContent: '在方框中找出一个相同的水果\n注意不要超时咯',
            })
          },
          playtime: 1500
        }]
        this.syncOperation(demoOp)
        break;
      }
      case 3: {
        this.setData({
          showPopup: false,
        })
        this.countDown()
        break;
      }
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