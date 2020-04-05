const app = getApp()
Component({
  properties: {
    navbarData: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function (newVal, oldVal) { }
    }
  },
  data: {
    height: '',
    gap: 0,
    statuHeight: 0,
    navBarHeight: 0,
    list: false,
    search: false,
    left: 0,
    show_my: false
  },
  attached: function () {
    // 获取是否是通过分享进入的小程序
    this.setData({
      share: app.globalData.share
    })
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height,
      gap: app.globalData.gap,
      statuHeight: app.globalData.statuHeight,
      navBarHeight: app.globalData.navBarHeight,
      left: app.globalData.left
    })
  },
  methods: {
    _back: function (e) {
    
      var pages = getCurrentPages()    //获取加载的页面( 页面栈 )
      var currentPage = pages[pages.length - 1]  // 获取当前页面
      
      wx.navigateBack({
        
      })


    }
    
  }

}) 