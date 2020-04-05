// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    tempFilePaths:null,
    multiArray: [
      "手机/电脑/数码",
      "男装/女装/童装",
      "男鞋/运动/户外",
      "女鞋/箱包/钟表",
      "美妆/个护清洁/宠物",
      "图书/文娱/电子书"
      ]
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
  selectImg:function(e){
    
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success:(res)=> {
        // tempFilePath可以作为img标签的src属性显示图片
        this.setData({
          tempFilePaths: res.tempFilePaths
        })   
      }
    })
  },
  formSubmit:function(e){
    var imageArray = new Array();
    if (e.detail.value.title == "" || e.detail.value.detail == "" || e.detail.value.price == "" || e.detail.value.reprice == ""|| this.data.tempFilePaths==null){
      wx.showToast({
        title: '请完善信息',
        icon: 'none',
        mask: true
      })
    }else{
      wx.showLoading({
        title: '正在发布',
      })
      for (var i = 0; i < this.data.tempFilePaths.length; i++) {
        var timestamp = (new Date().getTime()).toString();
        var outTradeNo = "";
        for (var j = 0; j < 4; j++) //6位随机数，用以加在时间戳后面。
        {
          outTradeNo += (Math.floor(Math.random() * 10)).toString();
        }
        imageArray.push(timestamp + outTradeNo)
      }

      //循环上传图片文件
      for(i=0;i<this.data.tempFilePaths.length;i++){
        var filePath = this.data.tempFilePaths[i]
        // 上传图片
        const cloudPath = "images/"+imageArray[i]+filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          filePath,
          cloudPath,
          success: res => {
            console.log('[上传文件] 成功：', res)
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '发布失败',
            })
            return 0;
          },
          
        })
      }
      //将信息保存
      const db = wx.cloud.database();
      db.collection('shop').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          //_id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          shop_info: e.detail.value,
          shop_image: imageArray,
          shop_classify: this.data.multiArray[this.data.index],

        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: '发布成功',
          })
          
        },
        fail: function (res) {
          console.log(res)
        },
        complete:function(e){
          wx.navigateBack();
        }
      })  
   }
    
  }
})