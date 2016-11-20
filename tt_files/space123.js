
$( document ).on("touchmove",function(e){
    e.preventDefault();
})


function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

var isMobile = {
    Weixin: function () {
        return (/micromessenger/i.test(navigator.userAgent.toLowerCase()));
    },
    App: function () {
        return (/didi.passenger/i.test(navigator.userAgent.toLowerCase()));
    }
};
var AGENT
if( isMobile.Weixin() ) {
    AGENT = 'weixin'
} else {
    if ( isMobile.App() ) {
        AGENT = 'didiApp'
    } else {
        AGENT = 'other'
    }
}

function hengshuping(){
    if(window.orientation==180||window.orientation==0){
        // alert('竖屏状态！', window.orientation)
        $(".bodyCont").show();
        $(".VerticalS").hide();
    }
    if(window.orientation==90||window.orientation==-90){
        //alert('横屏状态！', window.orientation)
        $(".bodyCont").hide();
        $(".VerticalS").show();
    }
}
hengshuping();
window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', hengshuping, false);

var audioOn = true;
var audio = $("#auDio0")[0];
$(".music").on("tap", function() {
    if (audioOn) {
        audio.pause();
        $(this).addClass("stop");
    }else {
        audio.play();
        $(this).removeClass("stop");
    }
    audioOn = !audioOn;
});

myVid=document.getElementById("auDio0");
function hasVidEnded(){
    if( myVid.ended == true ){
        audio.play();
    } else {
        audio.play();
    }
    //alert(myVid.ended);
}
//hasVidEnded();

function autoPlay(){
    if (audioOn) {
        audio.play();
        $(".music").removeClass("stop");
    }
    $("body").off("touchstart",autoPlay);
};

//浏览器不自动循环播放fix
$("body").on("touchstart",autoPlay);


var img = [
    "tt_files/loading.gif",
    "tt_files/letter1.png",
    "tt_files/letter2.png",
    "tt_files/letter3.png",
    "tt_files/letter4.png",
    "tt_files/letter5.png",
    "tt_files/letter6.png",
    "tt_files/letter7.png",
    "tt_files/letter8.png",
    "tt_files/letter9.png",
    "tt_files/letter10.png",
    "tt_files/letter11.png",
    "tt_files/light.png",
    "tt_files/light1.png",
    "tt_files/light4.png",
    "tt_files/light5.png",
    "tt_files/light6.png",
    "tt_files/light7.png",
    "tt_files/heart.png",
    "tt_files/hj.png",
    "tt_files/hj1.png",
    "tt_files/hj2.png",
    "tt_files/jt_s.png",
    "tt_files/jt_x.png",
    "tt_files/m_star.png",
    "tt_files/logo.png",
    "tt_files/m_stop.png",
    "tt_files/mark1.png",
    "tt_files/mark2.png",
    "tt_files/moon.png",
    "tt_files/naozi.png",
    "tt_files/peo.png",
    "tt_files/qiu.png",
    "tt_files/qiu1.png",
    "tt_files/qiu2.png",
    "tt_files/1.png",
    "tt_files/2.png",
    "tt_files/3.png",
    "tt_files/4.png",
    "tt_files/5.png",
    "tt_files/6.png",
    "tt_files/7.png",
    "tt_files/8.png",
    "tt_files/9.png",
    "tt_files/10.png",
    "tt_files/bj0.jpg"
];
var desc = '颤抖吧地球人，我加入了一个神秘太空组织，就要去太空玩耍了';

var $loadingbar = $( ".loadFont" );
/**
 * 加载中进度条改变的函数
 */
function changeBar(text){
    $loadingbar.text(text);
}

/**
 * 执行加载数组图片
 */

window.loadImages(img,function(loaded,len){
    //执行单个图片后做的回调
    var text = parseInt(loaded/len *100)  + "%";
    changeBar(text);
},function(){
    //图片全部加载完之后做的回调
    var timer = setTimeout(function(){
        $(".loadBox").hide();
        $(".fixedBox,#wrap").show();
        hasVidEnded();
    });
});

document.querySelector('.loadGif').src='images/loading.gif?v='+new Date().getTime();

//随机出现的状态
function randomInt(min,max){
    return Math.floor(Math.random()*(max-min +1)+min);
}

var count = 0;
function doEventNoCode(){
    count = randomInt(0, 3);
    var $page = $(".noCode .fontBox").find(".fontL"+ count );
    $page.addClass("light").siblings().removeClass("light");
}

