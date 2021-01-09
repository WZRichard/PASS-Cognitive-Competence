// pages/SentenceRepetition/index.js
import Toast from '../../../miniprogram/miniprogram_npm/@vant/weapp/toast/toast/';
import Dialog from '../../../miniprogram/miniprogram_npm/@vant/weapp/dialog/dialog/';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    help: [{
      img: 'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/Game_SentenceRepetition/1.gif',
      text: '进入页面后，你将会看到上面的题目和下面的选项，点击就能选择啦',
      startShow: false
    },
    {
      img: 'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/Game_SentenceRepetition/2.png',
      text: '做完了别忘了提交哦，一道题限时7s，超时不算分哦',
      startShow: true
    },
  ], //游戏介绍界面图库
    color: ["红", "橙", "黄", "绿", "青", "蓝", "紫", "黑", "灰", "白", "棕", "粉"], //所有颜色
    colorCount: 12, //颜色总数
    answer: 0, //当前题目答案
    question: "", //题目描述
    finalColor: "", //变成什么颜色
    selectA: "", //选项文字
    selectB: "",
    selectC: "",
    selectD: "",
    round: 0, //轮数 (初始化为0，0表示未开始)
    cntRound: 5, //总轮数
    selector: -1, //被选择选项（每一关初始化为-1）
    time: 7, //剩余时间
    timerCount: 0, // 定时器计数器
    timer: null, //计时器
    rightCount: 0, //正确题目个数
    scoreShow: false, //等级显示
    scoreImg: "",

    current: 0,
    gameHeight:0,
    testFlag: 0,
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
   * 开始游戏
   */
  tapStart: function () {
    this.setData({
      round: 1,

    })
    this.round1();
    this.countInterval();
  },

  /**
   * 提交
   */
  confirm: function () {
    this.clearTimer();
    if (this.data.selector == this.data.answer) { //答案正确
      this.setData({
        rightCount: this.data.rightCount + 1,
      })
    }

    if (this.data.round < this.data.cntRound) {
      this.next_Question();
    } else {
      this.gameOver();
    }
  },

  /**
   * 第一关
   */
  round1: function () {
    var color1 = this.random_color();
    var color2 = this.random_color();
    while (color2 === color1) {
      color2 = this.random_color();
    }
    var selects = [];
    for (var i = 0; i < 4; i++) {
      var color = this.random_color();
      while (color === color1 || color === color2 || selects.indexOf(color) != -1) {
        color = this.random_color();
      }
      selects.push(color);
    }
    if (Math.random < 0.5) {
      var index = parseInt(Math.random() * 4);
      selects[index] = color1;
      var b = parseInt(Math.random * 3 + 1)
      selects[(index + b) % 4] = color2;
      this.setData({
        finalColor: "问： 哪个颜色正在变" + this.data.color[color2],
      })
    } else {
      var index = parseInt(Math.random() * 4);
      selects[index] = color2;
      var b = parseInt(Math.random * 3 + 1)
      selects[(index + b) % 4] = color1;
      this.setData({
        finalColor: "问： " + this.data.color[color1] + "色正在变哪个颜色",
      })
    }
    this.setData({
      question: "这个" + this.data.color[color1] + "色正在变为" + this.data.color[color2] + "色",
      answer: index,
      selectA: this.data.color[selects[0]] + "色",
      selectB: this.data.color[selects[1]] + "色",
      selectC: this.data.color[selects[2]] + "色",
      selectD: this.data.color[selects[3]] + "色",
    })
  },

  /**
   * 第二关
   */
  round2: function () {
    var color1 = this.random_color();
    var color2 = this.random_color();
    while (color2 === color1) {
      color2 = this.random_color();
    }
    var color3 = this.random_color();
    var color4 = this.random_color();
    while (color4 === color1 || color4 === color2) {
      color4 = this.random_color();
    }
    var color5 = this.random_color();
    while (color5 === color3) {
      color5 = this.random_color();
    }
    var selects = [];
    for (var i = 0; i < 4; i++) {
      var color = this.random_color();
      while (color === color1 || color === color2 || color === color4 || selects.indexOf(color) != -1) {
        color = this.random_color();
      }
      selects.push(color);
    }
    var index1 = parseInt(Math.random() * 4);
    var index4 = parseInt(Math.random() * 4);
    while (index4 === index1) {
      index4 = parseInt(Math.random() * 4);
    }
    selects[index1] = color1;
    selects[index4] = color4;
    if (Math.random() < 0.5) {
      this.setData({
        finalColor: "问： 哪个颜色正在变" + this.data.color[color3],
        answer: index1,
      })
    } else {
      this.setData({
        finalColor: "问： 哪个颜色正在变" + this.data.color[color5],
        answer: index4,
      })
    }
    this.setData({
      question: this.data.color[color1] + this.data.color[color2] + "变成" + this.data.color[color3] + "色\n" + this.data.color[color4] + this.data.color[color2] + "变成" + this.data.color[color5] + "色\n",
      selectA: this.data.color[selects[0]] + this.data.color[color2] + "色",
      selectB: this.data.color[selects[1]] + this.data.color[color2] + "色",
      selectC: this.data.color[selects[2]] + this.data.color[color2] + "色",
      selectD: this.data.color[selects[3]] + this.data.color[color2] + "色",
    })
  },

  /**
   * 第三关
   */
  round3: function () {
    var color1 = this.random_color();
    var color2 = this.random_color();
    while (color2 === color1) {
      color2 = this.random_color();
    }
    var color3 = this.random_color();
    while (color3 === color1 || color3 === color2) {
      color3 = this.random_color();
    }
    var color4 = this.random_color();
    while (color4 === color1 || color4 === color2 || color4 === color3) {
      color4 = this.random_color();
    }
    var index1 = parseInt(Math.random() * 4);
    var index2 = parseInt(Math.random() * 4);
    while (index2 === index1) {
      index2 = parseInt(Math.random() * 4);
    }
    var index3 = parseInt(Math.random() * 4);
    while (index3 === index1 || index3 === index2) {
      index3 = parseInt(Math.random() * 4);
    }
    var index4 = parseInt(Math.random() * 4);
    while (index4 === index1 || index4 === index2 || index4 === index3) {
      index4 = parseInt(Math.random() * 4);
    }
    var selects = [];
    if (Math.random < 0.5) {
      selects[index1] = "把" + this.data.color[color2] + this.data.color[color3] + "色变成" + this.data.color[color4] + "色";
      selects[index2] = "把" + this.data.color[color3] + this.data.color[color2] + "色变成" + this.data.color[color4] + "色";
      selects[index3] = "把" + this.data.color[color3] + this.data.color[color2] + "色变成" + this.data.color[color1] + "色";
      selects[index4] = "把" + this.data.color[color2] + this.data.color[color3] + "色变成" + this.data.color[color1] + "色";
      this.setData({
        finalColor: "问： " + this.data.color[color1] + "色正在做什么？",
      })
    } else {
      selects[index1] = this.data.color[color1] + "色把" + this.data.color[color2] + this.data.color[color3] + "色";
      selects[index2] = this.data.color[color1] + "色把" + this.data.color[color3] + this.data.color[color2] + "色";
      selects[index3] = this.data.color[color4] + "色把" + this.data.color[color2] + this.data.color[color3] + "色";
      selects[index4] = this.data.color[color4] + "色把" + this.data.color[color3] + this.data.color[color2] + "色";
      this.setData({
        finalColor: "问： 什么颜色把什么颜色变成" + this.data.color[4] + "色？",
      })
    }
    this.setData({
      question: this.data.color[color1] + "色把" + this.data.color[color2] + this.data.color[color3] + "色变成" + this.data.color[color4] + "色",
      answer: index1,
      selectA: selects[0],
      selectB: selects[1],
      selectC: selects[2],
      selectD: selects[3],
    })
  },

  /**
   * 第四关
   */
  round4: function () {
    var color1 = this.random_color();
    var color2 = this.random_color();
    while (color2 === color1) {
      color2 = this.random_color();
    }
    var color3 = this.random_color();
    var color4 = this.random_color();
    while (color4 === color1 || color4 === color2) {
      color4 = this.random_color();
    }
    var color5 = this.random_color();
    while (color5 === color1 || color5 === color2 || color5 === color4) {
      color5 = this.random_color();
    }
    var color6 = this.random_color();
    while (color6 === color3) {
      color6 = this.random_color();
    }
    var index1 = parseInt(Math.random() * 4);
    var index2 = parseInt(Math.random() * 4);
    while (index2 === index1) {
      index2 = parseInt(Math.random() * 4);
    }
    var index3 = parseInt(Math.random() * 4);
    while (index3 === index1 || index3 === index2) {
      index3 = parseInt(Math.random() * 4);
    }
    var index4 = parseInt(Math.random() * 4);
    while (index4 === index1 || index4 === index2 || index4 === index3) {
      index4 = parseInt(Math.random() * 4);
    }
    var selects = [];
    selects[index1] = this.data.color[color1] + "色的" + this.data.color[color2] + "色";
    selects[index2] = this.data.color[color2] + "色的" + this.data.color[color1] + "色";
    selects[index3] = this.data.color[color4] + "色的" + this.data.color[color5] + "色";
    selects[index4] = this.data.color[color5] + "色的" + this.data.color[color4] + "色";
    if (Math.random < 0.5) {
      this.setData({
        finalColor: "问： 谁是" + this.data.color[color3] + "的",
        answer: index1,
      })
    } else {
      this.setData({
        finalColor: "问： 谁是" + this.data.color[color6] + "的",
        answer: index3,
      })
    }
    this.setData({
      question: this.data.color[color1] + "色的" + this.data.color[color2] + "色是" + this.data.color[color3] + "色的，\n而这些" + this.data.color[color4] + "色的" + this.data.color[color5] + "色是" + this.data.color[color6] + "色的",
      selectA: selects[0],
      selectB: selects[1],
      selectC: selects[2],
      selectD: selects[3],
    })
  },

  /**
   * 第五关
   */
  round5: function () {
    var color1 = this.random_color();
    var color2 = this.random_color();
    while (color2 === color1) {
      color2 = this.random_color();
    }
    var color3 = this.random_color();
    while (color3 === color1 || color3 === color2) {
      color3 = this.random_color();
    }
    var color4 = this.random_color();
    while (color4 === color1 || color4 === color2 || color4 === color3) {
      color4 = this.random_color();
    }
    var color5 = this.random_color();
    while (color5 === color1 || color5 === color2 || color5 === color3 || color5 === color4) {
      color5 = this.random_color();
    }
    var color6 = this.random_color();
    while (color6 === color1 || color6 === color2 || color6 === color3 || color6 === color4 || color6 === color5) {
      color6 = this.random_color();
    }
    var index1 = parseInt(Math.random() * 4);
    var index2 = parseInt(Math.random() * 4);
    while (index2 === index1) {
      index2 = parseInt(Math.random() * 4);
    }
    var index3 = parseInt(Math.random() * 4);
    while (index3 === index1 || index3 === index2) {
      index3 = parseInt(Math.random() * 4);
    }
    var index4 = parseInt(Math.random() * 4);
    while (index4 === index1 || index4 === index2 || index4 === index3) {
      index4 = parseInt(Math.random() * 4);
    }
    var selects = [];
    selects[index1] = this.data.color[color2] + "色中";
    selects[index2] = this.data.color[color5] + "色中";
    if (Math.random < 0.5) {
      selects[index3] = this.data.color[color1] + "色中";
      selects[index4] = this.data.color[color3] + "色中";
      this.setData({
        finalColor: "问： " + this.data.color[color4] + "色在哪里" + this.data.color[color6] + "色着？",
        answer: index2,
      })
    } else {
      selects[index3] = this.data.color[color4] + "色中";
      selects[index4] = this.data.color[color6] + "色中";
      this.setData({
        finalColor: "问： " + this.data.color[color1] + "色在哪里" + this.data.color[color3] + "色着？",
        answer: index1,
      })
    }
    this.setData({
      question: "当" + this.data.color[color1] + "色在" + this.data.color[color2] + "色中" + this.data.color[color3] + "色的时候，\n" + this.data.color[color4] + "色在" + this.data.color[color5] + "色中" + this.data.color[color6] + "色着",
      selectA: selects[0],
      selectB: selects[1],
      selectC: selects[2],
      selectD: selects[3],
    })
  },

  /**
   * 下一题
   */
  next_Question: function () {
    this.setData({
      selector: -1,
      round: this.data.round + 1,
      time: 7,
      answer: 0,
      colorSelect: [],
      question: "",
      finalColor: "",
      selectA: "",
      selectB: "",
      selectC: "",
      selectD: "",
    });
    if (this.data.round === 2) this.round2();
    else if (this.data.round === 3) this.round3();
    else if (this.data.round === 4) this.round4();
    else if (this.data.round === 5) this.round5();
    this.countInterval();
  },

  /**
   * 随机一个颜色
   */
  random_color: function () {
    var index = parseInt(Math.random() * this.data.colorCount);
    return index;
  },

  select: function (e) {
    this.setData({
      selector: e.currentTarget.dataset.selection,
    })
  },

  overtime: function () { //超时
    this.clearTimer();
    if (this.data.round < this.data.cntRound) {
      Toast.fail('超时啦');
      this.next_Question();
    } else {
      this.gameOver();
    }
  },

  clearTimer: function () {
    clearInterval(this.timer);
    this.setData({
      timerCount: 0
    })
  },
  /**
   * 设置一个定时器
   */
  countInterval: function () {
    // 设置倒计时 定时器 每1000毫秒执行一次，计数器count+1
    this.timer = setInterval(() => {
      if (this.data.timerCount >= 7) {
        this.overtime();
      } else {
        this.data.timerCount++;
        this.setData({
          time: this.data.time - 1
        })
      }
    }, 1000)
  },
  /**
   * 游戏结束
   */

  gameOver: function () {
    console.log("做对：" + this.data.rightCount);
    var score = this.data.rightCount * 2 * 10;
    if (score >= 90) {
      this.setData({
        scoreImg: "https://qbkeass.cn/images/level/level-A.png"
      })
    } else if (score < 90 && score >= 75) {
      this.setData({
        scoreImg: "https://qbkeass.cn/images/level/level-B.png"
      })
    } else if (score < 75 && score >= 60) {
      this.setData({
        scoreImg: "https://qbkeass.cn/images/level/level-C.png"
      })
    } else {
      this.setData({
        scoreImg: "https://qbkeass.cn/images/level/level-D.png"
      })
    }
    console.log("分数：" + score);
    this.setData({
      scoreShow: true
    });
    this.sleep(3000).then(() => {
      this.setData({
        scoreShow: false
      });
      if (this.data.testFlag == 0) {
        wx.switchTab({
          url: '/pages/games/index',
        })
      } else if (this.data.testFlag == 1) {
        wx.redirectTo({
          url: '/pages/games/visualSearch/index?testFlag=1',
        })
      } else {
        wx.redirectTo({
          url: '/pages/games/visualSearch/index?testFlag=2',
        })
      }
    })

  },


  sleep: function (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option) //可以打印一下option看查看参数
    var res = wx.getSystemInfoSync();
    this.setData({
      testFlag: option.testFlag,
      gameHeight: 750 / res.windowWidth * res.windowHeight,
    })
    console.log(this.data.testFlag)

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
    this.clearTimer();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.clearTimer();
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