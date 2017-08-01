// 组装电影的info字符串
function buildSubjects(subjects) {
  for (var subject of subjects) {
    buildSubject(subject);
  }
}

// 组装电影的info字符串，单个电影，格式："速度与激情8导演：马克思\n主演：张三 / 李四\n类型：剧情 / 犯罪\n上映年份：2017（中国大陆）\n豆瓣评分：8.3"
function buildSubject(subject) {
  // 0. 获取电影名
  var movieName = subject.title;

  // 1. 获取导演列表
  var directors = subject.directors;
  var directorsStr = '';
  for (var director of directors) {
    directorsStr = directorsStr + director.name + ' / ';
  }
  // 去掉最后多余的' / '
  directorsStr = directorsStr.substring(0, directorsStr.length - 3);

  // 2. 获取主演列表
  var casts = subject.casts;
  var castsStr = '';
  for (var cast of casts) {
    castsStr = castsStr + cast.name + ' / ';
  }
  // 去掉最后多余的' / '
  castsStr = castsStr.substring(0, castsStr.length - 3);

  // 3. 获取类型列表
  var genres = subject.genres;
  var genresStr = '';
  for (var genre of genres) {
    genresStr = genresStr + genre + ' / ';
  }
  // 去掉最后多余的' / '
  genresStr = genresStr.substring(0, genresStr.length - 3);

  // 4. 获取上映年份
  var year = subject.year;

  // 5. 获取豆瓣评分
  var rating = subject.rating.average;

  // 6. 拼接上述信息
  var infoText = movieName + '\n导演：' + directorsStr + '\n主演：' + castsStr + '\n类型：' + genresStr + '\n上映年份：' + year + '\n豆瓣评分：' + rating;

  // 7. 设置info到subject
  subject.infoText = infoText;
}

// 跳转到电影详情页面
function showDetail(movieId){
  wx.navigateTo({
    url: '../detail/detail?id=' + movieId
  });
}

// 导出公开的方法
module.exports = {
  buildSubjects: buildSubjects,
  buildSubject: buildSubject,
  showDetail: showDetail
}
