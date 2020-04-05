// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    name:null,
    price:null,
    src:null,
    index:0,
    multiArray: [
      "1",
      "2"
  
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      name:options.name,
      price:options.price,
      src:options.src
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
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  buy:function(e){
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
  addCar:function(e){
    var app = getApp();
    //将信息保存
    const db = wx.cloud.database();
    db.collection('car').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openid: app.globalData.openid,
        name: this.data.name,
        price:this.data.price,
        src:this.data.src,
        num:this.data.multiArray[this.data.index],
        isAdd:false

      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '添加成功',
        })

      },
      fail: function (res) {
        console.log(res)
      }
    })  
  },
  addCollect:function(e){
    var app = getApp();
    //将信息保存
    const db = wx.cloud.database();
    db.collection('collect').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openid: app.globalData.openid,
        name: this.data.name,
        price: this.data.price,
        src: this.data.src,
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '收藏成功',
        })

      },
      fail: function (res) {
        console.log(res)
      }
    })  
  }
})