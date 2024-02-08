
// background.js로부터 메시지를 받는 함수
/*chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // 받은 변수 값에 따라 라디오 버튼을 체크
    if (message.checkedRadio === 'activate') {
      document.getElementById('activateRadio').checked = true;
    } else if (message.checkedRadio === 'deactivate') {
      document.getElementById('deactivateRadio').checked = true;
    }
  });
*/

document.getElementById("sub"), addEventListener('click', () => {
    // 버튼 클릭 이벤트를 처리하는 함수
    var activationOption = document.querySelector('input[name="activationOption"]:checked').value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (activationOption === "activate") {
            chrome.tabs.sendMessage(
                tab.id, {
                type: 'activate',
                payload: {
                    message: activationOption,
                },
            },
                (response) => {
                    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                        if (request.type === 'activatecheck') {
                            console.log('정상적으로 activate로 변경되었다고 content.js에서 응답이 왔습니다');
                        }

                        sendResponse({});
                        return true;
                    });

                }
            );
        }
        else if(activationOption === "deactivate"){ 
            chrome.tabs.sendMessage(
                tab.id, {
                type: 'deactivate',
                payload: {
                    message: activationOption,
                },
            },
                (response) => {
                    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                        if (request.type === 'deactivatecheck') {
                            console.log('정상적으로 deactivate로 변경되었다고 content.js에서 응답이 왔습니다');
                        }

                        sendResponse({});
                        return true;
                    });

                }
            );                
        }
    });

});
