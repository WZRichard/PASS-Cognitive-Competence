// pages/Matrix_pro/Matrix_pro.js
import Toast from '../../../miniprogram/miniprogram_npm/@vant/weapp/toast/toast/';
import Dialog from '../../../miniprogram/miniprogram_npm/@vant/weapp/dialog/dialog';

let countDownTimer = null //计时器
let cnt_image_loading = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_name_pre: "https://qbkeass.cn/images/games/matrixPro/Matrix-", //图片地址头部
    cnt_question: 20, //题目集题目总个数
    question_index: 1, //待做题目下标
    done_index: [], //已做题目下标
    round: 0, //轮数 (初始化为0，0表示未开始)
    cnt_round: 5, //总轮数
    answer: [1, 3, 3, 3, 3, 1, 4, 2, 4, 4, 4, 4, 3, 1, 3, 1, 1, 3, 1, 2], //题目答案集(1:A; 2:B; 3:C; 4:D)
    selector: 0, //被选择选项（每一关初始化为0）
    countDownNum: 30, //计时时长（单位s；总时长30s）
    // timer: null, 
    // cnt_image_loading: 0, //有几张图片已经加载完成（初始化为0）
    question_hidden: true, //题目是否显示
    bingo_cnt: 0, //正确题目个数
    slideImgArr: ['https://qbkeass.cn/images/games/matrixPro/Matrix_info_2.png', 'https://qbkeass.cn/images/games/matrixPro/Matrix_info_3.png',], //游戏介绍界面
    startGame: false, //是否开始游戏
    level_image: ["https://qbkeass.cn/images/level/level-A.png", "https://qbkeass.cn/images/level/level-B.png", "https://qbkeass.cn/images/level/level-C.png", "https://qbkeass.cn/images/level/level-D.png"],
    level_show: false,
    level: 0,

    testFlag: 0,
  },

  /**
   * 游戏内部函数
   */
  comfirm: function () {
    if (this.data.selector == 0) return;

    if (this.data.countDownNum > 29) {
      Toast('请多加思考哦');
      return;
    }

    clearInterval(countDownTimer);
    // console.log(this.data.selector);
    // console.log(this.data.answer[this.data.question_index - 1]);
    if (this.data.selector == this.data.answer[this.data.question_index - 1]) { //答案正确
      this.setData({
        bingo_cnt: this.data.bingo_cnt + 1,
      })
    }
    if (this.data.round < this.data.cnt_round) {
      this.next_Question();
    } else {
      // Toast.success('闯关成功');
      this.rebegin();
    }

    // if (this.data.selector == this.data.answer[this.data.question_index - 1]) { //答案正确
    //   if (this.data.round < this.data.cnt_round) {
    //     Toast.success('答案正确');
    //     this.next_Question();
    //   } else {
    //     Toast.success('闯关成功');
    //     this.rebegin();
    //   }
    // } else { //答案错误
    //   Dialog.confirm({
    //     message: '可惜！答案错误',
    //     confirmButtonText: '再来一次',
    //     cancelButtonText: '返回',
    //   })
    //     .then(() => {
    //       this.restart();
    //     })
    //     .catch(() => {
    //       this.rebegin();
    //     });
    // }
  },

  // restart: function () {
  //   var question_index = this.random_question_index();

  //   this.setData({
  //     done_index: [], //已做题目下标
  //     round: 0, //轮数 (初始化为0，0表示未开始)
  //     selector: 0, //被选择选项（每一关初始化为0）
  //     countDownNum: 30, //计时时长（单位s；总时长30s）
  //     timer: null, //计时器
  //     question_hidden: true,
  //     round: 1,
  //     question_index: question_index,
  //   })
  // },

  next_Question: function () {
    this.data.done_index.push(this.data.question_index);
    var round = this.data.round;
    var question_index = this.random_question_index();

    this.setData({
      selector: 0,
      round: round + 1,
      question_index: question_index,
      question_hidden: true,
      countDownNum: 30,
    });
  },

  image_loaded: function (e) {
    // var cnt_image_loading = this.data.cnt_image_loading + 1;
    cnt_image_loading++
    console.log("loading image:" + cnt_image_loading);
    
    if (this.data.round == 0) {
      cnt_image_loading = 0
    } else if (cnt_image_loading == 3) {
      this.countDown();

      cnt_image_loading = 0
      this.setData({
        question_hidden: false,
        countDownNum: 30,
      })
    }
  },

  image_loading_error: function () {
    //待实现
    console.log("error");
  },

  random_question_index: function () {
    var index = parseInt(Math.random() * this.data.cnt_question + 1);
    while (this.data.done_index.indexOf(index) != -1) {
      index = parseInt(Math.random() * this.data.cnt_question + 1);
    }
    return index;
  },

  rebegin: function () {
    var score = this.data.bingo_cnt * 100.0 / this.data.cnt_round
    var level;
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

    this.setData({
      level_show: true,
      level: level - 1,
    })

    setTimeout(() => this.exit(), 2500);
    clearTimeout();
  },

  exit: function () {
    this.setData({
      level_show: false,
      //   done_index: [], //已做题目下标
      //   round: 0, //轮数 (初始化为0，0表示未开始)
      //   selector: 0, //被选择选项（每一关初始化为0）
      //   countDownNum: 30, //计时时长（单位s；总时长30s）
      //   timer: null, //计时器
      //   question_hidden: true,
      //   bingo_cnt: 0,
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

  select: function (e) {
    this.setData({
      selector: e.currentTarget.dataset.selection,
    })
  },

  start: function () {
    //当开始游戏按钮被点击时，隐藏视觉搜索介绍
    var question_index = this.random_question_index()
    while (this.data.question_index == question_index) {
      question_index = this.random_question_index()
    }
    
    this.setData({
      startGame: true,
      round: 1,
      question_index: question_index,
    })
  },

  overtime: function () { //超时
    Toast.fail('超时啦');

    this.next_Question();
  },

  /**
   * 计时器
   */
  countDown: function () {
    // let that = this;
    let countDownNum = this.data.countDownNum;
    countDownTimer = setInterval(() => {
      if (countDownNum <= 0) {
        clearInterval(countDownTimer);
        this.overtime();
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