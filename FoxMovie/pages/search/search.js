var movieUtil = require("../../utils/movieUtil.js");
Page({
  data:{
    movies:[],
    loadingHidden:true,
    searchKeyWord:''
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '搜索电影'
    });
  },
  bindKeyInput:function(e){
    this.setData({ searchKeyWord:e.detail.value});
  },
  search:function(){
    // 点击查询按钮时，如果输入框输入的内容是空，给出提示
    if (this.data.searchKeyWord == ''){
      wx.showModal({
        title: '提示',
        content: '输入的内容是空的呦~请输入一些关键词查询，如：周星驰',
        showCancel:false,
      })
    }

    // 根据关键词查询
    this.loadMovie();
  },
  // 调豆瓣API，查询电影
  loadMovie: function () {
    var page = this;
    page.setData({ loadingHidden: false});
    wx.request({
      url: 'https://api.douban.com/v2/movie/search',
      header: {
        'Content-Type': 'json'
      },
      data:{
        'q': page.data.searchKeyWord
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
  detail:function(e){
    var movieId = e.currentTarget.dataset.id;
    movieUtil.showDetail(movieId);
  }
})