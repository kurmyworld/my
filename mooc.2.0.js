function tip(){
  alert("请点击播放按钮播放课程")
}
function patternTime(){
  var html = $(".active")[1].innerHTML;
  var pattern = new RegExp("[\\d+](:\\d\\d){2}");
  if(pattern.test(html)){
    return pattern.exec(html)[0]
  }else{
    return "0:00:00";
  }
}

function patternID(who){
  var sourceid = $(".active")[who].id;
  var pattern = new RegExp("\\d{2,}\\b");
  return parseInt(pattern.exec(sourceid)[0]);
}

function canNext(){
  var attrib = $($(".active")[1]).attr("class").split(" ");
  for(var a in attrib){
    if(attrib[a] == "full"){
      return true;
    }
  }
  return false;
}

function setInfo(){
  $("title").html("Using AutoTip by:Chioy");
  console.clear();
  var classname = $(".active")[1].children[0].children[0].children[1].innerHTML;
  console.log("AutoTip By:Chioy \n\n--------- Start---------\n\n");
  console.log("Resource Name:" + classname);
  console.log("Duration:" + patternTime());
}

function timeFormat(timeString){
  var t = timeString.split(":");
  var len = t.length;
  var h = parseInt(t[len-3]);
  var m = parseInt(t[len-2]);
  var s = parseInt(t[len-1]);
  return (s+m*60+h*60*60);
}

function hasNext(who,increment){
  var add = parseInt(increment);
  var i = 1;
  var prefix = "#resource-";
  if(who=="section")i=0,prefix="#section-";
  var id = patternID(i)+add;
  var next = $(prefix+id)[0];
  if(next == undefined){
    return 0;
  }else{
    return next.children[0];
  }
}

function click(element){
  console.log("Check whether to allow loading...");
  if(!canNext()){
    console.log("Can not load,wait for 20 seconds to continue...");
    window.setTimeout(function () {
      click(element);
    }, 20*1000);
  }else{
    element.click(0);
    console.log("Loading data...");
    window.setTimeout(function () {
      // console.clear();
      console.log("AutoTip Has Been Started");
      start();
    }, 10*1000);
  }
}

function hasNextSection(increment){
  return hasNext("section",increment);
}

function hasNextResource(increment){
  return hasNext("resource",increment);
}

function getCurrentSeconds(){
  return timeFormat(patternTime());
}


function start(){
  setInfo();
  var seconds = getCurrentSeconds();
  if(seconds==0){
    console.info("---------------------------------");
    console.info("Can not find duration,exit the script");
    console.info("---------------------------------");
    return;
  }
  var nextResource = hasNextResource(1);
  if(nextResource != 0){
    tip();
    window.setTimeout(function () {
      click(nextResource);
    }, seconds*1000);
  }else {
    for(var i = 1;i<3;i++){
      nextSection = hasNextSection(i);
      if(nextSection != 0){
        tip();
        window.setTimeout(function () {
          click(nextSection);
        }, seconds*1000);
        break;
      }
    }
  }
}
