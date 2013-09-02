// background.js
// @author         John Wong

function show(msg){
  var notification = window.webkitNotifications.createNotification(
    'icon-48.png',                      // The image.
    '预订成功', // The title.
    msg
  );
  notification.show();
  return true;
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // If the letter 'g' is found in the tab's URL...
  if (/^http:\/\/*218\.205\.165\.196:8080\/.*$/.test(tab.url)) {
    // ... show the page action.
	chrome.pageAction.setPopup({tabId: tabId, popup: "options.html"})
    chrome.pageAction.show(tabId);
  }
});

// Add listener for get frequency request
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.content == "frequency"){
      sendResponse({isActivated: JSON.parse(localStorage.isActivated), 
                    frequency: localStorage.frequency * 1000,
                    date: JSON.parse(localStorage.date),
                    time: JSON.parse(localStorage.time)});
    } else if (request.content == "login") {
      sendResponse({isActivated: JSON.parse(localStorage.isActivated),
                    txtname: localStorage.txtname,
                    txtpwd: localStorage.txtpwd,
                    restart: JSON.parse(localStorage.restart)});
    } else if (request.content == "show") {
	  localStorage.isActivated = false;
	  sendResponse({result: true});
	  var audio = new Audio("beep.ogg");
	  audio.play();
	  show(request.msg);
    } else if (request.content == "restart"){
      sendResponse({result: localStorage.restart = true});
    } else if (request.content == "started"){
      sendResponse({result: localStorage.restart = false});
	}
  });

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = false;    // The display activation.
  localStorage.frequency = 10;        // The display frequency, in minutes.
  localStorage.txtname = "";
  localStorage.txtpwd = "";
  localStorage.isSound = true;
  localStorage.date = 1;
  localStorage.time = 1;
  localStorage.isInitialized = true; // The option initialization.
  localStorage.restart = false;
}
