// pages/zicihuiyi/zicihuiyi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:"",//需要记忆的数字
    words:"输入刚刚出现的数字",
    numrem:"字词回忆",//数字显示
    numshow:"",
    input:"",
    inputValue:"",
    marlt:0,


    score_show:false,
    scorelevel:"",

    // mainbg:'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/Game_RecallNumber/rnbg1.JPG',
    mainbg:'https://qbkeass.cn/images/wallpaper/game-wp3.png',
    showgamebox:false,//主界面和游戏界面的切换
    shownumbertoremember:false,//记忆数字的显示
    shownumbertorshow:false,//输入数字判断对错的显示
    showtimerow:false,//时间进度条的显示
    showInput:false,//输入框的显示
    showView: false,//提交按钮的显示
    showView1: false,//再试一次按钮的显示
    showView2: false,//下一关按钮的显示
    showView3: false,//返回按钮的显示
    showWords:false,//提示的显示
    showTip:false,//游戏关卡大于10之后的显示

    countdown:5,
    progressWidth:0,
    progressTime:0,
    jiao:30,

    numshowcolor:"#ffffff",
    score:0,//分数
    level:1,


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

    countTime:3,
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
    //当开始游戏按钮被点击时，隐藏视觉搜索介绍
    this.setData({
      mTime: this.data.time * 1000,
     // showbtnback:true,
      showgamebox:true,
    })
    this.drawActive();
    this.Initialize();
    this.gemeStrat();
    this.setData({
      active:true,
      shownumbertoremember:true,
      shownumbertorshow:true,
      showtimerow:true,
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
      //showbtnstart:true,
      //showbtnback:true,
      numrem:"字词回忆",
      showTip:false,
      showgamebox:false,
    });
  },
  gemeStrat:function(){//某个关卡游戏开始
    console.log('gemeStrat');
    this.setData({
      showtimerow:true,
    })
    this.generateNumber();
    this.timer = setInterval(this.run, 10); //that.timer关键点
  },
  Initialize:function(){//初始化界面
    console.log('Initialize');
    this.showviewHidden();
    this.setData({
      level:1,
      score:0,
    });
  },
  //btnStart:function(){},//游戏内的开始按钮已经废弃
  btnSubmit:function(){//提交按钮
    console.log('btnSubmit');
    this.setData({
      numrem: this.data.number,
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
        //mainbg:'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/Game_RecallNumber/rnbg2.jpg',
        showView2: true, 
        numshowcolor:"#00ff00",
        numshow: this.data.input,
        score:this.data.level*10,
      });
    }else{//输入不正确
      this.setData({//答案字体为红色
        //mainbg:'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/Game_RecallNumber/rnbg3.jpg',
        //showView1: true,
        numshowcolor:"#ff0000",
        numshow: this.data.input,
        //showView3: true,
        // 待补充   返回分数
      })
      this.gameOver();
    }
  },
  gameOver:function(){
    var that = this
    console.log('gameOver');
    if(this.data.score>=90){
      this.setData({
        scorelevel:"https://qbkeass.cn/images/level/level-A.png",
      });
    }else if(this.data.score>=75){
      this.setData({
        scorelevel:"https://qbkeass.cn/images/level/level-B.png",
      });
    }else if(this.data.score>=60){
      this.setData({
        scorelevel:"https://qbkeass.cn/images/level/level-C.png",
      });
    }else{
      this.setData({
        scorelevel:"https://qbkeass.cn/images/level/level-D.png",
      });
    }
    wx.setStorage({key: "hasZici", data: true})
    wx.setStorage({key: "zici", data: that.data.score})
    this.setData({
      score_show:true,
    });
    this.timer2 = setInterval(this.run2, 1000);
  },
  run2:function(){
    let counttime = this.data.countTime;
    if(counttime===0){
       clearInterval(this.timer2);
       this.setData({
        countTime:3,
        score_show:false,
      });
      //this.btnBack();
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
    //this.setData({mainbg:'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/Game_RecallNumber/rnbg1.JPG',});
  },
  btnTryagain:function(){//再试一次按钮
    this.setData({
      showTip:false,
      shownumbertoremember:true,
      shownumbertorshow:true,
      showtimerow:true,
    });
    this.Initialize();
    this.gemeStrat();
  }, 
  inputnum: function (e) {//输入框内容
    this.setData({
      input: e.detail.value,
    });
    if(this.data.input!=null){
      this.setData({
        showView: true,
      });
    }
  },
  generateNumber:function(){//生成随机数字
    console.log('generateNumber');
    let str="";
    var j=this.data.level;
    for(var i=0;i<j;i++){
      str=str+ Math.floor(Math.random()*10);
    }
    this.setData({
      numrem: str,
      number: str,
    });
    return str;
  },
  run: function (){//时间进度条
   let totalProgressTime = this.data.countdown;
   let progressWidth = this.data.progressWidth; //显示进度
   let progressTime = this.data.progressTime; //时间
  
   if (progressWidth === 100) {
    clearInterval(this.timer);
    this.setData({
      showWords:true,
      numrem:"",
      showInput: true,
     progressTime: totalProgressTime,  //进度条需要总时间s
     progressWidth: 0, //进度100%
     progressTime: this.data.countdown,
     showtimerow:false,
    })
    if(this.data.level>10){
      this.setData({
        showTip:true,
      })
    }
    return;
   }
   progressTime--;
   progressWidth = (totalProgressTime - progressTime) * (1 / this.data.countdown)
   this.setData({
    progressWidth: progressWidth,
    progressTime: progressTime,
    marlt:progressWidth*1.5-5,
   })
  },
  showviewHidden:function() {
    this.setData({
      numshowcolor:"#ffffff",
      showInput:false,
      showWords:false,//提示的显示
      number:"",
      numrem:"",
      numshow:"",
      input:"",
      inputValue:"",
      showView:false,
      showView1:false,
      showView2:false,
      showView3:false, 
    })
  },
})