
var i=0;
function next(){
	alert("�γ��ѹ��꣬������һ�Σ�");
	if(i<datapart.length){
		datapart[++i].parentElement.click(0);
		console.info("��Ϊ���Զ�������һ�Σ��������Ű�ť������Ƶ");
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
	if(window.confirm("�����ű��밴ȷ�����˳�����ȡ��")){
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
			console.info("�Ҳ���ʱ����Ϣ!");
			console.info("PPT����ֱ�����·��������һҳҳ�룬���ûس����ɿ��꣡");
			console.info("�������������ʷ��¼�����ûس��������ű���");
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
		console.info("��Ƶ�ܳ���"+h+"ʱ"+m+"��"+s + "��");
		window.setTimeout('next();',time);
		console.info("�������Զ�����");
}
init();
