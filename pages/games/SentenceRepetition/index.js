// pages/SentenceRepetition/index.js
import Toast from '../../../miniprogram/miniprogram_npm/@vant/weapp/toast/toast/';
import Dialog from '../../../miniprogram/miniprogram_npm/@vant/weapp/dialog/dialog/';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    slideImgArr: ['https://qbkeass.cn/images/games/sentenceQusetion/help-1.png', 'https://qbkeass.cn/images/games/sentenceQusetion/help-2.png', ], //游戏介绍界面图库
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
    cnt_round: 5, //总轮数
    selector: -1, //被选择选项（每一关初始化为-1）
    time: 10, //剩余时间
    timerCount: 0, // 定时器计数器
    timer: null, //计时器
    rightCount: 0, //正确题目个数
    scoreShow: false, //等级显示
    scoreImg: "",

    testFlag:0,
  },

  /**
   * 开始游戏
   */
  tap_start: function () {
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
    if (this.data.selector === 0) return;
    this.clearTimer();
    if (this.data.selector == this.data.answer) { //答案正确
      this.setData({
        rightCount: this.data.rightCount + 1,
      })
    }

    if (this.data.round < this.data.cnt_round) {
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
      while (color === color1 || selects.indexOf(color) != -1) {
        color = this.random_color();
      }
      selects.push(color);
    }
    var index = parseInt(Math.random() * 4);
    selects[index] = color1;
    this.setData({
      question: "这个" + this.data.color[color1] + "色正在变为" + this.data.color[color2] + "色",
      finalColor: "问： 哪个颜色正在变" + this.data.color[color2],
      answer: index,
      selectA: this.data.color[selects[0]],
      selectB: this.data.color[selects[1]],
      selectC: this.data.color[selects[2]],
      selectD: this.data.color[selects[3]],
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
    var selects = [];
    for (var i = 0; i < 4; i++) {
      var color = this.random_color();
      while (color === color1 || color === color2 || selects.indexOf(color) != -1) {
        color = this.random_color();
      }
      selects.push(color);
    }
    var index = parseInt(Math.random() * 4);
    selects[index] = color1;
    this.setData({
      question: this.data.color[color1] + this.data.color[color2] + "变成" + this.data.color[color3] + "色",
      finalColor: "问： 哪个颜色正在变" + this.data.color[color3],
      answer: index,
      selectA: this.data.color[selects[0]] + this.data.color[color2],
      selectB: this.data.color[selects[1]] + this.data.color[color2],
      selectC: this.data.color[selects[2]] + this.data.color[color2],
      selectD: this.data.color[selects[3]] + this.data.color[color2],
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
      selectA: this.data.color[selects[0]] + this.data.color[color2],
      selectB: this.data.color[selects[1]] + this.data.color[color2],
      selectC: this.data.color[selects[2]] + this.data.color[color2],
      selectD: this.data.color[selects[3]] + this.data.color[color2],
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
    while (color5 === color3) {
      color5 = this.random_color();
    }
    var color6 = this.random_color();
    while (color6 === color1 || color6 === color2 || color6 === color4) {
      color6 = this.random_color();
    }
    var color7 = this.random_color();
    while (color7 === color3 || color7 === color5) {
      color7 = this.random_color();
    }
    var selects = [-1, -1, -1, -1];
    var index1 = parseInt(Math.random() * 4);
    selects[index1] = color1;
    var index4 = parseInt(Math.random() * 4);
    while (selects[index4] != -1) {
      index4 = parseInt(Math.random() * 4);
    }
    selects[index4] = color4;
    var index6 = parseInt(Math.random() * 4);
    while (selects[index6] != -1) {
      index6 = parseInt(Math.random() * 4);
    }
    selects[index6] = color6;
    var color = this.random_color();
    while (color === color2 || selects.indexOf(color) != -1)
      color = this.random_color();
    selects[selects.indexOf(-1)] = color;
    var ran = Math.random();
    if (ran < 0.33) {
      this.setData({
        finalColor: "问： 哪个颜色正在变" + this.data.color[color3],
        answer: index1,
      })
    } else if (ran < 0.66) {
      this.setData({
        finalColor: "问： 哪个颜色正在变" + this.data.color[color5],
        answer: index4,
      })
    } else {
      this.setData({
        finalColor: "问： 哪个颜色正在变" + this.data.color[color7],
        answer: index6,
      })
    }
    this.setData({
      question: this.data.color[color1] + this.data.color[color2] + "变成" + this.data.color[color3] + "色\n" + this.data.color[color4] + this.data.color[color2] + "变成" + this.data.color[color5] + "色\n" + this.data.color[color6] + this.data.color[color2] + "变成" + this.data.color[color7] + "色\n",
      selectA: this.data.color[selects[0]] + this.data.color[color2],
      selectB: this.data.color[selects[1]] + this.data.color[color2],
      selectC: this.data.color[selects[2]] + this.data.color[color2],
      selectD: this.data.color[selects[3]] + this.data.color[color2],
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
    var color4 = this.random_color();
    while (color4 === color1 || color4 === color2) {
      color4 = this.random_color();
    }
    var color5 = this.random_color();
    while (color5 === color3) {
      color5 = this.random_color();
    }
    var color6 = this.random_color();
    while (color6 === color1 || color6 === color2 || color6 === color4) {
      color6 = this.random_color();
    }
    var color7 = this.random_color();
    while (color7 === color3 || color7 === color5) {
      color7 = this.random_color();
    }
    var color8 = this.random_color();
    while (color8 === color1 || color8 === color2 || color8 === color4 || color8 === color6) {
      color8 = this.random_color();
    }
    var color9 = this.random_color();
    while (color9 === color3 || color9 === color5 || color9 === color7) {
      color9 = this.random_color();
    }
    var selects = [-1, -1, -1, -1];
    var index1 = parseInt(Math.random() * 4);
    selects[index1] = color1;
    var index4 = parseInt(Math.random() * 4);
    while (selects[index4] != -1) {
      index4 = parseInt(Math.random() * 4);
    }
    selects[index4] = color4;
    var index6 = parseInt(Math.random() * 4);
    while (selects[index6] != -1) {
      index6 = parseInt(Math.random() * 4);
    }
    selects[index6] = color6;
    var index8 = selects.indexOf(-1);
    selects[index8] = color8;
    var ran = Math.random();
    if (ran < 0.25) {
      this.setData({
        finalColor: "问： 哪个颜色正在变" + this.data.color[color3],
        answer: index1,
      })
    } else if (ran < 0.5) {
      this.setData({
        finalColor: "问： 哪个颜色正在变" + this.data.color[color5],
        answer: index4,
      })
    } else if (ran < 0.75) {
      this.setData({
        finalColor: "问： 哪个颜色正在变" + this.data.color[color7],
        answer: index6,
      })
    } else {
      this.setData({
        finalColor: "问： 哪个颜色正在变" + this.data.color[color9],
        answer: index8,
      })
    }
    this.setData({
      question: this.data.color[color1] + this.data.color[color2] + "变成" + this.data.color[color3] + "色\n" + this.data.color[color4] + this.data.color[color2] + "变成" + this.data.color[color5] + "色\n" + this.data.color[color6] + this.data.color[color2] + "变成" + this.data.color[color7] + "色\n" + this.data.color[color8] + this.data.color[color2] + "变成" + this.data.color[color9] + "色\n",
      selectA: this.data.color[selects[0]] + this.data.color[color2],
      selectB: this.data.color[selects[1]] + this.data.color[color2],
      selectC: this.data.color[selects[2]] + this.data.color[color2],
      selectD: this.data.color[selects[3]] + this.data.color[color2],
    })
  },

  /**
   * 下一题
   */
  next_Question: function () {
    this.setData({
      selector: -1,
      round: this.data.round + 1,
      time: 10,
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
    Toast.fail('超时啦');
    if (this.data.round < this.data.cnt_round) {
      this.next_Question();
    } else {
      this.gameOver();
    }
    this.clearTimer();
    // Dialog.alert({
    //   message: '超时啦',
    //   // theme: 'round-button',
    // }).then(() => {
    //   if (this.data.round < this.data.cnt_round) {
    //     this.next_Question();
    //   } else {
    //     Toast.success('闯关成功');
    //     this.gameOver();
    //   }
    // });
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
    // 设置倒计时 定时器 每1000毫秒执行一次，计数器count+1 ,共
    this.timer = setInterval(() => {
      if (this.data.timerCount >= 10) {
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
        scoreImg:"https://qbkeass.cn/images/level/level-A.png"
      })
    } else if (score < 90 && score >= 75) {
      this.setData({
        scoreImg:"https://qbkeass.cn/images/level/level-B.png"
      })
    } else if (score < 75 && score >= 60) {
      this.setData({
        scoreImg:"https://qbkeass.cn/images/level/level-C.png"
      })
    } else {
      this.setData({
        scoreImg:"https://qbkeass.cn/images/level/level-D.png"
      })
    }
    console.log("分数：" + score);
    this.clearTimer();
    this.setData({
      scoreShow: true
    });
    this.sleep(3000).then(() => {
      if(this.data.testFlag==0)
      {
        wx.switchTab({
          url: '/pages/games/index',
        })
      }else if(this.data.testFlag==1){
        wx.redirectTo({
          url: '/pages/games/visualSearch/index?testFlag=1',
        })
      }else{
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
    console.log(option)//可以打印一下option看查看参数
    this.setData({
        testFlag:option.testFlag,
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
  onShow: function () {

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