function doEventCode(){
    count = randomInt(0, 5);
    var $page = $(".zcCode .fontBox").find(".fontL"+ count );
    $page.addClass("light").siblings().removeClass("light");
}

$(".noCode .hybBtn").tap(function(){
    doEventNoCode();
});
$(".zcCode .hybBtn").tap(function(){
    doEventCode();
});

$(".guess").tap(function(){
    $(this).parents(".page").removeClass("on");
    $(this).parents("#wrap > div").animate({translateY : (-1000)+"%"});
    $("#wrap > div:nth-child(1) .page11").addClass("on");
    $(".guide,.jtBox,.bigCriDiv").hide();
});

/*点击提交表单每一个li，吧对应的输入在表单里*/
$(".fontL li").tap(function(){
    var text = $(this).text();
    console.log(text);
    $(this).parents(".fontBox").siblings(".inputBox").find(".inputs").val(text);
});

//提交并分享按钮操作
$(".sub").tap(function(){

    var name = $.trim($(this).parents(".subBox").siblings(".resultTop").find(".inputs").val());
    if( name == "" ){
        alert("请输入你的猜想");
        return;
    }
    $(".shareBox").show();
    $(".shareBox").show();

    if ("undefined" != typeof DidiJSBridge) {
        var e = {
            share_url: link,
            share_icon_url: 'http://static.galileo.xiaojukeji.com/static/tms/other/z/space_BOX/Xing_space/images/share.jpg',
            share_img_url: 'http://static.galileo.xiaojukeji.com/static/tms/other/z/Xing_space/Xing_space/images/share.jpg',
            share_title:'滴滴空间计划，星际探索终极猜想',
            share_content: '颤抖吧地球人，我加入了一个神秘太空组织，就要去太空玩耍了',
            share_from: "滴滴出行"
        };

        var i = function() {
        };

        var n = {
            entrance: {
                icon: "http://static.xiaojukeji.com/api/img/i-webview-entrance.png"
            },
            buttons: [{
                type: "share_weixin_timeline",
                name: "微信朋友圈",
                data: e,
                callback: i
            }, {
                type: "share_weixin_appmsg",
                name: "微信好友",
                data: e,
                callback: i
            }]
        };

        "undefined" != typeof DidiJSBridge ? (DidiJSBridge.callHandler("init_entrance", n),
            DidiJSBridge.callHandler("show_entrance"),
            DidiJSBridge.callHandler("invoke_entrance")) : document.addEventListener("DidiJSBridgeReady", function() {
                DidiJSBridge.callHandler("init_entrance", n),
                    DidiJSBridge.callHandler("show_entrance"),
                    DidiJSBridge.callHandler("invoke_entrance")
            }
            , !1)
    } else {
        desc = '颤抖吧地球人，我加入了一个神秘太空组织，就要去太空玩耍了';
        doShare(name);
    }
    var shareSucc = new Image()
    shareSucc.src = 'http://commlog.diditaxi.com.cn/collectlog?server_log_keystr=pbs_tms_didikongjian_click&timestamp=' + new Date().getTime() + '&channel=' + AGENT + '&action_name=share'
});

//再来一次按钮
$(".agin").tap(function(){
    window.location.reload();
});

$(".shareBox").tap(function(){
    $(this).hide();
});

$(".fixedBox").swipeUp(function(){
    $("#wrap").children("div").animate({
        translateY : (-100)+"%"
    });
    $(".bigCriDiv").animate({"width": "13%","top": "17%", "left": "6.5%"},300,function(){$(".fixed_5").hide();});
    $(".img").animate({"width": "45px", "height": "45px"},300);
    $("#wrap > div").find(".page1").removeClass("on");
    $("#wrap > div").find(".page3").addClass("on");
});

