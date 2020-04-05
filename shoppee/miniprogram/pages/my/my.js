// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImg:"/pages/icon/my.png",
    nickName:"登录 > ",
    otherInfo:"",
    orders:null,
    orderString:null
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      env: "shoppee"
    })
    // 获取用户信息
    wx.getSetting({

      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId

              var userInfo = res.userInfo;

              this.setData({
                headImg: userInfo.avatarUrl,
                nickName: userInfo.nickName,
                otherInfo: userInfo.country+" "+userInfo.province+" "+userInfo.city
              });
              console.log(this.data.headImg);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
    

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
    var app = getApp()
    const db = wx.cloud.database();
    db.collection('order').where({
      openid: app.globalData.openid
    })
      .get({
        success: res => {

          this.setData({
            orders: res.data.reverse(),
            orderString: JSON.stringify(res.data)
          })

        }
      })
    // wx.cloud.init({
    //   env: "shoppee"
    // })
    // wx.cloud.callFunction({
    //   // 云函数名称
    //   name: 'echo',
    //   // 传给云函数的参数
   
    //   success: function (res) {
    //     console.log(res) // 3
    //   },
    //   fail: console.error
    // })
    
    // wx.request({
    //   url: 'https://7368-shoppee-1301206439.tcb.qcloud.la/shops/17.json?sign=4995f05a72997ebf66a993e4956d5640&t=1583935333',//json数据地址
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     // console.log(res.data)
    //     var content = res.data
    //     var strings = content.split(/[{}]/)
    //     for (var i = 0; i <strings.length; i++) {
          
    //       var json = JSON.parse("{" + strings[i] + "}")
    //       if (json.src !=null) {
  
    //         //将信息保存
    //         const db = wx.cloud.database();
    //         db.collection('shops').add({
    //           // data 字段表示需新增的 JSON 数据
    //           data: {
    //             //_id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
    //             classify: "entertainment",
    //             link: json.link,
    //             src: json.src,
    //             price: json.price,
    //             name: json.name,
    //             comment: json.comment

    //           },
    //           success: function (res) {
    //             // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //             console.log(res)

    //           },
    //           fail: function (res) {
    //             console.log(res)
    //           }
    //         })
    //       }

    //     }

    //   }
    // })
  //   const db = wx.cloud.database();
  //   db.collection('shops').where({
  //     src:"None"
  //   })
  //     .get({
  //       success: function (res) {
  //         console.log(res.data)
  //       }
  //     })
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
  bindGetUserInfo:function(){
    // 获取用户信息
    wx.getSetting({

      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              
              var userInfo = res.userInfo;

              this.setData({
                headImg: userInfo.avatarUrl,
                nickName:userInfo.nickName,
                otherInfo: userInfo.country +" "+ userInfo.province +" "+ userInfo.city
              });
            
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success:res=>{
              console.log(res.userInfo);
            }
          })

        }
      }
    })
  }
})