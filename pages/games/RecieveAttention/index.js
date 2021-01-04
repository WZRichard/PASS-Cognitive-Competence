// pages/games/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideImgArr: ['https://qbkeass.cn/images/games/receiveAttention/help-1.png', 'https://qbkeass.cn/images/games/receiveAttention/help-2.png', ], //游戏介绍界面图库
    // 问题文字表述
    question: '',
    // 剩余时间
    time: 120,
    // 定时器计数器
    timerCount: 0,
    // 定时器
    timer: null,
    // 行数
    line: 36,
    // 列数
    column: 5,
    //是否选中
    picture: [
      []
    ],
    // 题目类型，同样字体为0，大小写为1,-1为未开始游戏
    type: -1,
    // 是否是正确答案
    answer: [
      []
    ],
    // 正确答案数量
    totalRight: 0,
    // 是否是斜体字
    style: [
      [
        []
      ]
    ],
    styleForm: ['normal', 'italic'],
    // 是否是粗体字
    weight: [
      [
        []
      ]
    ],
    weightForm: ['normal', 'bold'],
    // 字母对
    text: [
      [
        []
      ]
    ],
    // 做错的数量
    wrongCount: 0,
    // 做对的数量
    rightCount: 0,
    // 分数图片
    scoreImg: "",
    testFlag:0,
    yanse:0 ,
    jihua:0, 
    juzi:0, 
    shijue:0, 
    juzhen:0, 
    zici:0, 
    shuiguo:0, 
    jieshou:0
  },
  /**
   * 点击字母对事件
   */
  tap_unit: function (e) {
    var audio = wx.createInnerAudioContext();
    // audio.src = './audio/destroy.wav';
    var i = e.currentTarget.dataset.row;
    var j = e.currentTarget.dataset.index;
    let p = 'picture[' + i + '][' + j + ']';
    if (this.data.picture[i][j] === 'https://qbkeass.cn/images/games/receiveAttention/perfect.png') {
      this.setData({
        [p]: 'https://qbkeass.cn/images/games/receiveAttention/destroy.png'
      });
      audio.play();
      if (this.data.answer[i][j] === 1) {
        this.setData({
          rightCount: this.data.rightCount + 1
        })
      } else {
        this.setData({
          wrongCount: this.data.wrongCount + 1
        })
      }
    } else {
      this.setData({
        [p]: 'https://qbkeass.cn/images/games/receiveAttention/perfect.png'
      });
      if (this.data.answer[i][j] === 1) {
        this.setData({
          rightCount: this.data.rightCount - 1
        })
      } else {
        this.setData({
          wrongCount: this.data.wrongCount - 1
        })
      }
    }
  },
  /**
   * 点击提交事件
   */
  tap_over: function (e) {
    this.gameOver();
  },
  /**
   * 随机生成数据
   */
  ranData: function (type) {
    var i = 0,
      j = 0,
      k = 0;
    var newStyle = [];
    var newWeight = [];
    var newText = [];
    var newAnser = [];
    var right = 0;
    for (i = 0; i < 36; i++) {
      newStyle.push([]);
      newWeight.push([]);
      newText.push([]);
      newAnser.push([]);
      for (j = 0; j < 5; j++) {
        newStyle[i].push([]);
        newWeight[i].push([]);
        newText[i].push([]);
        for (k = 0; k < 2; k++) {
          var ran1 = parseInt(Math.random() + 0.5);
          var ran2 = parseInt(Math.random() + 0.5);
          newStyle[i][j].push(this.data.styleForm[ran1]);
          newWeight[i][j].push(this.data.weightForm[ran2]);
        }
        var ran3 = parseInt(Math.random() * 58 + 65);
        while (ran3 >= 91 && ran3 <= 96) {
          ran3 = parseInt(Math.random() * 58 + 65);
        }
        newText[i][j].push(String.fromCharCode(ran3));
        var ran4 = Math.random()
        if (ran4 < 0.65) { //65%概率两个字母全随机(但不会是大小写组合)
          ran3 = parseInt(Math.random() * 58 + 65);
          while (ran3 >= 91 && ran3 <= 96 || ran3 === (newText[i][j][0] + 32) || ran3 === (newText[i][j][0] - 32)) {
            ran3 = parseInt(Math.random() * 58 + 65);
          }
        } else if (ran4 < 0.9) { //25%概率字母对是大小写组合
          if (ran3 >= 65 && ran3 <= 90) {
            ran3 = ran3 + 32
          } else {
            ran3 = ran3 - 32
          }
        } //10%概率两个字母相同
        newText[i][j].push(String.fromCharCode(ran3));
        if (type === 0) {
          if (newStyle[i][j][0] === newStyle[i][j][1] && newWeight[i][j][0] === newWeight[i][j][1]) {
            newAnser[i].push(1);
            right++;
          } else {
            newAnser[i].push(0);
          }
        } else {
          if (ran4 >= 0.65 && ran4 < 0.9) {
            newAnser[i].push(1);
            right++;
          } else {
            newAnser[i].push(0);
          }
        }
      }
    }
    this.setData({
      style: newStyle,
      weight: newWeight,
      text: newText,
      answer: newAnser,
      totalRight: right
    })
  },
  /**
   * 设置一个定时器
   */
  countInterval: function () {
    // 设置倒计时 定时器 每1000毫秒执行一次，计数器count+1 ,共120秒
    this.timer = setInterval(() => {
      if (this.data.timerCount >= 120) {
        this.gameOver();
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
    var that = this
    console.log("正确的总数：" + this.data.totalRight);
    console.log("做对：" + this.data.rightCount);
    console.log("做错：" + this.data.wrongCount);
    var score = (this.data.rightCount - this.data.wrongCount) / this.data.totalRight * ((120 + this.data.time) / 120) * 10
    if (score < 2) score = 2;
    if (score > 10) score = 10;
    score = score * 10;
    that.setData({
      jieshou: score
    })
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
        if(this.data.testFlag==0)
      {
        wx.reLaunch({
          url: '/pages/games/index',
        })
      }
      else if(this.data.testFlag==2){
        wx.setStorage({
          key: "hasFirstTraining",
          data: true
        })
        var p = parseInt((that.data.jihua + that.data.shijue)/2+0.5);
        var a = parseInt((that.data.yanse + that.data.jieshou)/2+0.5);
        var s1 = parseInt((that.data.juzhen + that.data.shuiguo)/2+0.5);
        var s2 = parseInt((that.data.zici + that.data.juzi)/2+0.5);
        var all_pass = parseInt(p+a+s1+s2);
        wx.request({
          url: 'https://qbkeass.cn/pass/firstTest.php',
          data: {
            'wx_id' : app.globalData.openid,
            'p': p,
            'a': a,
            's1': s1,
            's2': s2,
            'all_pass': all_pass
          },
          method: 'GET',
          header:{
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
          },
          success: function(res){
            console.log(res.data)
          }
        }),
        wx.request({
          url: 'https://qbkeass.cn/pass/getNew.php',
          data: {
            'wx_id' : app.globalData.openid
          },
          method: 'GET',
          header:{
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
          },
          success: function(res){
            var newlist = []
            newlist.push(parseInt(res.data.p))
            newlist.push(parseInt(res.data.a))
            newlist.push(parseInt(res.data.s1))
            newlist.push(parseInt(res.data.s2))
            app.globalData.newList = newlist
          }
        })
        wx.request({
          url: 'https://qbkeass.cn/pass/getOrigin.php',
          data: {
            'wx_id' : app.globalData.openid
          },
          method: 'GET',
          header:{
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
          },
          success: function(res){
            var originlist = []
            originlist.push(parseInt(res.data.p))
            originlist.push(parseInt(res.data.a))
            originlist.push(parseInt(res.data.s1))
            originlist.push(parseInt(res.data.s2))
            app.globalData.originList = originlist
          }
        })
        wx.request({
          url: 'https://qbkeass.cn/pass/getBest.php',
          data: {
            'wx_id' : app.globalData.openid
          },
          method: 'GET',
          header:{
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
          },
          success: function(res){
            var bestlist = []
            bestlist.push(parseInt(res.data.p))
            bestlist.push(parseInt(res.data.a))
            bestlist.push(parseInt(res.data.s1))
            bestlist.push(parseInt(res.data.s2))
            app.globalData.bestList = bestlist
          }
        })
        
        wx.reLaunch({
          url: '/pages/training/index',
        })
      }
      else{
        var p = parseInt((that.data.jihua + that.data.shijue)/2+0.5);
        var a = parseInt((that.data.yanse + that.data.jieshou)/2+0.5);
        var s1 = parseInt((that.data.juzhen + that.data.shuiguo)/2+0.5);
        var s2 = parseInt((that.data.zici + that.data.juzi)/2+0.5);
        var all_pass = parseInt(p+a+s1+s2);
        wx.request({
          url: 'https://qbkeass.cn/pass/newTest.php',
          data: {
            'wx_id' : app.globalData.openid,
            'p': p,
            'a': a,
            's1': s1,
            's2': s2,
            'all_pass': all_pass
          },
          method: 'GET',
          header:{
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
          },
          success: function(res){
            console.log(res.data)
          }
        }),
        wx.request({
          url: 'https://qbkeass.cn/pass/getNew.php',
          data: {
            'wx_id' : app.globalData.openid
          },
          method: 'GET',
          header:{
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
          },
          success: function(res){
            var newlist = []
            newlist.push(parseInt(res.data.p))
            newlist.push(parseInt(res.data.a))
            newlist.push(parseInt(res.data.s1))
            newlist.push(parseInt(res.data.s2))
            app.globalData.newList = newlist
          }
        })
        wx.request({
          url: 'https://qbkeass.cn/pass/getBest.php',
          data: {
            'wx_id' : app.globalData.openid
          },
          method: 'GET',
          header:{
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
          },
          success: function(res){
            var bestlist = []
            bestlist.push(parseInt(res.data.p))
            bestlist.push(parseInt(res.data.a))
            bestlist.push(parseInt(res.data.s1))
            bestlist.push(parseInt(res.data.s2))
            app.globalData.bestList = bestlist
          }
        })
        wx.reLaunch({
          url: '/pages/training/index',
        })
      }
    })
    console.log("分数：" + score);
    clearInterval(this.timer);
  },

  sleep: function (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  },

  /**
   * 开始游戏
   */
  tap_start: function () {
    wx.pageScrollTo({
      scrollTop: 0
    }) //回到页面顶部
    var ran = Math.random();
    if (ran < 0.5) {
      this.setData({
        question: '找出所有同样字体的字母对',
        type: 0
      });
    } else {
      this.setData({
        question: '找出所有大小写组合的字母对',
        type: 1
      });
    }
    var i = 0;
    var newPicture = [
      []
    ]
    while (i < 36) {
      newPicture[i] = ['https://qbkeass.cn/images/games/receiveAttention/perfect.png', 'https://qbkeass.cn/images/games/receiveAttention/perfect.png', 'https://qbkeass.cn/images/games/receiveAttention/perfect.png', 'https://qbkeass.cn/images/games/receiveAttention/perfect.png', 'https://qbkeass.cn/images/games/receiveAttention/perfect.png'];
      i++;
    }
    this.setData({
      picture: newPicture
    });
    this.ranData(this.data.type);
    this.countInterval();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this
    console.log(option)
    this.setData({
      testFlag:option.testFlag,
    })
    console.log(this.data.testFlag)
    if(this.data.testFlag==2 || this.data.testFlag==1){
      wx.getStorage({key: "yanse",success: function(e){
        that.setData({yanse:parseInt(e.data)})
      }})
      wx.getStorage({key: "jihua",success: function(e){
        that.setData({jihua:parseInt(e.data)})
      }})
      wx.getStorage({key: "juzi",success: function(e){
        that.setData({juzi:parseInt(e.data)})
      }})
      wx.getStorage({key: "shijue",success: function(e){
        that.setData({yanse:parseInt(e.data)})
      }})
      wx.getStorage({key: "juzhen",success: function(e){
        that.setData({juzhen:parseInt(e.data)})
      }})
      wx.getStorage({key: "zici",success: function(e){
        that.setData({zici:parseInt(e.data)})
      }})
      wx.getStorage({key: "shuiguo",success: function(e){
        that.setData({shuiguo:parseInt(e.data)})
      }})
    }
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
    clearInterval(this.timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.timer);
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