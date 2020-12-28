//app.js
App({
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
          wx.getStorage({
            key: "hasMessage",
            success: function(e){
              // 完成信息采集，检索是否完成初始测试
              wx.getStorage({
                key: "hasFirstTraining",
                success: function(e){
                  // 完成初始测试，跳转到主页
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
                },
                fail: function(e){
                  // 未进行厨师测试，跳转到测试页面
                  wx.reLaunch({
                    // url: '/pages/training/index',
                    url: '/pages/training/index',
                  })
                }
              })
            },
            fail: function(e){
              // 未进行信息采集，跳转到信息采集页面
              wx.reLaunch({
                url: '/pages/message/message/message',
              })
            }

          })
        }
        else{
          // 未授权，跳转到授权页面
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    message: {
      'childAge': "",
      'childSex': "",
      'childHas': "",
      'parentEdu': ""
    },
    newList:[70,80,70,90],
    originList:[60,73,85,40],
    highestList:[95,80,80,95],
    pList:[],
    aList:[],
    s1List:[],
    s2List:[]
  }
})