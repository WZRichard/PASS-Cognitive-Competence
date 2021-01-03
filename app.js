//app.js
App({
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    var resWx = wx.getSystemInfoSync();
    var width = 750/resWx.windowWidth;
    var height = 750/resWx.windowHeight;
    that.globalData.sysWidth = width;
    that.globalData.sysHeight = height;
    console.log(that.globalData.sysWidth, that.globalData.sysHeight)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;  //获取code
        wx.setStorage({
          key:"code",
          data:code
        })
        wx.request({
          url: 'https://qbkeass.cn/pass/getOpenId.php',
          data: {
            'code' : code
          },
          method: 'POST',
          header:{
            'content-type': 'application/x-www-form-urlencoded' 
          },
          success: function(res){
            console.log(res.data)
            wx.setStorage({//将得到的openid存储到缓存里面方便后面调用
              key:"openId",
              data:res.data
            })
            that.globalData.openid = res.data
          }
        })
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
              wx.getStorage({
                key: "openId",
                success: function(e){
                  that.globalData.openid = e.data
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
              wx.getStorage({
                key: "hasMessage",
                success: function(e){
                  // 完成信息采集，检索是否完成初始测试
                  wx.getStorage({
                    key: "hasFirstTraining",
                    success: function(e){
                      // 完成初始测试，跳转到主页
                      wx.request({
                        url: 'https://qbkeass.cn/pass/getNew.php',
                        data: {
                          'wx_id' : that.globalData.openid
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
                          that.globalData.newList = newlist
                        }
                      })
                      wx.request({
                        url: 'https://qbkeass.cn/pass/getOrigin.php',
                        data: {
                          'wx_id' : that.globalData.openid
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
                          that.globalData.originList = originlist
                        }
                      })
                      wx.request({
                        url: 'https://qbkeass.cn/pass/getBest.php',
                        data: {
                          'wx_id' : that.globalData.openid
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
                          that.globalData.highestList = bestlist
                        }
                      })
                      wx.reLaunch({
                        url: '/pages/training/index',
                      })
                    },
                    fail: function(e){
                      // 未进行初始测试，跳转到测试页面
                      wx.reLaunch({
                        // url: '/pages/training/index',
                        url: '/pages/index/index',
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
    openid: null,
    userInfo: null,
    message: {
      'childAge': "",
      'childSex': "",
      'childHas': "",
      'parentEdu': ""
    },
    newList:[],
    originList:[],
    highestList:[],
    sysWidth:null,
    sysHeight:null,
  }
})