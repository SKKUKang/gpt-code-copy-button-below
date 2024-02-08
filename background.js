
chrome.runtime.onInstalled.addListener(() => {
    // 초기 상태는 'deactivate'로 설정
    chrome.storage.local.set({ activationOption: 'deactivate' });
  });
  

/*
// popup.html의 라디오 버튼 상태를 가져와서 초기화
chrome.runtime.onStartup.addListener(() => {
    // chrome.storage에서 라디오 버튼의 상태를 가져와서 설정
    chrome.storage.local.get('activationOption', (data) => {
      const checkedRadio = data.activationOption;
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // 현재 열려있는 탭에 메시지를 보내서 라디오 버튼 상태를 설정
        chrome.tabs.sendMessage(tabs[0].id, { checkedRadio: checkedRadio });
      });
    });
  });
  



  // 탭이 업데이트될 때마다 content script에 메시지를 보내서 modifyHTML() 함수 실행
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      const data = await new Promise((resolve, reject) => {
        chrome.storage.local.get('activationOption', (data) => {
          resolve(data);
        });
      });
      const checkedRadio = data.activationOption;
      // 현재 열려있는 탭에 메시지를 보내서 라디오 버튼 상태를 설정
      chrome.tabs.sendMessage(tabId, { type: 'update'});
    }
  });


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
    chrome.tabs.query({
        active: true,
        currentWindow: true
    },(tabs)=>{
        if(changeInfo.url && tabId === tabs[0].id) {
            console.log("Only Current TAB");
        };
    })})

    */