/**
 *
 * @authors Your Name (you@example.org)
 * @date    2014-09-15 09:37:13
 * @version $Id$
 */

xtwgw = {
	scrollToPage: function(value) {
		var o = {
			oContent: "#bannerTemplate", //插入的对象
			nCount: 4 //jsonpCallback
		};
		o = $.extend(o, value);
		o.nCount=$("#bannerTemplate").find('li').length;
		i = 0;
		var wdc=$("#bannerTemplate").width();
		$("#bannerTemplate").height(wdc/1.6);
		$("#bannerTemplate img").css("height",wdc/1.6);
		$("#bannerTemplate ul").css("height", wdc/1.6);
		$("#bannerTemplate").find("li").eq(0).siblings().addClass("next");
		
		var hover = setInterval(function() {
			if (i > o.nCount - 1) {
				i = 0;
			}
			p=i-1;
			if(p>o.nCount - 1){
				p=0;
			}
			n=i+1;
			if(n>o.nCount - 1){
             n=0;
			}
			$("#iconlist").find("i").eq(n).addClass('cur').siblings().removeClass('cur');
            $("#bannerTemplate").find('li').eq(p).removeClass('pre').addClass('next');
			$("#bannerTemplate").find('li').eq(i).addClass('pre');
			$("#bannerTemplate").find('li').eq(n).removeClass('next');
			i++;
		}, 2000);
        $(o.oContent).bind("touchstart",function(){
           clearInterval(hover);
         });
        $(o.oContent).bind("touchend",function(){
           hover = setInterval(function() {
			if (i > o.nCount - 1) {
				i = 0;
			}
			p=i-1;
			if(p>o.nCount - 1){
				p=0;
			}
			n=i+1;
			if(n>o.nCount - 1){
             n=0;
			}
			$("#iconlist").find("i").eq(i).addClass('cur').siblings().removeClass('cur');
            $("#bannerTemplate").find('li').eq(p).removeClass('pre').addClass('next');
			$("#bannerTemplate").find('li').eq(i).addClass('pre');
			$("#bannerTemplate").find('li').eq(n).removeClass('next');
			i++;
		}, 2000);
         });
	}
};