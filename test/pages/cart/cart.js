// pages/cart/cart.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp();
    this.setData({
      height: app.globalData.height
    }),
    wx.cloud.init({
      env: "shoppee"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.request({
    //   url: 'https://7368-shoppee-1301206439.tcb.qcloud.la/shops/shop.txt?sign=8009d9651d962b278f585628ae8dce9b&t=1585661676',//json数据地址
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     // console.log(res.data)
    //     var content = res.data
    //     console.log(content[0]);
    //     for (var i = 0; i <content.length; i++) {
    //         //将信息保存
    //         const db = wx.cloud.database();
    //         db.collection('goods').add({
    //           // data 字段表示需新增的 JSON 数据
    //           data: {
    //             //_id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
    //             entertainment:"phone",
    //             show_img:content[i].show_img,
    //             detail_img:content[i].detail_img,
    //             title:content[i].title,
    //             price:content[i].price

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

        

    //   }
    // })
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
  _back:function(){
    wx.navigateBack({
      
    })
  }
})