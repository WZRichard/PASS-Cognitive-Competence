// pages/zicihuiyi/zicihuiyi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:"",
    words:"",
    numrem:"字词回忆",
    numshow:"",
    input:"",
    nextlevel:"下一关",

    showhomepage:true,
    showgamebox:false,
    showbtnstart:false,//开始按钮的显示
    showbtnback:false,
    shownumbertoremember:true,//记忆数字的显示
    shownumbertorshow:false,//输入数字的显示
    showtimerow:false,//时间进度条的显示
    showInput:false,//输入框的显示
    showView: false,//提交按钮的显示
    showView1: false,//再试一次按钮的显示
    showView2: false,//下一关按钮的显示
    showView3: false,//返回按钮的显示
    showWords:false,//提示的显示
    showTip:false,

    progressWidth:0,
    progressTime:5,

    numshowcolor:"#ffffff",
    score:0,//分数
    level:1,


     slideImgArr: ['cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/Game_RecallNumber/rn1.png', 'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/Game_RecallNumber/rn1.png','cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/Game_RecallNumber/rn1.png'], //游戏介绍界面
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
  },
  
  onLoad: function () {
    //页面打开时执行的操作
    //每个手机的屏幕宽度是750rpx 分辨率不一致
    //所有手机在小程序中的宽:真实宽度=小程序在页面中的高度:真实高度
    var res = wx.getSystemInfoSync();
    var rate = 750 / res.windowWidth;
    console.log(rate * res.windowHeight);
    this.setData({
      rate: rate,
      gameHeight: rate * res.windowHeight,
    })
  },
  btnAS: function (e) {
    //当开始游戏按钮被点击时，隐藏视觉搜索介绍
    this.setData({
      showhomepage: false,
      mTime: this.data.time * 1000,
      showbtnstart:true,
      showbtnback:true,
      showgamebox:true,
    })
    this.drawActive();
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
    this.showviewHidden();
    this.setData({
      showbtnstart:true,
      showbtnback:true,
      numrem:"字词回忆",
      showTip:false,
      progressTime: 5,
    });
  },

  gemeStrat:function(){//某个关卡游戏开始
    this.generateNumber();
    this.timer = setInterval(this.run, 10); //that.timer关键点
  },

  Initialize:function(){//初始化界面
    this.showviewHidden();
    this.setData({
      level:1,
      score:0,
    });
  },
  btnStart:function(){//开始按钮
    this.Initialize();
    this.gemeStrat();
    this.setData({
      active:true,
      showbtnstart:false,
      shownumbertoremember:true,
      shownumbertorshow:true,
      showtimerow:true,
      showbtnback:false,
    });
  },
  btnSubmit:function(){//提交按钮
    this.setData({
      numrem: this.data.number,
      inputValue:"",
      showWords:false,
      showView:false,
      showInput:false,
    });
    if(this.data.number==this.data.input){
      if(this.data.level>=10){
        this.setData({
          nextlevel:"继续",
          showTip:true,
        })
      }
        this.setData({
        showView2: true, 
        numshowcolor:"#00ff00",
        numshow: this.data.input,
        score:this.data.level*10,
      });
    }else{
      this.setData({
        showView1: true,
        numshowcolor:"#ff0000",
        numshow: this.data.input,
        showView3: true,
      })
    }
  },
  btnNext:function(){//下一关按钮
    this.showviewHidden();
    this.setData({
      showtimerow:true,
      progressTime: 5,
    })
    this.data.level++; 
    this.gemeStrat();
  },
  btnTryagain:function(){//再试一次按钮
    this.setData({
      showTip:false,
      showbtnstart:false,
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
   let totalProgressTime = 5;
   let progressWidth = this.data.progressWidth; //显示进度
   let progressTime = this.data.progressTime; //时间
  
   if (progressWidth === 100) {
    clearInterval(this.timer);
    this.setData({
      second: "",
      showWords:(true),
      words: "输入刚刚出现的数字",
      numrem:"",
      showInput: true,
     progressTime: totalProgressTime,  //进度条需要总时间s
     progressWidth: 0, //进度100%
     progressTime: 5,
     showtimerow:(false),
    })
    if(this.data.level>10){
      this.setData({
        showTip:true,
      })
    }
    return;
   }
   progressTime--;
   progressWidth = (totalProgressTime - progressTime) * (1 / 5)
   this.setData({
    progressWidth: progressWidth,
    progressTime: progressTime
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
      showView:false,
      showView1:false,
      showView2:false,
      showView3:false, 
      progressTime: 5,
    })
  },
})