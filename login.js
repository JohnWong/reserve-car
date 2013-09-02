// content.js
// @author         John Wong

(function(){
  document.oncontextmenu = null;
  document.onselectstart = null;
  var optionUrl = chrome.extension.getURL("options.html");
  var cssUrl = chrome.extension.getURL("content.css");
  var optionDiv = '<link href="' + cssUrl + '" rel="stylesheet" type="text/css"/><div id="option"><a class="btn" href="' + optionUrl + '" target="_blank">option</a></div>';//<div id="start"><a class="btn" href="' + optionUrl + '">start</a></div>';
  document.body.innerHTML += optionDiv;
  function setYanzheng(){
    var matcher = document.cookie.match(/CheckCode=.*;/)[0];
	matcher = matcher.substr(10, matcher.length-11);
	form1.yanzheng.value = matcher;
  };
  function restart(){
    setTimeout(function(){
	  chrome.runtime.sendMessage({content: "started"}, function(response) {
	    setYanzheng();
	    document.getElementById("button").click();
      });
    }, 1000);
  }
  function login(){
    chrome.runtime.sendMessage({content: "login"}, function(response) {
      var matcher = document.body.innerHTML.match(/<script>alert\("(.*)"\);<\/script>/);
	  if(response.isActivated){
	    form1.txtname.value = response.txtname;
        form1.txtpwd.value = response.txtpwd;
        setInterval(function(){
          setYanzheng();
        }, 500);
	    if(response.restart || matcher != null){
          restart();
        }
	  } else {
	    window.alert(matcher[1]);
	  }
    });
  };
  login();
})();