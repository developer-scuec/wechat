// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: null
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
    db.collection('history').where({
      openid: app.globalData.openid
    })
      .get({
        success: res => {

          this.setData({
            orders: res.data
          })
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
    var index = e.currentTarget.dataset.index
    var id = this.data.orders[index]._id
    const db = wx.cloud.database();
    var price = this.data.orders[index].price
    var num = this.data.orders[index].num
    var src = this.data.orders[index].src
    var openid = this.data.orders[index].openid
    var name = this.data.orders[index].name
    db.collection('order').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openid: openid,
        name: name,
        price: price,
        src: src,
        num: num,
      },
      success: e => {
        console("add success")
      },
      fail: function (e) {
        console.log(e)
      }
    })


  },
  
  deletePay: function (e) {
    var index = e.currentTarget.dataset.index
    const db = wx.cloud.database();
    var price = this.data.orders[index].price
    var id = this.data.orders[index]._id
    var num = this.data.orders[index].num
    this.data.orders.splice(index, 1)
    db.collection('history').doc(id).remove({
      success: res => {
        this.setData({
          orders: this.data.orders
        });
      
      }
    })
  }
})