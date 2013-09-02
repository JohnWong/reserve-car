// content.js
// @author         John Wong

(function(){
  var tb = document.getElementById("gv");
  if(!tb || tb.children[0].childElementCount != 8){
    chrome.runtime.sendMessage({content: "restart"}, function(response) {
      window.location.replace("http://218.205.165.196:8080/XYYC21DR1.aspx");
    });
  }
  tb = tb.children[0];
  document.body.removeAttribute("oncontextmenu");
  document.body.removeAttribute("ondragstart");
  document.body.removeAttribute("onselectstart");
  document.body.removeAttribute("onselect");
  document.body.removeAttribute("oncopy");
  document.body.removeAttribute("onbeforecopy");
  document.body.removeAttribute("onmouseup");
  setTimeout(function(){window.resizeTo(910, 520);}, 0);
  chrome.runtime.sendMessage({content: "frequency"}, function(response) {
    if(response.isActivated){
      // find data
      var date = response.date;
      var time = response.time;
      var tr = tb.children[date];
      var cell = tr.children[time];
      var ele = cell.children[0];
      if(!ele.disabled && ele.style.backgroundColor == "rgb(51, 255, 153)"){
        var msg = tr.children[0].innerHTML + " " + tb.children[0].children[time].innerHTML + " \n请登录确认是否成功";
		chrome.runtime.sendMessage({content: "show", msg: msg}, function(response) {
		  ele.click();
		});
      } else {
        setTimeout(startefresh, response.frequency);
      }
    }
  });
})();

function startefresh(){
  var btn = document.getElementById("btnRefresh");
  btn.click();
}
