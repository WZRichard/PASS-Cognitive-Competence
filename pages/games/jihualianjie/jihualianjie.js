var Create = require("./create.js");

// pages/jihualianjie/jihualianjie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size:5,
    num: [],
    text:"计划连接",
    text3:"按从小到大的顺序点击数字",//规则

    currenta:-1,
    currentb: [],
    level:1,
    mh:20,
    marlt:0,
    istimeout:false,

    score_show:false,
    scorelevel:"cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/images/tabbar/test-chosen.png",

    question:[],//问题
    pointer:0,//指针
    showgamebox1:false,
    showgamebox2:false,
    showView1: false,//再试一次按钮的显示
    showView2: false,//下一关按钮的显示
    showView3: false,//返回按钮的显示(已删除)
    progressWidth:0,
    progressTime:10000,//10ms
    countTime:3,
    countTimenext:3,

    score:0,

    jiao:[],//旋转的角度
    jiao2:20,

    slideImgArr: ['https://qbkeass.cn/images/games/planToConnect/ptcA.png','https://qbkeass.cn/images/games/planToConnect/ptcB.png'], //游戏介绍界面
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
    this.resetElement();
    if(this.data.testFlag==0)
    {
      wx.switchTab({
        url: '/pages/games/index',
      })
    }else if(this.data.testFlag==1){
      wx.redirectTo({
        url: '/pages/games/SentenceRepetition/index?testFlag=1',
      })
    }else{
      wx.redirectTo({
        url: '/pages/games/SentenceRepetition/index?testFlag=2',
      })
    }
  },
  onLoad: function (option) {
    console.log('onLoad');
    var res = wx.getSystemInfoSync();
    var rate = 750 / res.windowWidth;
    console.log(rate * res.windowHeight);
    this.setData({
      rate: rate,
      gameHeight: rate * res.windowHeight,
      testFlag: option.testFlag,
    })
    console.log(this.data.testFlag)
  },
  btnAS: function (e) {
    console.log('btnAS');
    this.gameStart();
    this.setData({
      showhomepage: false,
      mTime: this.data.time * 1000,
      showgamebox1:true,
      showgamebox2:false,
    })
    this.drawActive();
  },
  drawActive: function () {
    var this2 = this;
    var timer = setInterval(function () {
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
  gameOver:function(){
    var that = this
    console.log('gameOver');
    console.log(this.data.score);
    console.log(this.data.progressTime)
    if(this.data.level===3||this.data.istimeout===true){
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
    }
    wx.setStorage({key: "hasJihua", data: true})
    wx.setStorage({key: "jihua", data: that.data.score})
    this.setData({
      score_show:true,
      countTimenext:3,
    });
    this.timer3 = setInterval(this.run3, 1000);
  },
  gameStart:function(){ 
    console.log('gameStart');
    let create = new Create(this.data.size,this.data.level);
    let list = [];
    let len = this.data.size*this.data.size; 

    for(var i=0 ;i<len;i++)
      list.push(0); 
    this.setData({
      create: create,
      currentb: list,
      //text:"点击查看提示",
    }); 
    this.setData({
      num: this.data.create.grid,
      question: this.data.create.question,
      text : this.data.create.question,
      jiao:this.data.create.angle,
    });  
  },
  showQuestion:function(){
    console.log('showQuestion');
    if(this.data.text==="点击查看提示"){
      this.setData({
        countTime:3,
        text : this.data.create.question,
        score:this.data.score-(1),
      });  
      console.log(this.data.score);
      this.timer2 = setInterval(this.run2, 1000);
    }
    else{
      return ;
    }
  },
  run3:function(){
    let counttime = this.data.countTimenext;
    console.log(counttime);
    if(counttime===0){
       clearInterval(this.timer3);
       this.setData({
        score_show:false,
      });
      if(this.data.level===3||this.data.istimeout===true){
        this.exit();
      }else{
        console.log('next step success');
        this.btnNext();
      }
    }
    counttime--;
    this.setData({
      countTimenext: counttime,
    }); 
  },
  run2:function(){
    let counttime = this.data.countTime;
    if(counttime===0){
       clearInterval(this.timer2);
       this.setData({
        countTime:3,
        text:"点击查看提示",
      }); 
       return ;
    }
    counttime--;
    this.setData({
      countTime: counttime,
    }); 
  },
  run: function (){//时间进度条
    let totalProgressTime = 10000;
    let progressWidth = this.data.progressWidth; //显示进度
    let progressTime = this.data.progressTime; //时间
    if (progressWidth === 100) {
     clearInterval(this.timer);
     this.setData({
      pointer:10,
      progressWidth: 0, //进度100%
      progressTime: 10000,//进度条需要总时间s
      text:"挑战失败",
      istimeout:true,
     })
     this.gameOver();
     return;
    }
    progressTime--;
    progressWidth = (totalProgressTime - progressTime) * (1 / 100)
    if(progressTime%70===0){
      this.setData({
        jiao2:this.data.jiao2*-1,
      })
    }
    this.setData({
     progressWidth: progressWidth,
     progressTime: progressTime,
     marlt:progressWidth*3-5,
    })
  },
  onTap: function (e) {
    var shuzu= this.data.currentb;
    console.log(e); 
    if(this.data.num[e.currentTarget.dataset.row][e.currentTarget.dataset.index]===this.data.question[this.data.pointer]){
      shuzu[e.currentTarget.dataset.row*5+e.currentTarget.dataset.index]=1;
      this.setData({
        currentb:shuzu,
        currenta: e.currentTarget.dataset.row*5+e.currentTarget.dataset.index,//按钮CSS变化
      });
      this.data.pointer++;
      if(this.data.pointer===this.data.question.length){
        this.setData({
          score:this.data.score+(Math.floor((this.data.progressTime*0.8+2000)/300)),
        });

        this.gameOver();
        if(this.data.progressTime>0)
          clearInterval(this.timer);
      }
    }else if(this.data.num[e.currentTarget.dataset.row][e.currentTarget.dataset.index]===""){
      return ;
    }else{
      this.setData({
        currenta: e.currentTarget.dataset.row*5+e.currentTarget.dataset.index,//按钮CSS变化
        score:this.data.score-(0.2),
      })
      console.log(this.data.score);
    }
  },
  btnNext:function(){
    console.log('btnNext');
    if(this.data.progressTime>0)
      clearInterval(this.timer);
    if(this.data.level>=3){
      return ;
    }else{
      this.setData({
        mh:20,
        showgamebox1:true,
        showgamebox2:false,
        //showView2:false,
      }); 
      this.resetElement();
      this.data.level++;
      this.gameStart();
    }
    if(this.data.level===2){
      this.setData({
        text3:"按从小到大的顺序点击字母",
      });
    } 
    if(this.data.level>2){
      this.setData({
        text3:"按从数字从大到小字母小到大的顺序依次点击",
      });
    }
  },

  btnStart:function(){
    console.log('btnStart');
    this.setData({
      text:"点击查看提示",
      showgamebox1:false,
      showgamebox2:true,
      mh:10,
    });
    this.timer = setInterval(this.run, 10);
  },
  resetElement:function () {
    console.log('resetElement');
    this.setData({
      question:[],
      pointer:0,
      istimeout:false,
      progressWidth:0,
      progressTime:10000,
      currenta:-1,
    });
  },
  onShow: function (option) {
    if(this.data.testFlag==2){
      wx.hideHomeButton();
    }
  },
 
})