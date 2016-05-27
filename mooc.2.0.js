function play(){
  try {
    for(var i=0;i<4;i++)
      $("a.ln-confirm-btn.j-resume1")[0].click(0);
  }catch(e){
  }
}

function patternTime(){
  try{
    var html = $(".active")[1].innerHTML;
    var pattern = new RegExp("[\\d+](:\\d\\d){2}");
    if(pattern.test(html)){
      return pattern.exec(html)[0]
    }else{
      return "0:00:00";
    }
  }catch(e){
    return "0:00:00";
  }

}

function setInfo(){
  $("title").innerHTML="AutoTip By:Chioy";
  console.clear();
  var classname = $($(".active")[1]).find("em")[0].innerHTML;
  console.log("AutoTip Start");
  console.log("Resource Name:" + classname);
  console.log("Duration:" + patternTime() + "\nSeconds:" + getCurrentSeconds()+"(s)");
}

function getPageSize(){
  return parseInt($("span.pageindex").find("span")[1].innerHTML);
}

function getNextPageBtn(){
  var a = $("a");
  for(i in a){
    if(a[i].innerHTML=="下"){
      return a[i];
    }
  }
}

function doReadDoc(){
  var pagesize = getPageSize();
  var nextBtn = getNextPageBtn();
  $(".minimap-item-bg")[pagesize-1].click(0)
}

function timeFormat(timeString){
  var t = timeString.split(":");
  var len = t.length;
  var h = parseInt(t[len-3]);
  var m = parseInt(t[len-2]);
  var s = parseInt(t[len-1]);
  return (s+m*60+h*60*60);
}

function canNext(){
  try {
    if($($(".active.full"))[0] == undefined){
      return false;
    }else{
      return true;
    }
  } catch (e) {
      return false;
  }
}

function hasNext(who){
  var next;
  try {
    switch (who) {
      case "section":
        next = $($("dd.active")[0]).next()[0];
        break;
      case "resource":
        next = $($(".full.active")[0]).next()[0];
      default:
    }
    if(next == undefined){
      return 0;
    }else{
      return $(next).find("a")[0];
    }
  } catch (e) {
    return 0;
  }
}

function toNextChapter(){
  var nextChapter = $($($(".active")[0]).parent().next()[0]).find("a")[0];
  return nextChapter==undefined?0:nextChapter;
}


function hasNextSection(){
  return hasNext("section");
}

function hasNextResource(){
  return hasNext("resource");
}

function getCurrentSeconds(){
  return timeFormat(patternTime());
}

function click(element){
  console.log("Check whether to allow loading...");
  if(!canNext()){
    console.log("Can not load,wait for 20 seconds to continue...");
    play();//有时候可能是视频一直加载失败，主动再点播放，多加载几次。
    window.setTimeout(function () {
      click(element);
    }, 20*1000);
  }else{
    element.click(0);
    console.log("learned,start Loading data...");
    window.setTimeout(function () {
      start();
    }, 10*1000);
  }
}



function start(){
  var seconds = getCurrentSeconds();
  if(canNext()){
    seconds = 1;
    console.info("This has learned");
  }
  if(seconds==0){
    console.info("---------------------------------");
    console.info("Can not find duration,excute doReadDoc()");
    console.info("---------------------------------");
    doReadDoc();
    seconds = 2;
  }
  nextResource = hasNextResource();
  nextSection = hasNextSection();
  nextChapter = toNextChapter();
  if(nextResource==0)
  if(nextSection==0)
  if(nextChapter == 0){
    console.clear();
    console.info("------Class Over-----------");
    return ;
  }
  play();
  if(nextResource != 0){
    window.setTimeout(function () {
      click(nextResource);
    }, seconds*1000);

  }else if(nextSection != 0){
    window.setTimeout(function () {
      click(nextSection);
    }, seconds*1000);

  }else if(nextChapter != 0){
    window.setTimeout(function () {
      click(nextChapter);
    }, seconds*1000);
  }
  setInfo();
}
