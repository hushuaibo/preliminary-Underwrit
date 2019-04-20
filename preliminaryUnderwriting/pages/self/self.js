
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array: ['中国未来工作室未来工作室', '未来工作室测试2号', '未来工作室测试3号', '未来工作室测试4号'],
    index: 0,
    employeeId: ''
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
  // bindKeycompany: function (e) {
  //   let val = e.detail.value;
  //   this.setData({
  //     company: val
  //   })
  // },
  bindKeyemployee: function (e) {
    let val = e.detail.value;
    this.setData({
      employeeId: val
    })
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', this.data.array[e.detail.value]);
    this.setData({
      index: e.detail.value,
    })
  },
  login: function (e) {
    let that = this;
    if (that.data.employeeId != '' && that.data.company != '') {
      let employeeId = that.data.employeeId;
      let company = that.data.array[that.data.index];
      wx.login({
        success: function (res) {
          var code = res.code;//登录凭证
          if (code) {
            //2、调用获取用户信息接口
            wx.getUserInfo({
              success: function (res) {
                //3.请求自己的服务器，解密用户信息 获取unionId等加密信
                wx.request({
                  url: 'http://underwriting.algerfan.cn/agent/login',
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
                      if(res.data.status ==1){
                        app.globalData.userInfo = res.data.userInfo;
                        that.setData({
                          userInfo: res.data.userInfo,
                          hasUserInfo: true
                        });
                        wx.switchTab({
                          url: './../index/index'
                        })
                      }else{
                        console.log("登录失败");
                      }
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
