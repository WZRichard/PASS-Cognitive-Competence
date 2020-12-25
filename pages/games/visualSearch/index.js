//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    slideImgArr: ['instance01','instance02','instance03'],//之后再插入游戏图片
    indicatorDots: true, // 是否显示面板指示点
    autoplay: true,      // 是否自动切换
    circular: true,      // 是否采用衔接滑动
    interval: 3000,      // 自动切换时间间隔
    duration: 1000,      // 滑动动画时长
  
    startGame: false, //是否开始游戏
    gameHeight: '0',

    time:'100',//限定时间100s
    mTime:100000,//以毫秒为单位
    timer:null,

    arr : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i','j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't','u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E','F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P','Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    rgbArr:['rgb(254,67,101)','rgb(252,157,154)','rgb(249,205,173','rgb(200,200,169)','rgb(131,175,155)'],
    wordArr:[],
    requestWord:null,
    hint:"点击一个方块尝试一下吧",
    difficulty:4,

    finish:false,
    totalRight:0,//1～3轮总共选对的
    totalWrong:0,//1～3轮总共选错的
    totalRequest:0,//1～3轮总共需要找到的（标准答案总数）


    
  },

  onLoad: function () {//页面打开时执行的操作
    //每个手机的屏幕宽度是750rpx 分辨率不一致
    //所有手机在小程序中的宽:真实宽度=小程序在页面中的高度:真实高度
    var res = wx.getSystemInfoSync();
    var rate = 750/res.windowWidth;
    this.createArr();
    this.setData({
      rate:rate,
      gameHeight : rate*res.windowHeight,

    })
  },
  createArr:function(){
    var tempArr = [];
    var colorArr = this.data.rgbArr;
    var arr1 = this.data.arr;
    var random1 = Math.floor(Math.random()*52);
    var random2 = Math.floor(Math.random()*52);
    
    var searchWord = arr1[random1]+arr1[random2];
    //1-3个随机字母对
    
    var count = 0;
    var countRandom;
    var d = this.data.difficulty;
    var totalRequest = this.data.totalRequest;
    if(d==4){
      countRandom = Math.floor(Math.random()*(3-2)+2);
    }else if(d==5||d==6){
      countRandom = Math.floor(Math.random()*(4-3)+3);
    }
    totalRequest = totalRequest+countRandom;
    while(count<d*d){
        random1 = Math.floor(Math.random()*52);
        random2 = Math.floor(Math.random()*52);
        var word = arr1[random1]+arr1[random2];
        
        if(word==searchWord)//保证生成的数字不是要找的数字
          continue;
        var colorRandom = Math.floor(Math.random()*5);
        var color = colorArr[colorRandom];
        var x = {text:word, active:0, color:color}
        tempArr.push(x);
        count++
    }
    count = 0;
    while(count<countRandom){
      var random = Math.floor(Math.random()*d*d);
      if(tempArr[random].text==searchWord)
        continue;
      var colorRandom = Math.floor(Math.random()*5);
      var color = colorArr[colorRandom];
      var x = {text:searchWord,active:0,color:color}
      tempArr[random]=x;
      count++;
    }
    this.setData({
      wordArr: tempArr,
      totalRequest:totalRequest,
      requestWord:searchWord
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  start:function(e){
    //当开始游戏按钮被点击时，隐藏视觉搜索介绍
    this.setData({
      startGame:true,
      mTime:this.data.time*1000,
    })
    this.drawActive();
  },
  drawActive:function(){
    //设置定时器，一百毫秒执行一次
    //一百毫秒执行一次，要在mTime时间内画一条线
    //比如100000ms，要进行100000/100=1000次画,1000次画满（700-50)/1000
    var this2 = this;
    var timer = setInterval(function(){
      //现在的长度/原来的长度
      //(this2.data.time*1000-this2.data.mTime)/(this2.data.time*1000)
      var length = 50+(700-50)*(this2.data.mTime)/(this2.data.time*1000);
      var currentTime = this2.data.mTime-100;
      this2.setData({
        mTime:currentTime
      });
      if(length>50){
        var lineWidth = 5/this2.data.rate;//px
        var ctx = wx.createCanvasContext('progress_active');//不需要'#'
        ctx.setLineCap('butt');
        ctx.setLineWidth(lineWidth);
        ctx.setStrokeStyle('#ffffff');
        ctx.beginPath();
        ctx.moveTo(50/this2.data.rate, 20);
        ctx.lineTo(length/this2.data.rate, 20);
        ctx.stroke();
        ctx.draw();
      }
      
    },100);
    this2.setData({
      timer:timer
    })

  },
  clickWord:function(e){
    const id = e.currentTarget.dataset.index;
    var arr = this.data.wordArr;
    var word = this.data.requestWord;
    var right = this.data.totalRight;
    var wrong = this.data.totalWrong;
    if(arr[id].active == 1){
      arr[id].active = 0;
      right--;
    }else if(arr[id].active == 2){
      arr[id].active = 0;
      wrong--;
    }else if(arr[id].text==word){
      arr[id].active = 1;
      right++;
    }else{
      arr[id].active = 2;
      wrong++
    }
    var hint='如果觉得选完了，就点击"下一题"吧！'
    this.setData({
      wordArr:arr,
      totalRight:right,
      totalWrong:wrong,
      hint:hint
    })
    
  },
  next:function(){
    clearInterval(this.data.timer);
    var d = this.data.difficulty;
    var this2 = this;
    wx.showModal({
      title: '是否进入下一轮',
      content: '进入下一轮后，你将无法修改本轮答案',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('用户点击确定');
          this2.upgrade();
          
        } else {//这里是点击了取消以后
          console.log('用户点击取消');
        }
      }
    });
    this.drawActive();
    
  },
  finish:function(){
    clearInterval(this.data.timer);
    var this2 = this;
    wx.showModal({
      title: '是否结束本轮',
      content: '结束后，你将无法修改本轮答案',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('用户点击确定');
          var useTime = (this2.data.time*1000-this2.data.mTime)/1000
          console.log(useTime)
          console.log('resuqest:'+this2.data.totalRequest);
          console.log('right:'+this2.data.totalRight);
          console.log('wrong:'+this2.data.totalWrong);
        } else {//这里是点击了取消以后
          console.log('用户点击取消');
          this2.drawActive();
        }
      }
    });
    
  },
  upgrade:function(){
    var d = this.data.difficulty;
    d++;
    this.setData({
      difficulty:d
    })
    this.createArr();
    if(d==6){
      this.setData({
        finish:true,
        hint:'如果觉得选完了，就点击"完成"吧！'
      })
    }
  }
},
  
)
