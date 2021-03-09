// pages/addressList/addressList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var addressList = wx.getStorageSync('addressList') || [];
    console.info("addressList：" + addressList);
    // 更新数据  
    this.setData({
      addressList: addressList
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad();
  },

  //增加地址
  addAddress: function() {
    wx.navigateTo({
      url: '../address/address'
    });
  },

  /* 删除地址 */
  delAddress: function(e) {
    this.data.addressList.splice(e.target.id.substring(3), 1);
    // 更新data数据对象  
    if (this.data.addressList.length > 0) {
      this.setData({
        addressList: this.data.addressList
      })
      wx.setStorageSync('addressList', this.data.addressList);
    } else {
      this.setData({
        addressList: this.data.addressList
      })
      wx.setStorageSync('addressList', []);
    }
  }

})