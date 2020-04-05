//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  
    list:false,
    // 此页面 页面内容距最顶部的距离
    height: 0,
    gap: 0,
    statuHeight: 0,
    navBarHeight: 0,
    list: false,
    search: false,
    left: 0,
    show_my:false
    
  },

  onLoad: function () {
  
    this.setData({
      height: app.globalData.height,
      gap: app.globalData.gap,
      statuHeight: app.globalData.statuHeight,
      navBarHeight: app.globalData.navBarHeight,
      left: app.globalData.left,
      windowsWidth: app.globalData.windowsWidth
    })
    console.log(this.data.height)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  hidde:function(){
    var component = this.selectComponent('#nav');
    component.my()
  },
  onPageScroll: function (ev) {
    var component = this.selectComponent('#nav');
    if (ev.scrollTop>0){
      component.setButtom("0 1px 10px -1px #dadada");
    }else if(ev.scrollTop<=0){
      component.setButtom("");
    }
  }
})