$( "#wrap" ).swipeUp(function(){

    if( $( this ).find( ".on" ).next().length == 0 ) return;
    var index = $( this ).find( ".on" ).next().index();

    if( $( this ).find( ".page9" ).hasClass("on") ){
        $(".guide,.jtBox,.bigCriDiv").hide();
    }
    $( this ).find( ".on" ).animate({
        opacity: 0
    },300);

    $( this ).children("div").animate({
        translateY : (-index*100)+"%"
    },function(){
        $( this ).find( ".on" ).next().addClass("on").siblings().removeClass("on");
        $(".guide ul li").eq(index).addClass("on").siblings().removeClass("on");
        $(".guide .fk").animate({top: (3 + (index*9))+ "%"});
    });
    $(".bigCriDiv").animate({"width": "13%","top": "17%", "left": "6.5%"},300,function(){$(".fixed_5").hide();});
    $(".img").animate({"width": "45px", "height": "45px"},300);

}).swipeDown(function(){
    if( $( this ).find( ".on" ).prev().length == 0 ) return;
    var index = $( this ).find( ".on" ).prev().index();

    $( this ).find( ".on" ).prev().animate({
        opacity: 1
    },300);

    $( this ).children("div").animate({
        translateY : (-index*100)+"%"
    },function(){
        $( this ).find( ".on" ).prev().addClass("on").siblings().removeClass("on");
        $(".guide ul li").eq(index).addClass("on").siblings().removeClass("on");
        $(".guide .fk").animate({top: (3 + (index*9))+ "%"});
        if( $(".page1").hasClass("on") ){
            $(".bigCriDiv").animate({"width": "42%","top": "28%", "left": "29%"},500,function(){$(".fixed_5").show();});
            $(".img").animate({"width": "10rem", "height": "10rem"},500);
        }
    });
    if( $( this ).find( ".page11" ).hasClass("on") ){
        $(".guide,.jtBox,.bigCriDiv").show();
    }
});

var PV_post = new Image()
var link_src = 'http://commlog.diditaxi.com.cn/collectlog?server_log_keystr=pbs_tms_didikongjian_pv&timestamp=' + new Date().getTime() + '&channel=' + AGENT + '&cookie_id=' + uuid();
PV_post.src = link_src



var link = null;

//获取地址栏信息并判断是否第一次进入
function shareOnce(){
    var str=location.href; //取得整个地址栏
    var num=str.indexOf("?");
    if(num == -1){
        link = location.href + '?share=true';
        $(".resultBox .zcCode").addClass("show");
        $(".resultBox .noCode").removeClass("show");
    }else{
        $(".resultBox .zcCode").removeClass("show");
        $(".resultBox .noCode").addClass("show");
    }
}
shareOnce();

var prefix = 'http://static.galileo.xiaojukeji.com/static/tms/other/z/Xing_space/Xing_space/'

var shareObj = [
    {
        imgUrl: 'images/share.jpg',
        title: '#{name}'
    }
]


var count1 = randomInt(0, 2);
var sharContent = [
    {
        name : "《我猜中了开头，可是我猜不着这结局》",
        content : "你们城里人真会玩，看到真相的我眼泪就掉下来……"
    },
    {
        name : "《再见了小伙伴，我就要去太空玩耍了》",
        content : "最近我加入了一个神秘太空组织，接下来我终于可以大展宏图了……"
    },
    {
        name : "《颤抖吧地球人，接下来你们有福了》",
        content : "工作不开心，一个人想静静、夫妻生活不和谐……终于有救啦！"
    }
]
desc = sharContent[ count1 ].content;

function doShare(name){
    var shareItem = shareObj[count];

    var title = format(shareItem.title,{
        name:name
    });

    var imgUrl = prefix + shareItem.imgUrl;
    share(title,imgUrl,link,desc);
}

doShare(sharContent[ count1 ].name)


if ("undefined" != typeof DidiJSBridge) {
    var e = {
        share_url: link,
        share_icon_url: 'http://static.galileo.xiaojukeji.com/static/tms/other/z/Xing_space/Xing_space/images/share.jpg',
        share_img_url: 'http://static.galileo.xiaojukeji.com/static/tms/other/z/Xing_space/Xing_space/images/share.jpg',
        share_title:'滴滴空间计划，星际探索终极猜想',
        share_content: '颤抖吧地球人，我加入了一个神秘太空组织，就要去太空玩耍了',
        share_from: "滴滴出行"
    };

    var i = function() {
    };

    var n = {
        entrance: {
            icon: "http://static.xiaojukeji.com/api/img/i-webview-entrance.png"
        },
        buttons: [{
            type: "share_weixin_timeline",
            name: "微信朋友圈",
            data: e,
            callback: i
        }, {
            type: "share_weixin_appmsg",
            name: "微信好友",
            data: e,
            callback: i
        }]
    };

    "undefined" != typeof DidiJSBridge ? (DidiJSBridge.callHandler("init_entrance", n),
        DidiJSBridge.callHandler("show_entrance"),
        DidiJSBridge.callHandler("invoke_entrance")) : document.addEventListener("DidiJSBridgeReady", function() {
            DidiJSBridge.callHandler("init_entrance", n),
                DidiJSBridge.callHandler("show_entrance"),
                DidiJSBridge.callHandler("invoke_entrance")
        }
        , !1)
}

