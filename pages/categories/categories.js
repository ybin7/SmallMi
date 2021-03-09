// pages/category/category.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category_list:[
      {title:"精品",id:"highquality"},
      {title:"手机",id:"phone"},
      {title:"电视",id:"tv"},
      {title:"电脑",id:"laptop"},
      {title:"家电",id:"appliances"},
      {title:"路由器",id:"router"},
      {title:"手表",id:"watches"},
      {title:"监控",id:"monitoring"},
      {title:"灯具",id:"lignts"},
      {title:"充电宝",id:"powerbank"},
      {title:"耳机",id:"earphone"},
      {title:"音箱",id:"loudsperker"},
      {title:"数码",id:"camera"},
      {title:"CD",id:"CD"},
      {title:"收音机",id:"radio"},
      {title:"摄像机",id:"vidicon"}
    ],
    curIndex:0,
    SwitchPage: "highquality",//toView值是不能以数字开头的
    details:[]
  },

  categoryGoods: function() {
    wx.navigateTo({
      url: '../channel/phone/phone'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  

  // 事件处理函数
  toSearch(e) {
    this.setData({
      isTap: true
    });
    wx.navigateTo({
      url: "../search/search"
    })
  },

  //分类导航处理函数
  switchCategory(e) {
    console.debug(e);
    const curIndex = e.currentTarget.dataset.index?e.currentTarget.dataset.index:0;
    this.setData ({
      SwitchPage: e.currentTarget.dataset.id,
      curIndex
    });
  },

  onLoad: function (options) {
    const details = app.globalData.category;
    this.setData ({
      details
    });
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
  
  }
})