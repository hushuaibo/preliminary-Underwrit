//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Welcome',
    userInfo: {},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var userInfoTmp = app.globalData.userInfo;
    if (userInfoTmp == null) {
      wx.redirectTo({
        url: './../self/self',
      })
    } else {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  loginoutClick: function(even) {
    this.setData({
      userInfo: null,
      hasUserInfo: false,
    }),
    app.globalData.userInfo = null
    wx.redirectTo({
      url: './../self/self'
    })
  },
})
