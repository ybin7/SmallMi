// pages/confirmPayment/confirmPayment.js

Page({
  data: {
    orderGoodsTotal: 0,
    orderRandonNo: '',
    orderDate: '',
    orderTime: '',
    pay_tips: '请在下单后15分钟内完成支付，否则订单将失效',
    orderpayment: [{
      iconClass: 'weixinpay',
      name: '微信支付',
      info: '推荐安装微信5.0及以上版本的用户使用',
      selected: true
    }, {
      iconClass: 'alipay',
      name: '支付宝',
      info: '推荐有支付宝账号的用户使用',
      selected: false
    }]

  },

  //事件点击函数


  // 选择支付方式
  changePayment: function(e) {
    var paymentIndex = e.currentTarget.dataset.paymentIndex,
      payment = this.data.orderpayment,
      i, p;
    for (i = 0; p = payment[i]; ++i) {
      p.selected = i == paymentIndex ? true : false;
    }
    this.setData({
      orderpayment: payment
    });
  },

  //确认支付
  orderPaymentConfirm: function(e) {
    wx.getSetting({
      success: (res) => {
        //若已经授权，则支付功能正常使用
        if (res.authSetting['scope.userInfo']) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 3000,
            success: function() {
              wx.navigateTo({
                url: '../paymentStatus/paymentStatus'
              })
              wx.removeStorageSync('cart_item');
            }
          });
        } 
      }
    })
  },

  // 取消支付
  orderPaymentCancel: function(e) {
    wx.switchTab({
      url: "../cart/cart"
    })
    wx.removeStorageSync('cart_item');
  },


  //订单编号
  orderNum: function() {
    var orderNo = "";
    var orderRandomNum = "";
    var now = new Date();
    var year = now.getFullYear()
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hours = now.getHours(); //获取当前小时数(0-23)
    var minutes = now.getMinutes(); //获取当前分钟数(0-59)
    var seconds = now.getSeconds(); //获取当前秒数(0-59)
    var milliSeconds = now.getMilliseconds() //获取当前毫秒数
    if (month < 10) {
      month = "0" + month;
    } else {
      month = month;
    }
    if (date < 10) {
      date = "0" + date;
    } else {
      date = date;
    }
    if (hours < 10) {
      hours = "0" + hours;
    } else {
      hours = hours;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    } else {
      minutes = minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    } else {
      seconds = seconds;
    }
    if (milliSeconds < 10) {
      milliSeconds = "0" + milliSeconds;
    } else {
      milliSeconds = milliSeconds;
    }
    for (var i = 0; i < 6; i++) {
      orderRandomNum += Math.floor(Math.random() * 10);
    }

    orderNo = year.toString() + month.toString() + date.toString() + hours.toString() + minutes.toString() + seconds.toString() + milliSeconds.toString() + orderRandomNum;

    this.setData({
      orderRandonNo: orderNo
    })
  },

  // 订单时间
  orderTimes: function() {
    var orderDates = "";
    var orderTimes = "";
    var now = new Date();
    var year = now.getFullYear()
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hours = now.getHours(); //获取当前小时数(0-23)
    var minutes = now.getMinutes(); //获取当前分钟数(0-59)
    var seconds = now.getSeconds(); //获取当前秒数(0-59)
    if (month < 10) {
      month = "0" + month;
    } else {
      month = month;
    }
    if (date < 10) {
      date = "0" + date;
    } else {
      date = date;
    }
    if (hours < 10) {
      hours = "0" + hours;
    } else {
      hours = hours;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    } else {
      minutes = minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    } else {
      seconds = seconds;
    }

    orderDates = [year, month, date].map(formatNumber).join('-');
    orderTimes = [hours, minutes, seconds].map(formatNumber).join(':');

    this.setData({
      orderDate: orderDates,
      orderTime: orderTimes,
    })

  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.orderNum();
    this.orderTimes();
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
    var orderGoodsTotal = wx.getStorageSync('orderGoodsTotal');
    this.setData({
      orderGoodsTotal: orderGoodsTotal,
    })
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

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}