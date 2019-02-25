// pages/test1/test1.js

//橙色倒计时窗体
/** 
 * 需要一个目标日期，初始化时，先得出到当前时间还有剩余多少秒
 * 1.将秒数换成格式化输出为XX天XX小时XX分钟XX秒 XX
 * 2.提供一个时钟，每10ms运行一次，渲染时钟，再总ms数自减10
 * 3.剩余的秒次为零时，return，给出tips提示说，已经截止
 */

// 定义一个总毫秒数，以一分钟为例。TODO，传入一个时间点，转换成总毫秒数
var total_micro_second = 10 * 1000;
var total_micro_second_2 = 4 * 1000;

/* 毫秒级倒计时 时钟1 */
function count_down(that) {
  // 渲染倒计时时钟
  that.setData({
    clock: date_format(total_micro_second)
  });

  if (total_micro_second <= 0) {
    that.setData({
      clock: "时间到！"
    });
    // timeout则跳出递归
    return;
  }
  setTimeout(function () {
    // 放在最后--
    total_micro_second -= 10;
    count_down(that);
  }
    , 10)
}

/* 毫秒级倒计时  时钟2 */
function count_down_2(that) {
  // 渲染倒计时时钟
  that.setData({
    clock_2: date_format_2(total_micro_second_2)
  });

  if (total_micro_second_2 <= 0) {
    that.setData({
      clock_2: "时间到！",
      hidden_num1:false,
      hidden_num2:true,
    });
    // timeout则跳出递归
    // 开始倒吸的倒计时
    count_down(that);
    return;
  }
  setTimeout(function () {
    // 放在最后--
    total_micro_second_2 -= 10;
    count_down_2(that);
  }
    , 10)
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次   时钟1
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

  return min + ":" + sec + " " + micro_sec;
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次   时钟2
function date_format_2(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix_2(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix_2((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix_2(Math.floor((micro_second % 1000) / 10));

  return sec 
}


// 位数不足补零 时钟1
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}

// 位数不足补零 时钟2
function fill_zero_prefix_2(num) {
  return num 
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,

    count_num:0,
    start_num:0,//当开始游戏的时候，设置为1
    timer: '',//定时器名字
    countDownNum: '10',//倒计时初始值

    clock: '00:00 00',
    clock_2:'准备倒计时！',

    hidden_num1:true,//控制显示10秒倒计时text
    hidden_num2:false,//控制显示3秒游戏开始倒计时text
  },


  //其中一个时钟函数
  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
          that.setData({
            start_num:-1
          })
        }
      }, 1000)
    })
  },


  test_function: function (options){
    wx.navigateTo({

    })
  },

  test_function2:function(options){
    let that=this;
      that.data.num +=1;
      that.setData({
        num:that.data.num
      })
  },

  //抢 按钮函数
  test_function2_test2: function () {
    let that = this;
    let clock = that.data.clock;
    let clock_2 = that.data.clock_2;
    console.log(clock);
    if (clock == '00:00 00'&&clock_2=='准备倒计时！') {
      wx.showToast({
        title: '请先开始游戏！',
        duration: 1000
      })
    };
    if (clock === "时间到！") {
      wx.showToast({
        title: '游戏已结束！',
        duration: 1500
      })
    };
    if (clock != '00:00 00' && clock != "时间到！") {
      that.data.num += 1;
      that.setData({
        num: that.data.num
      })
    };

  },


  //攻略按钮函数
  test_function_4: function (options) {
    wx.navigateTo({
      url: '../test4/test4',
    })
  },

  //开始游戏按钮函数
  test_function5_2: function (options) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '是否开始游戏倒计时',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('用户点击确定');
          that.setData({
            num: 0,
            clock:"00:00 00",
            clock_2:"准备倒计时！",
            hidden_num1:true,
            hidden_num2:false,
          })
          total_micro_second_2 = 4 * 1000;
          total_micro_second = 10 * 1000;
          count_down_2(that);
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
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