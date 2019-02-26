// pages/test4/test4.js
 var app=getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    gender:"",
    language:"",
    city:"",
    province:"",
    country:"",

    data:'',
    max_goal:'',
  },

  bindgetuserinfo: function (e) {
    let that = this;
    if (e.detail.userInfo) {
      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo)
                //用户已经授权过
                that.setData(
                  {
                    nickName: res.userInfo.nickName,
                    gender: res.userInfo.gender,
                    language: res.userInfo.language,
                    city: res.userInfo.city,
                    province: res.userInfo.province,
                    country: res.userInfo.country,
                  }
                )
              }
            })
          }
        }
      })
    }else {
      //用户按了拒绝按钮
      console.log(333, '执行到这里，说明拒绝了授权')
      wx.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: 'none',
        duration: 2000
      });
    }
  },


  //数据库测试按钮
  data_test(){
    let that =this;
    const db=wx.cloud.database();
    db.collection('test_data').where({
      _openid: app.globalData.openid,
    })
      .get({
        success(res) {
          that.setData({
            data:res.data
          })
        }
      })
  },

  //数据库最大值测试按钮
  data_max_test(){
    let that =this;
    //获取用户各次分数
    var max_goal=that.data['data'][0]['goal']
    for (var index in that.data['data']) {
      console.log(that.data.data[index]['goal'])
      var mid_goal = that.data.data[index]['goal']
      if(mid_goal >= max_goal){
        max_goal=mid_goal
      }
    }
    that.setData({
      max_goal:max_goal,
    })
    console.log(max_goal)
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