// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({
      orders:JSON.parse(options.orders)
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
  conform:function(e){
    var that=this
    wx.showModal({
      title: '确认收货',
      content: '一但确认收货，货款将转移到商家账户，是否确认收货?',
      success:res=>{
        if (res.confirm) {
          var index = e.currentTarget.dataset.index
          var id = this.data.orders[index]._id
          const db = wx.cloud.database();
          this.data.orders.splice(index, 1)
          db.collection('order').doc(id).remove({
            success: res => {
              
              this.setData({
                orders: this.data.orders
              });
             
              var price = this.data.orders[index].price
              var num = this.data.orders[index].num
              var src = this.data.orders[index].src
              var openid = this.data.orders[index].openid
              var name = this.data.orders[index].name
              db.collection('history').add({
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
            }
          });
          
          
            wx.showToast({
              title: '收货成功',
            })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  }
})