var baseUtils = require('baseUtils.js');

// 创建每月记录
function createMonthly(monthly){
    baseUtils.baseCreate(monthly);
}

// 处理每月记录的单个查询结果
function buildSingleMonthly(result){
    var monthly = {}
    monthly.id = result.id;
    monthly.createdAt = result.createdAt;
    monthly.updatedAt = result.updatedAt;
    monthly.start_datetime = new Date(result.get('start_datetime')).format('yyyy-MM-dd hh:mm');
    monthly.forecast_datetime = new Date(result.get('forecast_datetime')).format('yyyy-MM-dd hh:mm');
    monthly.day_from_last_month = result.get('day_from_last_month');
    monthly.avg_gap_day = result.get('avg_gap_day');
    monthly.mood_type = result.get('mood_type');
    monthly.note = result.get('note');
    monthly.year_month = new Date(result.get('start_datetime')).format('yyyy/MM');

    return monthly;
}

// 处理每月记录的列表查询结果
function buildMonthlys(results){
    var monthlys = []
    for (var i = 0; i < results.length; i++) {
        var result = results[i];
        var monthly = buildSingleMonthly(result);
        
        monthlys[i] = monthly;
    }

    return monthlys;
}

module.exports = {
  createMonthly: createMonthly,
  buildSingleMonthly: buildSingleMonthly,
  buildMonthlys: buildMonthlys
}