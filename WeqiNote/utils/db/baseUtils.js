// 基本创建函数
function baseCreate(bmobObj){
  bmobObj.save(null, {
    success: function (result) {
      console.log('baseCreate success! data id is:' + result.id);
    },
    error: function (object, error) {
      console.log('baseCreate failed! code:' + error.code + ', message:' + error.message);
    }
  })
}

// 基本查询函数（根据id查询单条记录）
// callback为查询成功后的回调函数
function baseSingleQuery(bmobQuery,id,callback){
    bmobQuery.get(id,{
        success:function(result){
            console.log('baseSingleQuery success! id is:' + result.id);
            callback(result);
        }
    })
}

// 基本查询函数（查询列表）
// callback为查询成功后的回调函数
function baseQuery(bmobQuery,callback){
  bmobQuery.find({
    success:function(results){
      console.log('baseQuery method, get ' + results.length + ' pieces of datas.');
      callback(results);
    },
    error: function (error) {
      console.log('baseQuery failed! code:' + error.code + ', message:' + error.message);
    }
  });
}

module.exports = {
  baseCreate: baseCreate,
  baseSingleQuery: baseSingleQuery,
  baseQuery: baseQuery
}