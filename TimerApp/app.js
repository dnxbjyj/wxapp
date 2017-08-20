//app.js
App({
  onLaunch: function() {
    // 从缓存中读取配置信息
    var configs = wx.getStorageSync('configs');
    if(!configs)
    {
        configs = this.initConfigs();
    }

    // 把初始化的配置信息放在缓存中
    wx.setStorageSync('configs', configs);
  },
  // 初始化配置信息
  initConfigs:function(){
    var configs = new Object();

    var config1 = new Object();
    config1.id = 'config1';
    config1.name = '立论阶段';
    config1.state = true;
    config1.time = 180;
    config1.voice = 15;
    config1.desc = '\n（一）正方一辩开篇立论，${time}秒\n（二）反方一辩开篇立论，${time}秒';
    configs.config1 = config1;

    var config2 = new Object();
    config2.id = 'config2';
    config2.name = '驳立论';
    config2.state = true;
    config2.time = 120;
    config2.voice = 15;
    config2.desc = '\n驳立论，${time}秒';
    configs.config2 = config2;

    var config3 = new Object();
    config3.id = 'config3';
    config3.name = '质辩阶段';
    config3.state = true;
    config3.time = 90;
    config3.voice = 15;
    config3.desc = '\n质辩阶段，${time}秒';
    configs.config3 = config3;

    var config4 = new Object();
    config4.id = 'config4';
    config4.name = '自由辩论';
    config4.state = true;
    config4.time = 240;
    config4.voice = 15;
    config4.desc = '\n（一）自由辩论，${time}秒';
    configs.config4 = config4;

    var config5 = new Object();
    config5.id = 'config5';
    config5.name = '总结陈词';
    config5.state = true;
    config5.time = 180;
    config5.voice = 15;
    config5.desc = '\n总结陈词，${time}秒';
    configs.config5 = config5;

    return configs;
  }
})
