//app.js
App({
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
  
    wx.login({
      success:  res=> {
        console.log(res)
        if (res.code) {
          console.log('通过login接口的code换取openid') 
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              //填上自己的小程序唯一标识
              appid: 'wx3b4f2048df4afbfe',
              //填上自己的小程序的 app secret
              secret: '4726d19071bd57df923ace391ed148fb',
              grant_type: 'authorization_code',
              js_code: res.code
            },
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: openIdRes=> {
              this.globalData.openid=openIdRes.data.openid
              console.info("登录成功返回的openId：" + this.globalData.openid);
            },
            fail: function (error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }
      }
    })
  
        },
        globalData: {
          userInfo: null,
          openid:null
        }
      })