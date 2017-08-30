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
        this.rightStop();
        this.leftStop();

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
        this.rightStop();
        if (this.leftInterval && this.leftInterval != 0) {
            this.leftStop();
            return;
        }
    
        var animationLeft = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        this.animationLeft = animationLeft;
        animationLeft.rotate(this.leftMove += 100).step();

        this.setData({
            leftAnimationData: animationLeft.export()
        });

        var page = this;
        // 定时器,第一个参数是一个函数，第二个参数是一个时间（毫秒）
        var leftInterval = setInterval(function(){
            animationLeft.rotate(page.leftMove += 100).step();

            page.setData({
                leftAnimationData: animationLeft.export()
            });
        },1000);

        this.leftInterval = leftInterval;
    },
    leftStop:function(){
        if(this.leftInterval && this.leftInterval != 0)
        {
            clearInterval(this.leftInterval);
        }
        this.leftInterval = 0;
    },
    rightStart:function(){
        this.leftStop();
        if (this.rightInterval && this.rightInterval != 0) {
            this.rightStop();
            return;
        }

        var animationRight = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        this.animationRight = animationRight;
        animationRight.rotate(this.rightMove += 100).step();

        this.setData({
            rightAnimationData: animationRight.export()
        });

        var page = this;
        // 定时器,第一个参数是一个函数，第二个参数是一个时间（毫秒）
        var rightInterval = setInterval(function () {
            animationRight.rotate(page.leftMove += 100).step();

            page.setData({
                rightAnimationData: animationRight.export()
            });
        }, 1000);

        this.rightInterval = rightInterval;
    },
    rightStop:function(){
        if (this.rightInterval && this.rightInterval != 0) {
            clearInterval(this.rightInterval);
        }
        this.rightInterval = 0;
    }
})