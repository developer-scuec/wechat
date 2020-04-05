// pages/phone/phone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify:null,
    shops:null,
    shop:null,
    windowHeight:null,
    page:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success:  res=> {
        this.setData({
          windowHeight: res.windowHeight
        });
      }
    }),
    console.log(options.classify)
    this.setData({
      classify:options.classify
    })
    wx.cloud.init({
      env: "shoppee"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const db = wx.cloud.database();
    db.collection('shops').where({
      classify: this.data.classify
    })
    .get({
        success: res=>{
          
          this.setData({
            shops: res.data
          })
          console.log(this.data.shops)
        }
      })
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
  next:function () {
    this.setData({
      page:this.data.page+1
    })
    const db = wx.cloud.database();
    db.collection('shops').where({
      classify: this.data.classify
    }).skip(this.data.page * 20).limit(20).get({
      success: res => {

        this.setData({
          shops: res.data
        })
      }
    }),
      wx.pageScrollTo({
        scrollTop: 0
      })
      
  },
  preview: function () {
    this.setData({
      page: this.data.page - 1
    })
    const db = wx.cloud.database();
    db.collection('shops').where({
      classify: this.data.classify
    }).skip(this.data.page * 20).limit(20).get({
      success: res => {
        this.setData({
          shops: res.data
        })
          
      }
    }),
 
      wx.pageScrollTo({
        scrollTop: 0
      })
  }
})