// 通过元素id跳转页面
// 传统写法：
// `wx.navigateTo({url:'/pages/chatroom/chatroom?id='+id})`

// 新写法（新写法使用反引号 `` 变量使用 ${id}）：
// wx.naigateTo({
//   url: `/pages/chatroom/chatroom?id=${id}`
// })
const showcDetail=(e)=>{
    const id=e.currentTarget.dataset.cid;
    wx.navigateTo({
      url: `/pages/goods/goods?id=${id}`
    })
};
export default showcDetail;