function tip(){
  alert("tip")
}
function patternTime(){
  var html = $(".active")[1].innerHTML;
  var pattern = new RegExp("[\\d+](:\\d\\d){2}");
  return pattern.exec(html)[0]
}

function patternID(who){
  var sourceid = $(".active")[who].id;
  var pattern = new RegExp("\\d{2,}\\b");
  return parseInt(pattern.exec(sourceid)[0]);
}

function setInfo(){
  console.clear();
  var classname = $(".active")[1].children[0].children[0].children[1].innerHTML;
  console.info("ClassName:" + classname);
  console.info("time:" + patternTime());
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
  element.click(0);
  console.info("watting for loadding...");
  window.setTimeout(function () {
    console.clear();
    console.info("auto tip started");
    start();
  }, 10*1000);
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
  var nextResource = hasNextResource(1);
  if(nextResource != 0){
    window.setTimeout(function () {
      click(nextResource);
    }, seconds*1000);
  }else {
    for(var i = 1;i<3;i++){
      nextSection = hasNextSection(i);
      if(nextSection != 0){
        window.setTimeout(function () {
          click(nextSection);
        }, seconds*1000);
        break;
      }
    }
  }
}
