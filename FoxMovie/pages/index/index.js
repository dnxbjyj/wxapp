var movieUtil = require("../../utils/movieUtil.js");
Page({
  data:{
    imgUrls: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    movies:[],
    loadingHidden:false
  },
  onLoad:function(){
    // 1. 加载电影数据
    this.loadMovie();
  },
  onPullDownRefresh:function(){
    this.setData({ loadingHidden:false});
    this.loadMovie();
    wx.stopPullDownRefresh();
  },
  // 调豆瓣API，获取当前正在热映电影
  loadMovie: function() {
    var page = this;

    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters',
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var subjects = res.data.subjects;
        // 组装电影的info字符串
        movieUtil.buildSubjects(subjects);
        page.setData({ movies: subjects, loadingHidden: true });
      }
    });
  },
  // 查询电影详情响应函数
  detail: function (e) {
    var movieId = e.currentTarget.dataset.id;
    movieUtil.showDetail(movieId);
  }
})