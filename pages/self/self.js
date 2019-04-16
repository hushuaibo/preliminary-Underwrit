
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    employeeId: '',
    company: '',
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.switchTab({
        url: './../index/index'
      })

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

        wx.switchTab({
          url: './../index/index'
        })
      }

    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.switchTab({
            url: './../index/index'
          })
        }
      })
    }
  },
  bindKeycompany: function (e) {
    let val = e.detail.value;
    this.setData({
      company: val
    })
  },
  bindKeyemployee: function (e) {
    let val = e.detail.value;
    this.setData({
      employeeId: val
    })
  },
  login: function (e) {
    let that = this;
    if (that.data.employeeId != '' && that.data.company != '') {
      let employeeId = that.data.employeeId;
      let company = that.data.company;
      wx.login({
        success: function (res) {
          var code = res.code;//登录凭证
          if (code) {
            //2、调用获取用户信息接口
            wx.getUserInfo({
              success: function (res) {
                //3.请求自己的服务器，解密用户信息 获取unionId等加密信
                wx.request({
                  url: 'http://algerfan.natapp1.cc/agent/login',
                  data: {
                    employeeId: employeeId,
                    company: company,
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    code: code
                  },
                  method: 'post',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded',
                  },
                  success: function (res) {
                      console.log(res);
                      
                      app.globalData.userInfo = res.detail.userInfo
                      this.setData({
                        userInfo: e.detail.userInfo,
                        hasUserInfo: true
                      })
                      wx.switchTab({
                        url: './../index/index'
                      })
                  }
                })

              },
              fail: function () {
                console.log('获取用户信息失败')
              }
            })
          } else {
            console.log('获取用户登录态失败！' + r.errMsg)
          }
        },
        fail: function () {
          console.log('登陆失败')
        }
      })
    }
  }
})
