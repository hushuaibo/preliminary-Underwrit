// pages/own/own.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      List:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
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
      let that = this;
      wx.login({
          success: function (res) {
              var code = res.code;
              if (code) {
                  wx.getUserInfo({
                      success: function (res) {
                          wx.request({
                              url: 'http://underwriting.algerfan.cn/underwriting/findUnderwriting',
                              header: {
                                  'content-type': 'application/json'
                              },
                              method: 'get',
                              data: {
                                  'encryptedData': res.encryptedData,
                                  'iv': res.iv,
                                  code: code
                              },
                              success: function (res) {
                                  console.log(res.data.list);
                                  that.setData({
                                      List: res.data.list
                                  })
                              }
                          })
                      }
                  })
              }
          }
      })
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