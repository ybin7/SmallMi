//home.js
//获取应用实例
import showDetail from "../../modules/showDetail";
import showcDetail from "../../modules/showcDetail";
const app = getApp()

Page({
  data: {
    index_slides: [],
    indicator_dots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    navBar_data: [],
    index_activity: [],
    index_block: [],
    isTap: false,
    isLoading: false
  },
  
  onLoad() {
    const index_slides = app.globalData.index_slides,
      navBar_data = app.globalData.navBar_data,
      index_activity = app.globalData.index_activity,
      index_block = app.globalData.index_block,
      sectionList = index_block.map((section) => {
        return section.section;
      })
    console.log("sectionList：" +  sectionList);
    console.log("index_block：" + index_block);
    this.setData({
      index_slides,
      navBar_data,
      index_activity,
      index_block,
    });

  },

  onShow(e) {
    this.setData({
      isTap: false
    });
  },

  sectionSlide: function() {
    wx.navigateTo({
      url: '../channel/phone/phone'
    })
  },

  sectionSlideTV: function() {
    wx.navigateTo({
      url: '../channel/television/television'
    })
  },

  showDetail,
  showcDetail
})