// (popup<->background)DOMContentLoaded 이벤트가 발생하면 백그라운드 페이지에서 변수를 가져오는 함수 호출
    chrome.runtime.sendMessage("getBackgroundVariable", function(response) {
        if (response && response.beforeOption) {
            if (response.beforeOption === "activate") {
                document.getElementById("activateRadio").checked = true;
            } else if (response.beforeOption === "deactivate") {
                document.getElementById("deactivateRadio").checked = true;
            } 
    }}
    );

    // 버튼 클릭 이벤트를 처리하는 함수
document.getElementById("sub"), addEventListener('click', () => {
    var activationOption = document.querySelector('input[name="activationOption"]:checked').value;
    // popup->background 변수변경 알림
    chrome.runtime.sendMessage(activationOption
    ,(response) => {
    })
    //popup->content에 실행명령
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
                }
            );                
        }
    });

});







