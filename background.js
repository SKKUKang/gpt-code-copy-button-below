var beforeOption = 'deactivate';

// (popup<->background)메시지를 받아서 처리하는 함수
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "getBackgroundVariable") {
      sendResponse({beforeOption:beforeOption});
  }
  else if(message === 'activate'){
    beforeOption = 'activate';

  }
  else if(message === 'deactivate'){
    beforeOption = 'deactivate';
  }
  else{
    console.error("requestype is not matched!",request.type);
  }
});

