var i=0;
var datapart;
function tip(){
	alert("课程已挂完，请点击下一课！");
	next();
}
function next(){
	
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
function getAllSecons(){
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
		return 0;
	}
	    data = patt.exec(data)
	   	data = data[0];
	var args = data.split(":");
	var s	 = args[args.length-1];
	var m	 = args[args.length-2];
	var h	 = args[args.length-3];
	if(h==undefined){h=0;}
	return (h*60*60+m*60+s);
}
function start(){
	var seconds = getAllSecons();
	if(getAllSecons == 0)return;
	console.clear();
	console.info("正在播放："+$("em")[i].innerHTML);
	console.info("视频总长："+seconds+"秒");
	console.info("请在5秒内点击播放按钮，避免下节课加载失败！");
	console.info("已设置自动提醒");
	window.setTimeout("tip()",seconds*1000);
}
start();
