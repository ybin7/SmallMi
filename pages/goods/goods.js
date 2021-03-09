// pages/goods/show.js
const app = getApp();
var goods_name = '';
var memory = '';
var color = '';
var price = '';
var select_num = '';
var cover = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    selected: true,
    selected1: false,
    goods_num: ''
  },


  selectBrief(e) {
    this.setData({
      selected: true,
      selected1: false
    });
  },

  selectParameter(e) {
    this.setData({
      selected: false,
      selected1: true
    });
  },

  //点击加入购物车
  toSelect() {
    const pre_item = wx.getStorageSync('attr_item');
    goods_name = wx.getStorageSync('goods_goods_name');
    memory = wx.getStorageSync('goods_memory');
    color = wx.getStorageSync('goods_color');
    select_num = wx.getStorageSync('goods_select_num');
    price = wx.getStorageSync('goods_price');
    cover = wx.getStorageSync('goods_cover');
    
    const temp = {
      'goods_name': goods_name,
      'memory': memory,
      'color': color,
      'price': price,
      'select_num': select_num,
      'cover': cover,
    }
    wx.setStorageSync('attr_item', [temp, ...pre_item]);


    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 3000,
    })
  },

  // 立即购买
  toBuy() {
    wx.getSetting({
      success: (res) => {
        //若已经授权，则支付功能正常使用
        if (res.authSetting['scope.userInfo']) {
          cover = wx.getStorageSync('goods_cover');
          goods_name = wx.getStorageSync('goods_goods_name');
          price = wx.getStorageSync('goods_price');
          select_num = wx.getStorageSync('goods_select_num');
          
          const temp = {
            'goods_name': goods_name, 
            'price': price,
            'select_num': select_num, 
            'cover': cover, 
          }
          wx.setStorageSync('cart_item', [temp]);

          wx.showToast({
            icon: 'success',
            duration: 3000,
            success: function () {
              wx.navigateTo({
                url: '../orderConfirm/orderConfirm'
              })
            }
          });

        } else { //若未授权，则提醒用户去授权
          wx.showModal({
            title: '您未授权',
            content: '对不起！由于您未授权登录，所以您暂时不能完成；立即购买操作。请前往【我的】页面点击授权按钮，立即购买功能方可正常使用',
            showCancel: false,
            success: function (res) {
              wx.switchTab({
                url: '../mine/mine'
              })
            }
          })
        }
      }
    })
  },


  goCart() {
    wx.switchTab({
      url: "../cart/cart"
    })
  },

  previewImage(e) {
    const index = e.currentTarget.dataset.index; //获取swiper里的图片的下标
    const slide = this.data.goods.goods_slides; //获取商品轮播图
    const imgList = []; //定义一个数组来存放轮播图的url
    // console.log(slide);
    slide.map(item => {
      imgList.push(item.slide_url);
    });
    wx.previewImage({
      current: imgList[index], // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: imgList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("options" + options);
    const id = options.id;
    console.log("id" + id);
    const goods = app.globalData.goodsDetail.filter(item => {
      return item.id == id;
    });
    console.log("goods" + goods);

    // 获取默认商品参数信息
    wx.setStorageSync('goods_goods_name', goods[0].header);
    wx.setStorageSync('goods_memory', goods[0].default[0]);
    wx.setStorageSync('goods_color', goods[0].default[1]);
    wx.setStorageSync('goods_select_num', goods[0].default[2]);
    wx.setStorageSync('goods_price', goods[0].default[3]);
   
    wx.setStorageSync('goods_cover', goods[0].goods_slides[0].slide_url);

    this.setData({
      goods: goods[0]
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  //把用户选好的商品规格从缓存拿出来
  onShow: function() {
    const goods_num = wx.getStorageSync('goods_sum');
    this.setData({
      goods_num
    });

    // this.goodsInfo();
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