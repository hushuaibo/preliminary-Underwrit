// pages/file/file.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    'encryptedData': '',
    'iv': '',
    'code': '',
    'phone': '',
    'TIP':'选择文件'
  },
  chooseFile:function(){
    var change=this;
    var encryptedData = this.data.encryptedData;
    var iv = this.data.iv;
    var phone = this.data.phone;
    wx.chooseMessageFile({
      count: 10,
      type: 'all',
      success(file) {
        change.setData({
          'TIP': '文件上传中'
        });
        console.log(file.tempFiles);
        var NUMBER = 0;
        setInterval(function () {
          var code;
          if (NUMBER < file.tempFiles.length) {
          wx.login({
            success: function (ress) {
              code = ress.code;
                wx.uploadFile({
                  url: 'https://underwriting.algerfan.cn/underwriting/upload',
                  filePath: file.tempFiles[NUMBER].path,
                  name: 'file',
                  formData: {
                    'encryptedData': encryptedData,
                    'iv': iv,
                    'code': code,
                    'phone': phone
                  },
                  success(res) {
                    NUMBER++;
                    console.log(res);
                    if (NUMBER == file.tempFiles.length){
                      wx.showModal({
                        title: '提示',
                        content: '上传成功',
                        success: function (res) {
                          wx.switchTab({
                            url: "/pages/submit/submit"
                          })
                        }
                      })
                    }
                  }
                })
              
                }
            })
          }
        }, 2000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var encryptedData = options.encryptedData;
    var iv = options.iv;
    var code = options.code;
    var phone = options.phone;
    this.setData({
      encryptedData: encryptedData,
      iv: iv,
      code: code,
      phone:phone
    })
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