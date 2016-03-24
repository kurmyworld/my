var i=0;
var datapart;
function next(){
	alert("课程已挂完，请点击下一课！");
	if(++i<datapart.length){
		datapart[i].parentElement.click(0);
		goon();
		return;
	}
	var dd;
	var dl;
	var index;
	dd = document.getElementsByClassName("active")[0];
	dl = dd.parentElement;
	index = $(".active").index();
	if(dl.children[index+1]!=undefined){
		i=0;
		dl.children[index+1].children[0].click(0);
	}else{
		i=0;
		index = $(dl).index();
		dl.parentElement.children[index+1].children[1].children[0].click(0);
	}
	goon();
}
function goon(){
	console.info("已为您自动加载下一课，请点击播放按钮播放视频");
	if(window.confirm("继续脚本请按确定，退出请点击取消")){
		init();
	}else{
		console.clear();
		console.info("您取消了自动提醒");
		console.info("方向键↑调出历史记录，轻敲回车可重启脚本。");
		return;
	}
}
function getAlltime(h,m,s){
	return 1000*(60*(h*60+m)+s)+5*1000;//加5秒延迟，因为启动脚本到点击播放按钮有时差，防止下次加载失败。
}
function init(){
	var patt = new RegExp("[0-9][0-9]:[0-9][0-9]");
	datapart = document.getElementsByClassName("bottom-part");
	var data;
	data = datapart[i];
	if(data!=undefined){
		data=data.innerHTML;
	}else{
		i=0;
		data = datapart[i].innerHTML;
	}
	if(!patt.test(data)){
		console.clear();
		console.info("找不到时间信息!");
		console.info("PPT可以直接在下方输入最后一页页码，轻敲回车即可看完！");
		console.info("方向键↑调出历史记录，轻敲回车可重启脚本。");
		return;
	}
	    data = patt.exec(data)
	   	data = data[0];
	var args = data.split(":");
	var s	 = args[args.length-1];
	var m	 = args[args.length-2];
	var h	 = args[args.length-3];
	if(h==undefined){h=0;}
	var time = getAlltime(h,m,s);
	console.clear();
	console.info("正在播放："+$("em")[i].innerHTML);
	console.info("视频总长："+h+"时"+m+"分"+s + "秒");
	console.info("请在5秒内点击播放按钮，避免下节课加载失败！");
	window.setTimeout("next();",time);
	console.info("已设置自动提醒");
}
init();
