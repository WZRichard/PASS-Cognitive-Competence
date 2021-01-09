// pages/Matrix_pro/Matrix_pro.js
import Toast from '../../../miniprogram/miniprogram_npm/@vant/weapp/toast/toast/';

let countDownTimer = null; //计时器
let imageLoadedNum = 0;
const timeLimit = 30;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    round: 0, //轮数
    roundNum: 5, //总轮数 
    questionNum: 15, //题目集题目总个数
    questionIndex: 1, //当前题目下标
    doneQuestionIndex: [], //已做题目下标
    answer: [4, 2, 6, 3, 6, 2, 1, 4, 4, 3, 6, 6, 6, 3, 6], //题目答案集
    countDownNum: timeLimit, //计时时长（单位s；总时长30s）
    corretNum: 0, //正确题目个数
    showQuestion: false, //题目是否显示
    showGame: false, //游戏是否显示
    showLevel: false, //等级是否显示
    selectedImage: 0,
    selectedImageClass: 'image1',
    level: 0, //等级
    imageNameHead: "https://qbkeass.cn/images/games/matrixPro/", //图片地址头部
    slideImgArr: [,], //游戏介绍图
    imageLevel: ["https://qbkeass.cn/images/level/level-A.png", "https://qbkeass.cn/images/level/level-B.png", "https://qbkeass.cn/images/level/level-C.png", "https://qbkeass.cn/images/level/level-D.png"], //游戏等级图

    testFlag: 0,
  },

  /**
   * 游戏内部函数
   */

  start: function () {
    //当开始游戏按钮被点击时，隐藏视觉搜索介绍
    var questionIndex = this.getIndexRamdom(), pa = this.data.questionIndex;
    
    this.setData({
      round: 1,
      showGame: true,
      questionIndex: questionIndex,
    })

    if (questionIndex == pa) {
      imageLoadedNum--;
      this.imageLoading();
    }
  },

  nextQuestion: function () {
    var questionIndex = this.getIndexRamdom();
    while (this.data.questionIndex == questionIndex) {
      questionIndex = this.getIndexRamdom()
    }

    this.setData({
      round: this.data.round + 1,
      showQuestion: false,
      questionIndex: questionIndex,
      selectedImage: 0,
    });
  },

  imageLoading: function () {
    imageLoadedNum++
    
    if (imageLoadedNum >= 7 && this.data.round != 0) {
      console.log("image loaded")

      this.setData({
        countDownNum: timeLimit,
        showQuestion: true,
      })

      imageLoadedNum = 0
      this.countDown()
    }
  },

  getIndexRamdom: function () {
    var index = parseInt(Math.random() * this.data.questionNum + 1);
    while (this.data.doneQuestionIndex.indexOf(index) != -1) {
      index = parseInt(Math.random() * this.data.questionNum + 1);
    }
    console.log("getNextQuestionIndex:"+index);
    return index;
  },

  tapImage: function(e) {
    this.setData({
      selectedImage: e.currentTarget.dataset.select,
    })
  },

  comfirm: function() {

    this.data.doneQuestionIndex.push(this.data.questionIndex);
    clearInterval(countDownTimer);

    if (this.data.selectedImage == this.data.answer[this.data.questionIndex-1]) {
      this.setData({
        corretNum: this.data.corretNum + 1,
      })
    }

    if (this.data.round < this.data.roundNum) {
      this.nextQuestion();
    } else {
      this.gameOver();
    }

  },

  gameOver: function () {
    var score = this.data.score != 0 ? this.data.corretNum * 100.0 / this.data.doneQuestionIndex.length:0, level;
    console.log("score:"+score);
    wx.setStorage({ key: "hasJuzhen", data: true })
    wx.setStorage({ key: "juzhen", data: score })

    if (score >= 90) {
      level = 1;
    } else if (score < 90 && score >= 75) {
      level = 2;
    } else if (score < 75 && score >= 60) {
      level = 3;
    } else {
      level = 4;
    }

    this.setData({
      showLevel: true,
      level: level - 1,
    })

    var _subOp = setInterval(() => {
      this.exit()
      clearInterval(_subOp);
    }, 2500);
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
        url: '/pages/games/zicihuiyi/zicihuiyi?testFlag=1',
      })
    } else {
      wx.redirectTo({
        url: '/pages/games/zicihuiyi/zicihuiyi?testFlag=2',
      })
    }
  },

  overTime: function () {
    Toast ('超时啦');
    this.data.doneQuestionIndex.push(this.data.questionIndex);

    var _subOp = setInterval(() => {
      if (this.data.round < this.data.roundNum) {
        this.nextQuestion();
      } else {
        this.gameOver();
      }
      clearInterval(_subOp);
    }, 1800);
  },

  countDown: function () {
    let countDownNum = this.data.countDownNum;
    countDownTimer = setInterval(() => {
      if (countDownNum <= 0) {
        clearInterval(countDownTimer);
        this.overTime();
      } else {
        countDownNum = countDownNum - 1
        this.setData({
          countDownNum: countDownNum,
        })
      }
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option)
    this.setData({
      testFlag: option.testFlag
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