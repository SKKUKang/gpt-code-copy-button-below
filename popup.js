// (popup<->background)DOMContentLoaded 이벤트가 발생하면 백그라운드 페이지에서 변수를 가져오는 함수 호출

document.addEventListener("DOMContentLoaded", function() {
    // Activate 버튼 클릭 시
    document.getElementById("activateButton").addEventListener("click", function() {
        // popup->background 변수변경 알림
        chrome.runtime.sendMessage("activate");
        //popup->content에 실행명령
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            chrome.tabs.sendMessage(
                    tab.id, {
                    type: 'activate',
                    payload: {
                        message: 'activate',
                    },
                },
                    (response) => {
                    }
                );
        });
    });

    // Deactivate 버튼 클릭 시
    document.getElementById("deactivateButton").addEventListener("click", function() {
        // popup->background 변수변경 알림
        chrome.runtime.sendMessage("deactivate");
        //popup->content에 실행명령
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
                chrome.tabs.sendMessage(
                    tab.id, {
                    type: 'deactivate',
                    payload: {
                        message: 'deactivate',
                    },
                },
                    (response) => {
                    }
                );                
        });
    });
});







