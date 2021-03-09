var app = getApp()
Page({

  /**
   * 页面的初始数据
   * 
   * wx.canIUse(String)
   * 判断小程序的API，回调，参数，组件等是否在当前版本可用。
   */
  data: {
    avatarUrl: '../../images/mine_img/mine_photo.png',
    isLogin: true,
    hidden: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        isLogin: false,
        hidden: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
      })
    }
  },

  // 个人日志
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //获取头像昵称等个人信息
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      wx.showToast({
        title: '授权成功',
        icon: 'success',
        duration: 2000
      });
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        isLogin: false,
        hidden: true
      })
    } else {
      wx.showModal({
        title: '用户未授权',
        content: '如需正常使用小程序功能，请点击确认按钮并在【我的】页面中点击授权按钮后，小程序即可正常使用',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../home/home'
            })
          }
        }
      })
      this.setData({
        isLogin: true,
        hidden: false
      })
    }
  },

  //我的订单
  MyOrder: function() {
    wx.getSetting({
      success: (res) => {
        //若已经授权，则支付功能正常使用
        if (res.authSetting['scope.userInfo']) {
              //保留当前页面，跳转到应用内的某个页面
              wx.navigateTo({
                url: '../order/order'
              })
        } else { //若未授权，则提醒用户去授权
          wx.showModal({
            title: '您未授权',
            content: '对不起！由于您未授权登录，所以您不能查看订单信息。请前往【我的】页面点击授权按钮，我的订单功能方可正常使用',
            showCancel: false,
          })
        }
      }
    })
  },

  //收货地址
  MyAddress: function() {
    wx.navigateTo({
      url: '../addressList/addressList'
    })
  },

  Myinvoice: function() {
    wx.showModal({
      title: '提示',
      content: '很抱歉！目前该小程序暂时还不能使用开发票功能',
      cancelColor: "#3cc51f",
      confirmColor: "#3cc51f",
    })
  },

  MySuggestion: function() {
    wx.navigateTo({
      url: '../suggestions/suggestions'
    })
  },




  //联系客服 
  //slice(start,end)返回一个新的数组包,含从start到end(不包括该元素)的元素。如果 end 未被规定，那么 slice() 方法会选取从 start 到数组结尾的所有元素。
  MyCallPhone: function() {
    var phone = '8888-8888';
    var tel_phone = wx.getStorageSync("app_info").service_tel_phone;
    if (wx.getStorageSync("app_info")) {
      phone = tel_phone.slice(0, 4) + '-' + tel.slice(4);
    }
    wx.showModal({
      title: '提示', //提示的标题
      content: '拨打商城客服：' + phone, //提示的内容
      cancelColor: "#3cc51f", //取消按钮的颜色
      confirmColor: "#3cc51f", //确认按钮的颜色
      success(res) { //接口调用成功的回调函数
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: phone,
          });
        }
      }
    });
  },

  //退出登录
  Myexit: function(e) {
    // var that = this;
    wx.showModal({
      title: '确认是否退出',
      content: '您退出登录后您在本小程序所涉及的个人信息将会被全部清除，请放心退出本小程序',
      cancelColor: "#3cc51f", //取消按钮的颜色
      confirmColor: "#3cc51f", //确认按钮的颜色
      success(res) {
        if (res.confirm) {
          app.globalData.flag = true;
          wx.reLaunch({
            url: '../index/index',
          })
          wx.removeStorageSync('addressList');
          wx.removeStorageSync('cart_item');
          wx.removeStorageSync('attr_item');
        }
      }
    })
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