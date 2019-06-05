
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array: null ,
    index:'' ,
    employeeId: '',
    companyArray:null,
    login_msg:'',
  },

  onLoad: function () {
    console.log(app.globalData.userInfo)
    
    // 请求公司名称
    wx.request({
      url: 'https://underwriting.algerfan.cn/company/select',
      method: 'get',
      header: {
        'content-type': 'application/json' 
      },
      success: res => {
        let companyList=res.data.companyList;
        let companyArray =[];
        if(res.data.status==1){
          for(let i in companyList){
            companyArray.push(companyList[i].company);
          }
          this.setData({
            array: companyList,
            companyArray:companyArray
          })
        }
      }
    })
    // 进入时判断globaldata.userinfo 是否有用户信息
    if (app.globalData.userInfo != null) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.switchTab({
        url: './../index/index'
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
  // 工号选择
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', this.data.array[e.detail.value]);
    this.setData({
      index: e.detail.value,
    })
  },
  // 登录请求获得openid
  login: function (e) {
    let that = this;
    if (that.data.employeeId != '' && that.data.company != '') {
      let employeeId = that.data.employeeId;
      let company = that.data.companyArray[that.data.index];
      wx.login({
        success: function (res) {
          var code = res.code;//登录凭证
          if (code) {
            //2、调用获取用户信息接口
            wx.getUserInfo({
              success: function (res) {
                //3.请求自己的服务器，解密用户信息 获取unionId等加密信
                wx.request({
                  url: 'https://underwriting.algerfan.cn/agent/login',
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
                          hasUserInfo: true,
                          login_msg:res.data.msg
                        });
                        wx.switchTab({
                          url: './../index/index'
                        })
                      }else{
                        that.setData({
                          login_msg:res.data.msg
                        });
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
          that.setData({
            login_msg: '登录失败'
          });
        }
      })
    }
  }
})
