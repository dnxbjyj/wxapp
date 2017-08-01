var movieUtil = require("../../utils/movieUtil.js");
Page({
  data: {
    movie:{},
    loadingHidden:false
  },
  onLoad: function (options) {
    // 获取电影id
    var movieId = options.id;
    wx.setNavigationBarTitle({
      title: '详情'
    });
    this.loadMovie(movieId);
  },
  // 调豆瓣API，获取当前的电影的详情
  loadMovie: function (movieId) {
    var page = this;

    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/' + movieId,
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var subject = res.data;
        // 组装电影的info字符串
        movieUtil.buildSubject(subject);
        page.setData({ movie: subject, loadingHidden: true });
      }
    });
  }
})