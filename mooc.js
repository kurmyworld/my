
var i=0;
function next(){
	alert("课程已挂完，请点击下一课！");
	if(i<datapart.length){
		datapart[++i].parentElement.click(0);
		console.info("已为您自动加载下一课，请点击播放按钮播放视频");
		window.setTimeout("goon();",3000);
		return;
	}
	var dd = document.getElementsByClassName("active")[0];
	var dl = dd.parentElement;
	var index = $(".active").index();

	if(dl.children[index+1]!=undefined){
		i=0;
		dl.children[index+1].children[0].click(0);
	}else{
		i=0;
		var dlIndex = $(dl).index();
		dl.parentElement.children[dlIndex+1].children[1].click(0);
	}


}
function goon(){
	if(window.confirm("继续脚本请按确定，退出请点击取消")){
		init();
	}else{
		return;
	}
}
function init(){
		var patt = new RegExp("[0-9][0-9]:[0-9][0-9]");
		var datapart = document.getElementsByClassName("bottom-part");
		var data = document.getElementsByClassName("bottom-part")[i];
		if(data!=undefined){
			data=data.innerHTML;
		}else{
			i=0;
			data = document.getElementsByClassName("bottom-part")[i].innerHTML;
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
		var time = 1000*60*(h*60+m)+s;
		console.clear();
		console.info("视频总长："+h+"时"+m+"分"+s + "秒");
		window.setTimeout('next();',time);
		console.info("已设置自动提醒");
}
init();
