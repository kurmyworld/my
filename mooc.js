var i=0;
var datapart;
function next(){
	alert("�γ��ѹ��꣬������һ�Σ�");
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
	console.info("��Ϊ���Զ�������һ�Σ��������Ű�ť������Ƶ");
	if(window.confirm("�����ű��밴ȷ�����˳�����ȡ��")){
		init();
	}else{
		console.clear();
		console.info("��ȡ�����Զ�����");
		console.info("�������������ʷ��¼�����ûس��������ű���");
		return;
	}
}
function getAlltime(h,m,s){
	return 1000*(60*(h*60+m)+s)+5*1000;//��5���ӳ٣���Ϊ�����ű���������Ű�ť��ʱ���ֹ�´μ���ʧ�ܡ�
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
	var time = getAlltime(h,m,s);
	console.clear();
	console.info("���ڲ��ţ�"+$("em")[i].innerHTML);
	console.info("��Ƶ�ܳ���"+h+"ʱ"+m+"��"+s + "��");
	console.info("����5���ڵ�����Ű�ť�������½ڿμ���ʧ�ܣ�");
	window.setTimeout("next();",time);
	console.info("�������Զ�����");
}
init();
