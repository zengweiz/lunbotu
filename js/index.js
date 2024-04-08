(function () {
    
    //首先，获取需要的dom
    var wrapperDom = document.querySelector('.wrapper');
    var listDom = document.querySelector('.list');//获取要移动的ul
    var itemDom = listDom.getElementsByClassName('item');//获取ul下所有的li
    //获取左右两侧按钮
    var leftBtnDom = document.querySelector('.left-btn');
    var rightBtnDom = document.querySelector('.right-btn');
    //获取下面按钮
    var indicatorDom = document.querySelector('.indicator');
    var temp = false;
    var obj = {
        from: 0,
        to: 0,
        tatolDuration: 400,
        duration: 10,
        onmove: function (n) {
            listDom.style.marginLeft = n + 'px';
        },
        end: function () {
            temp = false;
            
        }
    };
    var corIndex = 0;//用来记录下标
    var timer = null;
    var duration = 2000;//每2000毫秒轮播一次

    function init() {//初始化页面
        var li = itemDom[0].cloneNode(true);
        listDom.appendChild(li);//复制第一个li，放到最后一个

        //根据图片的数量循环来创建下面按钮
        for(var i = 0; i < itemDom.length - 1; i ++){
            var li  = document.createElement('li');
            indicatorDom.appendChild(li);
        }
        indicatorDom.querySelector('li').classList.add('active');

        //自动轮播
        timer = setInterval(function () {
            onClickLeft();
        }, duration)
    }
    init();

    var liItemDom = indicatorDom.querySelectorAll('li');//获取下面所有的按钮集合
    
    //获得ul的宽度 = 容器的宽度 * li的数量
    var ulWidth = itemDom[0].offsetWidth * itemDom.length;
    listDom.style.width = ulWidth + 'px';

    //给左右两侧按钮注册事件
    leftBtnDom.addEventListener('click',onClickLeft);
    rightBtnDom.addEventListener('click',onClickRight);
    function onClickLeft() {//左侧按钮
        if(temp){
            return;
        }
        temp = true;
        // console.log(corIndex)
        if(corIndex === itemDom.length - 1){
            listDom.style.marginLeft = 0;
            obj.from = 0;
            obj.to = 0;
            corIndex = 0;
        }
        
        corIndex++;
        obj.from = obj.to;
        obj.to = corIndex * -itemDom[0].offsetWidth;//算出每次移动的距离
        createDistance(obj);

        //让下面按钮随着图片的移动而将对应的active样式选中
        for(var i = 0; i < liItemDom.length; i ++){
            liItemDom[i].classList.remove('active');
        }
        if(corIndex === itemDom.length - 1){//判断图片是否是最后一张，如果是则给第一个加上加上active样式
            liItemDom[0].classList.add('active');
        }else{
            liItemDom[corIndex].classList.add('active');
        }
        
        
    }

    //右侧按钮
    function onClickRight() {
        if(temp){
            return;
        }
        temp = true;
        if(corIndex === 0){//如果当前图片是第一张，则立马切换到最后一张
            listDom.style.marginLeft = -itemDom[0].offsetWidth * (itemDom.length - 1);
            obj.from = -itemDom[0].offsetWidth * (itemDom.length - 1);
            obj.to = -itemDom[0].offsetWidth * (itemDom.length - 1);
            corIndex = itemDom.length - 1;//然后将下标变为最大值
        }
        corIndex --;
        obj.from = obj.to;
        obj.to = corIndex * -itemDom[0].offsetWidth;
        createDistance(obj);

        //让下面按钮随着图片的移动而将对应的active样式选中
        for(var i = 0; i < liItemDom.length; i ++){
            liItemDom[i].classList.remove('active');
        }
        if(corIndex === itemDom.length - 1){//向右点击时，判断图片是否是第一张，如果是则给最后一个加上active样式
            liItemDom[liItemDom.length-1].classList.add('active');
        }else{
            liItemDom[corIndex].classList.add('active');
        }
    }

    //下面按钮事件
    liItemDom.forEach(function (node,index) {
        node.onclick = function () {
            if(temp){
                return;
            }
            temp = true;
            for(var i = 0; i < liItemDom.length; i ++){
                liItemDom[i].classList.remove('active');
            }
            corIndex = index;
            liItemDom[corIndex].classList.add('active');

            obj.from = obj.to;
            obj.to = corIndex * -itemDom[0].offsetWidth;
            createDistance(obj);
        }
        
    })

    
    //鼠标移入自动轮播移出事件
    wrapperDom.addEventListener('mouseenter',function () {
        clearInterval(timer);
    })
    //移出事件
    wrapperDom.addEventListener('mouseleave',function () {
        timer = setInterval(function () {
            onClickLeft();
        },duration)
    })

})()