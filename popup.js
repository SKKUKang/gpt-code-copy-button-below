document.addEventListener("DOMContentLoaded", function() {
    // Activate 버튼 클릭 시
    document.getElementById("activateButton").addEventListener("click", function() {
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







