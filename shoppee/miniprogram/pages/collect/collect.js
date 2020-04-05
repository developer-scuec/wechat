// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops: null,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      env: "shoppee"
    })
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
    db.collection('collect').where({
      openid: app.globalData.openid
    })
      .get({
        success: res => {

          this.setData({
            shops: res.data
          })
          console.log(this.data.shops)
        }
      })
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
  buy: function (e) {
    wx.showLoading({
      title: 'Wechat Pay',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    wx.showLoading({
      title: '正在支付',
    })
    setTimeout(function () {
      wx.hideLoading()
      wx.showToast({
        title: '支付成功',
      })
    }, 2000)

  },
  bindGetUserInfo: function () {
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
                otherInfo: userInfo.country + " " + userInfo.province + " " + userInfo.city
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
            success: res => {
              console.log(res.userInfo);
            }
          })

        }
      }
    })
  },
  addPay: function (e) {
    if (this.data.shops[e.currentTarget.dataset.index].isAdd == false) {
      this.data.shops[e.currentTarget.dataset.index].isAdd = true
      this.setData({
        total: parseFloat(this.data.total) + parseFloat(this.data.shops[e.currentTarget.dataset.index].price),
        shops: this.data.shops
      })
    } else {
      this.data.shops[e.currentTarget.dataset.index].isAdd = false
      this.setData({
        total: parseFloat(this.data.total) - parseFloat(this.data.shops[e.currentTarget.dataset.index].price),
        shops: this.data.shops
      })
    }

  },
  deletePay: function (e) {
    var index = e.currentTarget.dataset.index
    const db = wx.cloud.database();
    var isAdd = this.data.shops[index].isAdd
    var price = this.data.shops[index].price
    var id = this.data.shops[index]._id
    var num = this.data.shops[index].num
    this.data.shops.splice(index, 1)
    db.collection('collect').doc(id).remove({
      success: res => {
        this.setData({
          shops: this.data.shops
        });
        if (isAdd) {
          this.setData({
            total: parseFloat(this.data.total) - parseFloat(price) * parseFloat(num),
          })
        }
      }
    }),
      console.log(index)
  }
})