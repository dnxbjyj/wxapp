// pages/monthly-detail/monthly-detail.js
// 引入工具类
var baseUtils = null;
var monthlyUtils = null;

// 初始化Bmob
var Bmob = null;
// 数据库表：monthly
var Monthly = null;

// 记录的ID
var recordId = null;

Page({
  data: {
      monthly:{}
  },
  onLoad: function (options) {
      // 初始化数据
      this.init();
      this.initDetail(options.id);
  },
  // 初始化函数
  init: function () {
      baseUtils = require('../../utils/db/baseUtils.js');
      monthlyUtils = require('../../utils/db/monthlyUtils.js');

      Bmob = require('../../utils/bmob/bmob.js');
      Monthly = Bmob.Object.extend('monthly');
  },
  initDetail:function(id){
      var query = new Bmob.Query(Monthly);

      recordId = id;

      // 根据id查询详情
      var that = this;
      baseUtils.baseSingleQuery(query,id,function(result){
          var monthly = monthlyUtils.buildSingleMonthly(result);
          that.setData({ monthly: monthly});
      })
  },
  onDetailInputDone:function(e){
      // console.log(e.detail.value);
      var query = new Bmob.Query(Monthly);

      // 更新每月记录
      query.get(recordId, {
          success: function (result) {
              result.set('note', e.detail.value);

              // 保存提交修改
              result.save();
          },
          error: function (object, error) {
              console.log('update failed! error code is:' + error.code + ', error message is:' + error.message);
          }
      });

      wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
      })
  }
})