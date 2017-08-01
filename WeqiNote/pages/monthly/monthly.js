// pages/monthly/monthly.js
// 引入工具类
var baseUtils = null;
var monthlyUtils = null;

// 初始化Bmob
var Bmob = null;
// 数据库表：monthly
var Monthly = null;

Page({
  data: {
    // 列表数据
    monthlys:[],
    loadingHidden:true
  },
  onLoad: function (options) {
    // 初始化数据
    this.init();
  },
  // 初始化函数
  init:function(){
    baseUtils = require('../../utils/db/baseUtils.js');
    monthlyUtils = require('../../utils/db/monthlyUtils.js');

    Bmob = require('../../utils/bmob/bmob.js');
    Monthly = Bmob.Object.extend('monthly');

    this.initList();
  },
  // 初始化每月记录列表（从数据库中按start_datetime降序查询）
  initList:function(){
    // 创建一个bmob查询对象
    var query = new Bmob.Query(Monthly);
    query.descending('start_datetime');

    var that = this;
    baseUtils.baseQuery(query,function(results){
      // 对返回结果进行处理
      var monthlys = monthlyUtils.buildMonthlys(results);

      // 设置到data中
      that.setData({ monthlys: monthlys });
    });
  },
  // 下拉刷新监听函数
  onPullDownRefresh:function(){
      this.setData({loadingHidden:false});
      this.initList();
      this.setData({loadingHidden:true});
      wx.stopPullDownRefresh();
  },
  showDetail:function(e){
      // 获取记录的id
      var id = e.currentTarget.id;

      // 跳转到查看每月记录详情页面
      wx.navigateTo({
          url: '../monthly-detail/monthly-detail?id=' + id,
          success:function(){
              console.log('navigateTo monthly-detail page success!');
          },
          fail:function(){
              console.log('navigateTo monthly-detail page fail!');
          }
      })

  },
  // 创建测试数据
  createMonthly:function(){
    for(var i = 0;i < 10;i++){
      // 创建一个单条monthly记录对象
      var monthly = new Monthly();
      monthly.set('start_datetime', new Date(2017,i,16,10,5,38));
      monthly.set('note', '这次来的时候超级疼耶，然后吃了一颗止疼片啦啦啦啦啦啦啦');
      monthly.set('day_from_last_month', 25.78);
      monthly.set('avg_gap_day', 26.34);
      monthly.set('forecast_datetime', new Date(2017, i+1, 16, 10, 5, 38));
      monthly.set('mood_type', 'sad');

      monthlyUtils.createMonthly(monthly);
    }
  }
})