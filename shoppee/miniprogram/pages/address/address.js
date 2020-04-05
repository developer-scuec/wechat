// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp();
    wx.cloud.init({
      env: "shoppee"
    })
    const db = wx.cloud.database();
    db.collection('address').where({
      openid: app.globalData.openid
    })
      .get({
        success: res => {

          this.setData({
            address: res.data
          })
          console.log(this.data.address)
        }
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
  formSubmit: function (e) {
    var app=getApp();
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //将信息保存
    const db = wx.cloud.database();
    if(this.data.address[0]==null){
      db.collection('address').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          //_id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          openid: app.globalData.openid,
          lastName: e.detail.value.lastName,
          firstName: e.detail.value.firstName,
          province: e.detail.value.province,
          city: e.detail.value.city,
          area: e.detail.value.area,
          street: e.detail.value.street,
          room: e.detail.value.room,
          zipCode: e.detail.value.zipCode,
          phone: e.detail.value.phone
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: '保存成功',
          })

        },
        fail: function (res) {
          console.log(res)
        },
        complete: function (e) {
          wx.navigateBack();
        }
      })  
    }else{
      console.log(this.data.address)
      console.log(e.detail.value.room)
      db.collection('address').doc('this.data.address[0]._id').update({
        // data 传入需要局部更新的数据
        data: {
          openid: app.globalData.openid,
          lastName: e.detail.value.lastName,
          firstName: e.detail.value.firstName,
          province: e.detail.value.province,
          city: e.detail.value.city,
          area: e.detail.value.area,
          street: e.detail.value.street,
          room: e.detail.value.room,
          zipCode: e.detail.value.zipCode,
          phone: e.detail.value.phone
        },
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        },
        complete: function (e) {
          wx.navigateBack();
        }
      })
    }
    
  },
})