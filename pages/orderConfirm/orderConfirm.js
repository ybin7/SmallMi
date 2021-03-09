// pages/orderConfirm/orderConfirm.js
Page({
  data: {
    orderList: [],
    addressList: [],
    consignee: '',
    mobile: '',
    address: '',
    orderGoodsTotal: 0,
    orderGoodsTotalSum: 0,
    orderTotalPrice: 0,
    userInputLength: 0
  },

  // 添加收货地址
  addOrderAddress: function() {
    wx.navigateTo({
      url: '../addressList/addressList'
    })
  },

  // 修改收货地址
  addressModify: function() {
    if (this.data.addressList.length == !0) {
      wx.navigateTo({
        url: '../address/address'
      })
      wx.removeStorageSync('addressList');
    }
  },



  // 统计输入文本长度
  userInput: function(e) {
    this.setData({
      userInputLength: e.detail.value.length
    })
  },

  // 提交订单
  orderConfirm: function() {
    if (this.data.addressList.length === 0) {
      wx.showModal({
        title: '您未添加地址',
        content: '对不起！您未添加收货信息，不能提交订单。请前往【我的】页面，在收货地址中添加地址',
        showCancel: false,
        success: function(res) {
          wx.switchTab({
            url: '../mine/mine'
          })
          wx.removeStorageSync('cart_item');
        }
      })
    } else {
      wx.navigateTo({
        url: '../confirmPayment/confirmPayment'
      })
    }
  },

  // 取消订单
  orderCancel: function(e) {
    wx.switchTab({
      url: "../cart/cart"
    })
    wx.removeStorageSync('cart_item');
  },

  // 商品清单
  orderGoodsList: function() {
    const temp = wx.getStorageSync('cart_item');
    let orderGoodsTotal = 0; //订单总额
    let orderGoodsTotalSum = 0; //总件数
    let orderList = this.data.orderList;
    orderList = [...temp];
    console.log("orderList：" + orderList.length);
    const select_num = orderList.map(item => {
      return item.select_num;
    })
    const price = orderList.map(item => {
      return item.price;
    })

    // 订单总额
    for (let i = 0; i < orderList.length; i++) {
      //用price.substring(1)去掉¥1099中的非数字¥
      //Js中的parseInt()方法传的可以有非数字字符串，遇到非数字字符停下来
      orderGoodsTotal += parseInt(orderList[i].select_num) * parseInt(orderList[i].price.substring(1));
      console.log("总价：" + orderGoodsTotal);
    }

    wx.setStorageSync('orderGoodsTotal', orderGoodsTotal);

    // 总件数
    for (let i = 0, len = select_num.length; i < len; i++) {
      orderGoodsTotalSum += select_num[i];
    }

    this.setData({
      orderList: orderList,
      orderGoodsTotalSum: orderGoodsTotalSum,
      orderGoodsTotal: orderGoodsTotal
    });
  },

  // 我的地址
  orderGoodsAddressList: function() {

    var temp = wx.getStorageSync('addressList');
    let addressList = this.data.addressList;
    addressList = [...temp];
    console.log("orderConfirm_addressList：" + addressList);
    const consignee = addressList.map(item => {
      return item.consignee;
    })

    const mobile = addressList.map(item => {
      return item.mobile;
    })

    const address = addressList.map(item => {
      return item.address;
    })

    this.setData({
      addressList: addressList,
      consignee: consignee,
      mobile: mobile,
      address: address
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

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
    this.orderGoodsList();
    this.orderGoodsAddressList()

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