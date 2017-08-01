//app.js
// 日期时间工具类
var dateUtils = null;

// 初始化Bmob全局配置
var Bmob = null;

App({
  onLaunch: function () {
    // 全局初始化方法
    this.init();
  },
  init:function(){
      dateUtils = require('utils/datetime/dateUtils.js');

      // 为Date类添加格式化方法
      Date.prototype.format = dateUtils.format;

      // 初始化Bmob
      Bmob = require('utils/bmob/bmob.js');
      Bmob.initialize('xxx', 'xxx');
  }
})