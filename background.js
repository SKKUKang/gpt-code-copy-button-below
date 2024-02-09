var beforeOption = 'deactivate';


// (popup->background)메시지를 받아서 처리하는 함수
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "getBackgroundVariable") {
      sendResponse({beforeOption:beforeOption});
      console.log(beforeOption,"is sent to popup.js");
  }
  else if(message === 'activate'){
    beforeOption = 'activate';
    console.log("백그라운드의 변수:",beforeOption);

  }
  else if(message === 'deactivate'){
    beforeOption = 'deactivate';
    console.log("백그라운드의 변수:",beforeOption);
  }
  else{
    console.error("requestype is not matched!",request.type);
  }
});
