// pages/suggestions/suggestions.js
// setTimeout() 是属于 window 的方法，该方法用于在指定的毫秒数后调用函数或计算表达式
// 语法格式可以是以下两种：
// 1、setTimeout(要执行的代码, 等待的毫秒数)
// 2、setTimeout(JavaScript 函数, 等待的毫秒数)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaValue: '',
    userInputLength: 0,
    isDisabled: false
  },

  //获取输入框内容
  suggestionInputValue: function(e) {
    this.setData({
      textareaValue: e.detail.value,
      userInputLength: e.detail.value.length
    });
  },

  //提交内容
  submit: function() {
    var that = this;
    if (that.data.textareaValue == '') {
      wx.showModal({
        title: '提示',
        content: '请输入内容',
        showCancel: false,
      })
    } else {
      that.setData({
        isDisabled: true
      });
      setTimeout(function() {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        });
        that.setData({
          isDisabled: false
        });
        setTimeout(function() {
          wx.navigateBack({
            delta: -1
          });
        }, 1000);
      }, 1000);
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

  },
})