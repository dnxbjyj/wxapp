var movieUtil = require("../../utils/movieUtil.js");
Page({
    data:{
      movies: [],
      loadingHidden: false
    },
    onLoad: function () {
      wx.setNavigationBarTitle({
        title: '推荐电影'
      });
      // 1. 加载电影数据
      this.loadMovie();
    },
    onPullDownRefresh: function () {
      this.setData({ loadingHidden: false });
      this.loadMovie();
      wx.stopPullDownRefresh();
    },
    // 调豆瓣API，获取top电影
    loadMovie: function () {
      var page = this;

      wx.request({
        url: 'https://api.douban.com/v2/movie/top250',
        header: {
          'Content-Type': 'json'
        },
        data:{
          'start':0,
          'count':25
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