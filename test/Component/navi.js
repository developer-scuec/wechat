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
    gap:0,
    statuHeight:0,
    navBarHeight:0,
    list:false,
    search:false,
    left:0,
    show_my:false,
    setButton:""
  },
  attached: function () {
    
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height,
      gap:app.globalData.gap,
      statuHeight: app.globalData.statuHeight,
      navBarHeight: app.globalData.navBarHeight,
      left:app.globalData.left
    })
  },
  methods: {
    _list:function(e){
      if(!this.data.show_my){
        console.log("clink list");
        var pages = getCurrentPages()    //获取加载的页面( 页面栈 )
        var currentPage = pages[pages.length - 1]  // 获取当前页面
        if (!this.data.list) {
          currentPage.setData({
            list: true
          }),
            this.setData({
              list: true
            })
        } else {
          currentPage.setData({
            list: false
          }),
            this.setData({
              list: false
            })
        }
      }
      
    },
    search:function(e){
      if (!this.data.show_my){
        this.setData({
          search: true
        })
      }
      
    },

    cancle_search:function(e){
      console.log(this.data.search)
      this.setData({
        search:false
      })
    },
    my:function(){
      var pages = getCurrentPages()    //获取加载的页面( 页面栈 )
      var currentPage = pages[pages.length - 1]  // 获取当前页面
      if (!this.data.show_my) {
        currentPage.setData({
          show_my: true
        }),
          this.setData({
          show_my: true,
          backgroundColor: "rgba(0,0,0,0.2)"
          })
      } else {
        currentPage.setData({
          show_my: false
        }),
          this.setData({
          show_my: false,
          backgroundColor:"white"
          })
      }
    },
    go_cart:function(){
      if (this.data.show_my==false){
        wx.navigateTo({
          url: '/pages/cart/cart',
        })
      }
     
    },
    setButtom:function(data){
      this.setData({
        setButton:data
      })
    }
  }

}) 