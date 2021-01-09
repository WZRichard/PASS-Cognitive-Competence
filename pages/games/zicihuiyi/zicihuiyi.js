// pages/zicihuiyi/zicihuiyi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:"",//需要记忆的数字
    words:"输入刚刚出现的数字",
    numRem:"",//数字显示
    numShow:"",
    input:"",
    inputValue:"",
    marlt:0,
    btnImg:"https://qbkeass.cn/images/icon/circle.png",

    scoreShow:false,
    scoreLevel:"",
    select:-1,

    showGamebox:false,//主界面和游戏界面的切换
    showNumbertoremember:false,//记忆数字的显示
    showNumbertorshow:false,//输入数字判断对错的显示
    showTimerow:false,//时间进度条的显示
    showInput:false,//输入框的显示
    showView: false,//提交按钮的显示
    //showView1: false,//再试一次按钮的显示
    showView2: false,//下一关按钮的显示
    showView3: false,//返回按钮的显示
    showWords:false,//提示的显示
    showTip:false,//游戏关卡大于10之后的显示

    progressWidth:0,
    progressTime:500,
    jiao:20,

    numshowColor:"#ffffff",
    score:0,//分数
    level:1,
    fontSize:60,
    
    countTime:3,
    /* 开始界面 */ 
     slideImgArr: ['https://qbkeass.cn/images/games/recallNumber/rnA.png','https://qbkeass.cn/images/games/recallNumber/rnB.png','https://qbkeass.cn/images/games//recallNumber/rnC.png'], //游戏介绍界面
    indicatorDots: true, // 是否显示面板指示点
    autoplay: true,      // 是否自动切换
    circular: true,      // 是否采用衔接滑动
    interval: 3000,      // 自动切换时间间隔
    duration: 3000,      // 滑动动画时长

    showhomepage: true, //是否开始游戏
    gameHeight: '0',

    time: '100',//限定时间100s
    mTime: 100000,//以毫秒为单位
    timer: null,

    testFlag:0,
  },

  exit:function () {
    console.log(this.data.score);
    console.log('exit');
    this.showviewHidden();
    if(this.data.testFlag==0)
    {
      wx.switchTab({
        url: '/pages/games/index',
      })
    }else if(this.data.testFlag==1){
      wx.redirectTo({
        url: '/pages/games/FruitMatch/FruitMatch?testFlag=1',
      })
    }else{
      wx.redirectTo({
        url: '/pages/games/FruitMatch/FruitMatch?testFlag=2',
      })
    }
  },
  
  onLoad: function (option) {
    console.log('onLoad');
    //页面打开时执行的操作
    //每个手机的屏幕宽度是750rpx 分辨率不一致
    //所有手机在小程序中的宽:真实宽度=小程序在页面中的高度:真实高度
    var res = wx.getSystemInfoSync();
    var rate = 750 / res.windowWidth;
    console.log(rate * res.windowHeight);
    this.setData({
      rate: rate,
      gameHeight: rate * res.windowHeight,
      testFlag:option.testFlag,
    })
    console.log(this.data.testFlag);
  },
  btnAS: function (e) {
    console.log('btnAS');
    this.setData({
      mTime: this.data.time * 1000,
      showGamebox:true,
    })
    this.drawActive();
    this.Initialize();
    this.gemeStrat();
    this.setData({
      active:true,
      showNumbertoremember:true,
      showNumbertorshow:true,
      showTimerow:true,
    });
  },
  drawActive: function () {
    //设置定时器，一百毫秒执行一次
    //一百毫秒执行一次，要在mTime时间内画一条线
    //比如100000ms，要进行100000/100=1000次画,1000次画满（700-50)/1000
    var this2 = this;
    var timer = setInterval(function () {
      //现在的长度/原来的长度
      //(this2.data.time*1000-this2.data.mTime)/(this2.data.time*1000)
      var length = 50 + (700 - 50) * (this2.data.mTime) / (this2.data.time * 1000);
      var currentTime = this2.data.mTime - 100;
      this2.setData({
        mTime: currentTime
      });
      if (length > 50) {
        var lineWidth = 5 / this2.data.rate;//px
        var ctx = wx.createCanvasContext('progress_active');//不需要'#'
        ctx.setLineCap('butt');
        ctx.setLineWidth(lineWidth);
        ctx.setStrokeStyle('#E06663');
        ctx.beginPath();
        ctx.moveTo(50 / this2.data.rate, 20);
        ctx.lineTo(length / this2.data.rate, 20);
        ctx.stroke();
        ctx.draw();
      }
    }, 100);
    this2.setData({
      timer: timer
    })
  },
  btnBack:function(){//返回按钮
    console.log('btnBack');
    this.showviewHidden();
    this.setData({
      numRem:"字词回忆",
      showTip:false,
      showGamebox:false,
    });
  },
  gemeStrat:function(){//某个关卡游戏开始
    console.log('gemeStrat');
    if(this.data.level>7){
      this.setData({
        fontSize:40,
      })
    }
    if(this.data.level>14){
      this.setData({
        fontSize:30,
      })
    }
    this.setData({
      showTimerow:true,
    })
    this.generateNumber();
    this.startRun();
  },
  startRun(){
    let that=this;
    that.timer = setInterval(that.run,10); //that.timer关键点
    console.log('run');
  },
  Initialize:function(){//初始化界面
    console.log('Initialize');
    this.showviewHidden();
    this.setData({
      level:1,
      score:0,
    });
  },
  btnSubmit:function(){//提交按钮
    console.log('btnSubmit');
    if(this.data.inputValue.length>7){
      this.setData({
        fontSize:40,
      })
    }
    if(this.data.inputValue.length>14){
      this.setData({
        fontSize:30,
      })
    }
    this.setData({
      input:this.data.inputValue,
      numRem: this.data.number,
      showWords:false,
      showView:false,
      showInput:false,
    });
    if(this.data.number===this.data.input){//输入正确
      if(this.data.level>=10){
        this.setData({
          showTip:true,
        })
      }
        this.setData({//答案字体为绿色
        showView2: true, 
        numshowColor:"#00ff00",
        numShow: this.data.input,
        score:this.data.level*10,
      });
    }else{//输入不正确
      this.setData({//答案字体为红色
        numshowColor:"#ff0000",
        numShow: this.data.input,
      })
      this.gameOver();
    }
  },
  gameOver:function(){
    var that = this
    console.log('gameOver');
    if(this.data.score>=90){
      this.setData({
        scoreLevel:"https://qbkeass.cn/images/level/level-A.png",
      });
    }else if(this.data.score>=75){
      this.setData({
        scoreLevel:"https://qbkeass.cn/images/level/level-B.png",
      });
    }else if(this.data.score>=60){
      this.setData({
        scoreLevel:"https://qbkeass.cn/images/level/level-C.png",
      });
    }else{
      this.setData({
        scoreLevel:"https://qbkeass.cn/images/level/level-D.png",
      });
    }
    wx.setStorage({key: "hasZici", data: true})
    wx.setStorage({key: "zici", data: that.data.score})
    this.setData({
      scoreShow:true,
    });
    this.timer2 = setInterval(this.run2, 1000);
  },
  run2:function(){
    let counttime = this.data.countTime;
    if(counttime===0){
       clearInterval(this.timer2);
       this.setData({
        countTime:3,
        scoreShow:false,
      });
      this.exit();
    }
    counttime--;
    this.setData({
      countTime: counttime,
    }); 
  },
  btnNext:function(){//下一关按钮
    console.log('btnNext');
    this.showviewHidden();
    this.data.level++; 
    this.gemeStrat();
  },
  showSub: function () {//输入框内容
      this.setData({
        showView: true,
      });
  },
  hiddenSub: function () {//输入框内容
    this.setData({
      showView: false,
    });
},
  btnOne:function() {
    this.setData({
      inputValue: this.data.inputValue+"1",
      select:1,
    });
    this.showSub();
  },
  btnTwo:function() {
    this.setData({
      inputValue: this.data.inputValue+"2",
      select:2,
    });
    this.showSub();
  },
  btnThree:function() {
    this.setData({
      inputValue: this.data.inputValue+"3",
      select:3,
    });
    this.showSub();
  },
  btnFour:function() {
    this.setData({
      inputValue: this.data.inputValue+"4",
      select:4,
    });
    this.showSub();
  },
  btnFive:function() {
    this.setData({
      inputValue: this.data.inputValue+"5",
      select:5,
    });
    this.showSub();
  },
  btnSix:function() {
    this.setData({
      inputValue: this.data.inputValue+"6",
      select:6,
    });
    this.showSub();
  },
  btnSeven:function() {
    this.setData({
      inputValue: this.data.inputValue+"7",
      select:7,
    });
    this.showSub();
  },
  btnEight:function() {
    this.setData({
      inputValue: this.data.inputValue+"8",
      select:8,
    });
    this.showSub();
  },
  btnNine:function() {
    this.setData({
      inputValue: this.data.inputValue+"9",
      select:9,
    });
    this.showSub();
  },
  btnZero:function() {
    this.setData({
      inputValue: this.data.inputValue+"0",
      select:0,
    });
    this.showSub();
  },
  btnClear:function() {
    this.setData({
      inputValue: "",
      select:-1,
    });
    this.hiddenSub();
  },

  btnDel:function() {
    if(this.data.inputValue.length>=1){
      let str = this.data.inputValue;
      str=str.slice(0,str.length-1);
      this.setData({
        inputValue: str,
        select:-1,
      });
    }
    if(this.data.inputValue.length===0)
      this.hiddenSub();
  },

  generateNumber:function(){//生成随机数字
    console.log('generateNumber');
    let str="";
    var j=this.data.level;
    for(var i=0;i<j;i++){
      str=str+ Math.floor(Math.random()*10);
    }
    this.setData({
      numRem: str,
      number: str,
    });
    return str;
  },
  run: function (){//时间进度条
   let that = this;
   let totalProgressTime = 500;
   let progressWidth = that.data.progressWidth; //显示进度
   let progressTime = that.data.progressTime; //时间
   if (progressWidth === 100) {
    clearInterval(that.timer);
    that.setData({
      showWords:true,
      numRem:"",
      showInput: true,
     progressTime: totalProgressTime,  //进度条需要总时间s
     progressWidth: 0, //进度100%
     showTimerow:false,
    })
    if(that.data.level>10){
      that.setData({
        showTip:true,
      })
    }
    return;
   }
   progressTime--;
   if(progressTime%40===0){
    that.setData({
        jiao:that.data.jiao*-1,
     })
   }
   progressWidth = (totalProgressTime - progressTime) * (1/5);
   that.setData({
    progressWidth: progressWidth,
    progressTime: progressTime,
    marlt:progressWidth*1.5-5,
   })
  },
  showviewHidden:function() {
    this.setData({
      numshowColor:"#ffffff",
      showInput:false,
      showWords:false,//提示的显示
      number:"",
      numRem:"",
      numShow:"",
      input:"",
      inputValue:"",
      showView:false,
      //showView1:false,
      showView2:false,
      showView3:false, 
      marlt:0,
      select:-1,
    })
  },
  onShow: function (option) {
    if(this.data.testFlag==2){
      wx.hideHomeButton();
    }
  },
})