var Bmob = require('../../utils/bmob/bmob.js');
var Diary = Bmob.Object.extend('diary');
Page({
  onLoad:function(){
    wx.setNavigationBarTitle({
      title: '发现'
    });
  },
  insertData:function(){
    for(var i = 0; i < 10; i++){
      var Diary = Bmob.Object.extend('diary');
      var diary = new Diary();
      diary.set('title', 'hello' + i);
      diary.set('content', 'hello No.' + i);

      // 添加数据，第一个入口参数是null
      diary.save(null, {
        success: function (result) {
          // 添加成功，返回成功之后的objectId（注意：返回的属性名称是id，而不是objectId）
          console.log("日记创建成功，objectId:" + result.id);
        },
        error: function (result, error) {
          // 添加失败
          console.log('insert error, code:' + error.code + ', message:' + error.message);
        }
      });
    }
  },
  simpleQueryData:function(){
    // 数据id
    var id = 'a166b08d46';
    var Diary = Bmob.Object.extend('diary');
    var query = new Bmob.Query(Diary);
    query.get(id,{
      success:function(result){
        console.log('result title:' + result.get('title'));
      },
      error:function(result,error){
        console.log('simple query error, code:' + error.code + ', message:' + error.message);
      }
    })
  },
  updateData:function(){
    var id = 'a166b08d46';
    var Diary = Bmob.Object.extend('diary');
    var query = new Bmob.Query(Diary);
    query.get(id,{
      success:function(result){
        result.set('content','这是新的内容');
        result.save();
      },
      error:function(result,error){
        console.log('update error, code:' + error.code + ', message:' + error.message);
      }
    })
  },
  deleteData:function(){
    var id = 'a166b08d46';
    var Diary = Bmob.Object.extend('diary');
    var query = new Bmob.Query(Diary);
    query.get(id,{
      success:function(object){
        object.destroy({
          success:function(deleteObject){
            console.log('delete success!');
            console.log(deleteObject);
          },
          error:function(object,error){
            console.log('delete error, code:' + error.code + ', message:' + error.message);
          }
        })
      },
      error:function(object,error){
        console.log('query error, code:' + error.code + ', message:' + error.message);
      }
    })
  },
  // 查询的公共方法
  baseFind:function(query){
    query.find({
      success: function (results) {
        console.log('一共查询到' + results.length + '条数据');
        for (var i = 0; i < results.length; i++) {
          var obj = results[i];
          console.log(obj.id + ':' + obj.get('title'));
        }
      },
      error: function (error) {
        console.log('baseFind error, code:' + error.code + ', message:' + error.message);
      }
    })
  },
  findData:function(){
    var query = new Bmob.Query(Diary);
    this.baseFind(query);
  },
  findDataByCond1:function(){
    var query = new Bmob.Query(Diary);
    query.equalTo('title','hello4');
    this.baseFind(query);
  },
  findByPage:function(){
    var query = new Bmob.Query(Diary);
    // 对查询结果按title排序
    query.ascending('title');
    // 从第4条记录开始
    query.skip(3);
    // 查5条数据
    query.limit(5);
    this.baseFind(query);
  },
  findItem:function(){
    var query = new Bmob.Query(Diary);
    query.select('title');
    query.find().then(function(results){
      console.log(results);
    })
  },
  orFind:function(){
    var query1 = new Bmob.Query(Diary);
    query1.equalTo('title','hello4');
    var query2 = new Bmob.Query(Diary);
    query2.containedIn('title',['hello0','hello3']);
    var mainQuery = Bmob.Query.or(query1,query2);
    this.baseFind(mainQuery);
    mainQuery.count({
      success:function(count){
        console.log('共有' + count + '条数据');
      },
      error:function(error){
        console.log(error);
      }
    });
  }
})