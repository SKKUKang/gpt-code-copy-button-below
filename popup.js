document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("activateButton").addEventListener("click", function() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, { type: 'activate', payload: { message: 'activate' } }, (response) => {
                console.log("Response received from content script:", response);
            });
        });
    });

    document.getElementById("deactivateButton").addEventListener("click", function() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, { type: 'deactivate', payload: { message: 'deactivate' } }, (response) => {
                console.log("Response received from content script:", response);
            });
        });
    });
});
