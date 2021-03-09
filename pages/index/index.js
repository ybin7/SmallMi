// pages/login/login.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   * 
   * wx.canIUse(String)
   * 判断小程序的API，回调，参数，组件等是否在当前版本可用。
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },


  //获取头像昵称等个人信息
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      console.log("e.detail.userInfo：" + e.detail.userInfo)
      wx.showToast({
        title: '授权成功',
        icon: 'success',
        duration: 2000,
        success: function(res) {
          app.globalData.userInfo = e.detail.userInfo,
            wx.reLaunch({
              url: '../home/home'
            })
        }
      });
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    } else {
      wx.showModal({
        title: '您未授权',
        content: '您好！您虽未授权，也可进入小程序。如需正常使用小程序功能，请点击确认按钮并在【我的】页面中点击授权按钮',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '../home/home'
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    if (app.globalData.flag) {//如果flag为true，退出
      wx.navigateBack({
        delta: -1
      })
      console.log("已退出--flag：" + app.globalData.flag)
      
    }
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})