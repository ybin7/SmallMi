// pages/cart/cart.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart_list: [],
    isSelected: [],
    totalPrice: 0,
    selectAllStatus: false,
    startX: 0, //开始坐标
    startY: 0
  },

  toHome() {
    wx.switchTab({
      url: "../home/home"
    })
  },

  // 选择商品
  selectList(e) {
    var selectAllStatus = this.data.selectAllStatus;
    var index = e.currentTarget.dataset.index;
    var cart_list = this.data.cart_list;
    var selected = cart_list[index].selected;
    cart_list[index].selected = !selected;
    //购物车列表里的条目只要有一个取消，全选就取消
    var symbol = cart_list.some(cart => {
      return cart.selected === false;
    });
    if (symbol) {
      this.data.selectAllStatus = false;
    } else {
      this.data.selectAllStatus = true;
    }

    this.setData({
      cart_list,
      selectAllStatus: this.data.selectAllStatus
    });
    this.getTotalPrice();
  },

  //计算总价
  getTotalPrice() {
    let cart_list = this.data.cart_list;
    let totalPrice = 0;
    for (let i = 0; i < cart_list.length; i++) {
      if (cart_list[i].selected) {
        //用price.substring(1)去掉¥1099中的非数字¥
        //Js中的parseInt()方法传的可以有非数字字符串，遇到非数字字符停下来
        totalPrice += parseInt(cart_list[i].select_num) * parseInt(cart_list[i].price.substring(1));
        console.log("总价：" + totalPrice);
      }
    }
    //更新总价
    this.setData({
      totalPrice
    });
  },

  // 全选
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let cart_list = this.data.cart_list;
    for (let i = 0; i < cart_list.length; i++) {
      cart_list[i].selected = selectAllStatus;
    }
    this.setData({
      cart_list,
      selectAllStatus
    });
    this.getTotalPrice();
  },

  //滑动事件处理
  touchstart: function(e) {
    this.data.cart_list.map(item => {
      if (item.isTouchMove) {
        item.isTouchMove = false;
      }
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      cart_list: this.data.cart_list
    })
  },

  //滑动事件处理
  touchmove(e) {
    var
      index = e.currentTarget.dataset.index, //当前索引
      startX = this.data.startX, //开始X坐标
      startY = this.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = this.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    this.data.cart_list.forEach(function(v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    this.setData({
      cart_list: this.data.cart_list
    })
  },

  angle(start, end) {
    var X = end.X - start.X,
      Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(Y / X) / (2 * Math.PI);
  },

  // 删除商品处理函数
  delCartItem(e) {
    const index = e.currentTarget.dataset.index;
    console.log("cart_index：" + index);
    this.data.cart_list.splice(index, 1);
    wx.clearStorageSync("select_num");
    this.setData({
      cart_list: this.data.cart_list
    });
  },
  // 将购物车中选中的商品添加到一个集合中


  // 去结算
  toConfirm: function(e) {
    var select = 0;
    var that = this;
    var cart_list = this.data.cart_list;
    var symbol = cart_list.every(cart => {
      return cart.selected === false;
    });

    // 统计未选中商品的个数
    for (let i = 0; i < cart_list.length; i++) {
      if (!cart_list[i].selected) {
        select++;
      }
    }
    // console.log("cart_select：" + select);
    // 未选中商品进行提示
    if (select == cart_list.length) {
      wx.showModal({
        title: '您未选择商品',
        content: '请选择商品后再进行结算',
        showCancel: false,
      })
    } else { //选中商品后去结算
      wx.getSetting({
        success: (res) => {
          //若已经授权，则支付功能正常使用
          if (res.authSetting['scope.userInfo']) {
            for (let i = 0; i < cart_list.length; i++) {
              if (cart_list[i].selected) {
                console.log("cart_list:" + [i] + "：" + cart_list[i].selected);
                console.log("cart_list.length：" + cart_list.length);
                const pre_item = wx.getStorageSync('cart_item');
                const temp = {
                  'goods_name': cart_list[i].goods_name, //商品名称
                  'price': cart_list[i].price, //商品价格
                  'select_num': cart_list[i].select_num, //商品数量
                  'cover': cart_list[i].cover, //商品图片
                }
                wx.setStorageSync('cart_item', [temp, ...pre_item]);
                console.log("cart_pre_item：" + pre_item);
              }
            }
            wx.navigateTo({
              url: '../orderConfirm/orderConfirm'
            })

          } else { //若未授权，则提醒用户去授权
            wx.showModal({
              title: '您未授权',
              content: '对不起！由于您未授权登录，所以您暂时不能完成结算操作。请前往【我的】页面点击授权按钮，结算功能方可正常使用',
              showCancel: false,
              success: function (res) {
                wx.switchTab({
                  url: '../mine/mine'
                })
              }
            })
            wx.removeStorageSync('cart_item');
          }
        }
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var goods_name = wx.getStorageSync('goods_name');
    var price = wx.getStorageSync('price');
    var select_num = wx.getStorageSync('select_num');
    var cover = wx.getStorageSync('cover');

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
    const attr_item = wx.getStorageSync('attr_item');
    let cart_list = this.data.cart_list;
    cart_list = [...attr_item];
    const select_num = cart_list.map(item => {
      return item.select_num;
    })
    let goods_sum = 0; //商品总件数
    for (let i = 0, len = select_num.length; i < len; i++) {
      goods_sum += select_num[i];
    }
    console.log("goods_sum：" + goods_sum);
    wx.setStorageSync('goods_sum', goods_sum);

    this.setData({
      cart_list
    });

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