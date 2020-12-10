// pages/games/index.js////
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pass_list: [
      {
        id: 'plan',
        name: '计划(Plan)',
        open: false,
        game_list:[
          {
            id:1,
            name:'计划连接',
            page_url:'',
            imgSrc:'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/pass_pic/pass_pic/计划连接.png'
          },
          {
            id:2,
            name:'视觉搜索',
            page_url:'',
            imgSrc:'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/pass_pic/pass_pic/视觉搜索.jpg'
          }
        ]
      },
      {
        id: 'attention',
        name: '注意力(Attention)',
        open: false,
        game_list:[
          {
            id:3,
            name:'颜色判别',
            page_url:'',
            imgSrc:'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/pass_pic/pass_pic/颜色判别.png'
          },
          {
            id:4,
            name:'接受的注意',
            page_url:'',
            imgSrc:'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/pass_pic/pass_pic/接收注意.jpeg'
          }
        ]
      },
      {
        id: 'simultaneous_procession',
        name: '同时性加工(Simultaneous procession)',
        open: false,
        game_list:[
          {
            id:5,
            name:'矩阵问题',
            page_url:'',
            imgSrc:'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/pass_pic/pass_pic/矩阵问题.jpg'
          },
          {
            id:6,
            name:'水果配对',
            page_url:'',
            imgSrc:'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/pass_pic/pass_pic/水果配对.png'
          }
        ]
      },{
        id: 'succesive_processing',
        name: '继时性加工(Succesive processing)',
        open: false,
        game_list:[
          {
            id:7,
            name:'数字回忆',
            page_url:'',
            imgSrc:'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/pass_pic/pass_pic/数字回忆.jpg'
          },
          {
            id:8,
            name:'句子问题',
            page_url:'',
            imgSrc:'cloud://pass-model-7g3fo4ig00002b96.7061-pass-model-7g3fo4ig00002b96-1304449250/pass_pic/pass_pic/句子问题.jpg'
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

  }
})