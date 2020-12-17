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
    text2:"开始测试",
    text3:"按从小到大的顺序点击数字",//规则
    back:"返回",

    currenta:-1,
    currentb: [],
    level:1,
    mh:20,

    question:[],//问题
    pointer:0,//指针
    showgamebox1:false,
    showgamebox2:false,
    showView1: false,//再试一次按钮的显示
    showView2: false,//下一关按钮的显示
    showView3: true,//返回按钮的显示
    nextlevel:"下一关",
    leftsecond:0,
    progressWidth:0,
    progressTime:10000,//10ms
    countTime:3,

    score:0,

    jiao:[],//旋转的角度


    slideImgArr: ['cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/Game_PlantoConnect/ptc1.png', 'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/Game_PlantoConnect/ptc1.png','cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/Game_PlantoConnect/ptc1.png'], //游戏介绍界面
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
  /**
   * 生命周期函数--监听页面加载
   */
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
  btnQiut:function () {
    this.setData({
      showhomepage: true,
      showgamebox1:false,
      showgamebox2:false,
    }),
    this.resetElement();
  },
  btnAS: function (e) {
    //当开始游戏按钮被点击时，隐藏视觉搜索介绍
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

  gameStart:function(){ 
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
    if(this.data.text==="点击查看提示"){
      this.setData({
        countTime:3,
        text : this.data.create.question,
        score:this.data.score-5,
      });  
      this.timer2 = setInterval(this.run2, 1000);
    }
    else{
      return ;
    }
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
     })
     return;
    }
    progressTime--;
    progressWidth = (totalProgressTime - progressTime) * (1 / 100)
    var time = Math.floor(progressTime/100);
    this.setData({
     progressWidth: progressWidth,
     progressTime: progressTime,
     leftsecond: time,
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
      if(this.data.pointer===8){
        if(this.data.level<3){
          this.setData({
            showView2:true,
            score:this.data.score+Math.floor(this.data.progressTime/100),
          });
        }
        if(this.data.level>=3){
           this.setData({
            back:"完成测试",
            showView2:false,
            score:this.data.score+Math.floor(this.data.progressTime/100),
          });
        }
        if(this.data.progressTime>0)
          clearInterval(this.timer);
      }
    }else if(this.data.num[e.currentTarget.dataset.row][e.currentTarget.dataset.index]===""){
      return ;
    }else{
      this.setData({
        currenta: e.currentTarget.dataset.row*5+e.currentTarget.dataset.index,//按钮CSS变化
        score:this.data.score--,
      })
    }
  },
  btnNext:function(){
    this.setData({
      score:this.data.score+Math.floor(this.data.progressTime/100),
    });
    if(this.data.progressTime>0)
      clearInterval(this.timer);
    if(this.data.level>=3){
      return ;
    }else{
      this.setData({
        mh:20,
        showgamebox1:true,
        showgamebox2:false,
        showView2:false,
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
    this.setData({
      text:"点击查看提示",
      showgamebox1:false,
      showgamebox2:true,
      mh:10,
    });
    this.timer = setInterval(this.run, 10);
  },
  
  btnBack:function() {
    this.setData({
      score:this.data.score+Math.floor(this.data.progressTime/100),
      level:1,
    });
    if(this.data.progressTime>0)
      clearInterval(this.timer);
    this.gameStart();
    this.setData({
      showgamebox1:true,
      showgamebox2:false,
      showView2: false,
      text:this.data.question,
      mh:20,
    });
    this.resetElement();
    this.gameStart();
  },
  resetElement:function () {
    this.setData({
      question:[],
      pointer:0,

      leftsecond:0,
      progressWidth:0,
      progressTime:10000,
      countTime:3,

      currenta:-1,
    });
  },
})