Page({
  /**
   * 页面的初始数据
   */
  data: {
    configs:{},
    actionSheetItems:['aaa'],
    title:"000",
    desc:"111",
    leftAnimationData:{},
    rightAnimationData:{}
  },
  leftMove:0,
  rightMove:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var configs = wx.getStorageSync('configs');
    this.setData({configs:configs});

    var actionSheetItems = [];
    for(var i in configs){
        var config = configs[i];
        if(config.state){
            actionSheetItems.push(config.name);
        }
    };
    this.setData({actionSheetItems:actionSheetItems});
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var configs = wx.getStorageSync('configs');
    var actionSheetItems = [];
    var first = true;
    for(var i in configs){
        var config = configs[i];
        if(config.state){
            if(first){
                var desc = config.desc.replace(/\$\{time\}/g,config.time);
                this.setData({title:config.name,desc:desc});
                first = false;
            }
            actionSheetItems.push(config.name);
        }
    };
    this.setData({actionSheetItems:actionSheetItems});
  },
  actionSheetTap:function(){
    var that = this;
    wx.showActionSheet({
        itemList: that.data.actionSheetItems,
        success: function(res) {
            var tapIndex = res.tapIndex;
            var index = 0;
            var configs = wx.getStorageSync('configs');
            for(var id in configs){
                var config = configs[id];
                if(!config.state){
                    continue;
                }
                if(index == tapIndex){
                    var desc = config.desc.replace(/\$\{time\}/g,config.time);
                    that.setData({title:config.name,desc:desc});
                    break;
                }
                index ++;
            };
        },
        fail: function(res) {
            console.log(res.errMsg)
        }
    });
  },
  leftStart:function(){
    var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease'
    });
    this.animation = animation;
    animation.rotate(this.leftMove += 100).step();

    this.setData({
      leftAnimationData:animation.export()
    });
  },
  rightStart:function(){
    var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease'
    });
    this.animation = animation;
    animation.rotate(this.rightMove += 100).step();

    this.setData({
      rightAnimationData:animation.export()
    });
  }
})