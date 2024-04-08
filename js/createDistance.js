//封装一个函数createDistance()

/**
 * 
 * @param {Object} obj{
 * from: xx,//运动起点   必传
 * to: xx,//运动终点    必传
 * tatolDuration: xxx,//运动总时间
 * duration: xxx,//每次移动一小段距离的时间
 * onmove: function (n) {},//每次运动将新的值传进来，具体做什么自己决定
 * end: function () {},//整个运动结束运行这个函数
 * 
 * } //传进来一个对象，这个对象包含你要如何运动的信息描述
 * 
 */
function createDistance(obj) {
    var from = obj.from;
    var to = obj.to;
    var tatolDuration = obj.tatolDuration || 500;
    var duration = obj.duration || 10;
    //
    var times = Math.floor(tatolDuration / duration);//求出每duration时间移动的距离
    var dis = (to - from) / times;
    var corIndex = 0;
    var timerId = setInterval(function () {
        from += dis;
        corIndex ++;
        if(corIndex === times){
            clearInterval(timerId);
            obj.onmove(from);
            obj.end && obj.end();
            return;
        }

        obj.onmove(from);
    }, duration)
}