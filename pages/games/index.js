// pages/games/index.js////
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pass_list: [
      {
        id: '1',
        name: '计划(Plan)',
        open: false,
        game_list:[
          {
            id:1,
            name:'计划连接',
            page_url:'/pages/games/jihualianjie/jihualianjie?testFlag=0',
            imgSrc:'https://qbkeass.cn/images/gameCover/jhlj.png'
          },
          {
            id:2,
            name:'视觉搜索',
            page_url:'/pages/games/visualSearch/index?testFlag=0',
            imgSrc:'https://qbkeass.cn/images/gameCover/sjss.png'
          }
        ]
      },
      {
        id: '2',
        name: '注意力(Attention)',
        open: false,
        game_list:[
          {
            id:1,
            name:'颜色判别',
            page_url:'/pages/games/colorDiscrimination/index?testFlag=0',
            imgSrc:'https://qbkeass.cn/images/gameCover/yspb.png'
          },
          {
            id:2,
            name:'接受的注意',
            page_url:'/pages/games/RecieveAttention/index?testFlag=0',
            imgSrc:'https://qbkeass.cn/images/gameCover/jsdzy.png'
          }
        ]
      },
      {
        id: '3',
        name: '同时性加工(Simultaneous procession)',
        open: false,
        game_list:[
          {
            id:1,
            name:'矩阵问题',
            page_url:'/pages/games/Matrix_pro/Matrix_pro?testFlag=0',
            imgSrc:'https://qbkeass.cn/images/gameCover/jzwt.png'
          },
          {
            id:2,
            name:'水果配对',
            page_url:'/pages/games/FruitMatch/FruitMatch?testFlag=0',
            imgSrc:'https://qbkeass.cn/images/gameCover/sgpd.png'
          }
        ]
      },{
        id: '4',
        name: '继时性加工(Succesive processing)',
        open: false,
        game_list:[
          {
            id:1,
            name:'数字回忆',
            page_url:'/pages/games/zicihuiyi/zicihuiyi?testFlag=0',
            imgSrc:'https://qbkeass.cn/images/gameCover/szhy.png'
          },
          {
            id:2,
            name:'句子问题',
            page_url:'/pages/games/SentenceRepetition/index?testFlag=0',
            imgSrc:'https://qbkeass.cn/images/gameCover/juzi.png'
          }
        ]
      }
      
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  //跳转到小游戏页面
  onItemClick: function (e) {
    var blockId = e.currentTarget.dataset.blockid;
    var pageId = e.currentTarget.dataset.pageid;
    var pageUrl = this.data.pass_list[blockId-1].game_list[pageId-1].page_url;
    console.log(e);
    console.log(blockId)
    console.log(pageId);
    console.log(pageUrl)
    
    wx.navigateTo({
      url: pageUrl
    })
  }
})