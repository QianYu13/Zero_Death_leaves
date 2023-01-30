   //改变窗口大小时调整图片大小
    window.onload = resizeImages;
    window.onresize = resizeImages;
 
    function resizeImages() {
        $(function (e) {
            var screenWeight = document.documentElement.clientWidth;
            var screenHeight = document.documentElement.clientHeight;
            $("[name=pageImg]").css("width", screenWeight).css("height", screenHeight);
            $("#pageUl").css("bottom", screenHeight >> 1);
        });
    }
 
    var index = 1;
    var curIndex = 1;
    var wrap = document.getElementById("wrap");
    var main = document.getElementById("main");
    var hei = document.body.clientHeight;
    wrap.style.height = hei + "px";
    var obj = document.getElementsByTagName("div");
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].className == 'page') {
            obj[i].style.height = hei + "px";
        }
    }
    var pageNum = document.querySelectorAll(".page").length;
    //如果不加时间控制，滚动会过度灵敏，一次翻好几屏
    var startTime = 0, //翻屏起始时间  
        endTime = 1,
        now = 0;
    //浏览器兼容      
    if ((navigator.userAgent.toLowerCase().indexOf("firefox") != -1)) {
        document.addEventListener("DOMMouseScroll", scrollFun, false);
    } else if (document.addEventListener) {
        document.addEventListener("mousewheel", scrollFun, false);
    } else if (document.attachEvent) {
        document.attachEvent("onmousewheel", scrollFun);
    } else {
        document.onmousewheel = scrollFun;
    }
 
    //滚动事件处理函数
    function scrollFun(event) {
        startTime = new Date().getTime();
        var delta = event.detail || (-event.wheelDelta);
        //mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
        //DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动
        if ((endTime - startTime) < -1000) {
            if (delta > 0 && parseInt(main.offsetTop) > -(hei * (pageNum - 1))) {
                //向下滚动
                index++;
                toPage(index);
            }
            if (delta < 0 && parseInt(main.offsetTop) < 0) {
                //向上滚动
                index--;
                toPage(index);
            }
            endTime = new Date().getTime();
        } else {
            event.preventDefault();
        }
    }
 
  
     function toPage(idx) {
        //jquery实现动画效果
        if(idx!=curIndex){
			index=idx
            var delta=idx - curIndex;
            now = now - delta * hei;        
            $("#main").animate({
                top: (now + 'px')
            }, 500);
            curIndex = idx;
            //更改列表的选中项
            $(".pageUlLi").css("color", "black");
            $("#pageUlLi" + idx).css("color", "red");
			
        }
    }