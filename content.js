var contentknow;
let ismodified = false;

//popup->content  명령받고 실행
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    contentknow = request.type;
    if (request.type === 'activate' && !ismodified) {
        setTimeout(() => {
            modifyHTML();
        }, 1);      
    }
    else if (request.type === 'deactivate') {
        removeHTML();
    } 
    else{
        console.log("requestype is not matched!");
    }
    sendResponse({});
    return true;
});



function removeHTML() {
    console.log("removeHTML");
    const elements = document.querySelectorAll('.junebutton');
    elements.forEach(element => {
        element.remove();
    });
    const parentDivs = document.querySelectorAll('.junedone');
    parentDivs.forEach(parentDiv => {
        parentDiv.classList.remove('junedone');
    });
}


function modifyHTML() {
    ismodified = true;
    console.log("modifyHTML");
    const parentDivs = document.querySelectorAll('.overflow-y-auto code:not(.junedone)');
    if (parentDivs.length > 0) {
        parentDivs.forEach(parentDiv => {
            parentDiv.classList.add('junedone');
            const codeWrapper = document.createElement('div');
            codeWrapper.classList.add('flex', 'items-center', 'px-4', 'text-xs', 'font-sans', 'justify-end','text-token-text-secondary','junebutton');
            codeWrapper.style.height = '32px';
            const copyButtonHtml = `
                    <button class="flex gap-1 items-center" id="copyButton">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path>
                        </svg>
Copy code
                    </button>
            `;
            codeWrapper.innerHTML = copyButtonHtml;

            // 생성된 HTML 코드를 부모 div 요소의 하단에 추가합니다.
            parentDiv.parentNode.parentNode.appendChild(codeWrapper);
            ismodified = false;

            // 복사 버튼을 클릭하면 코드를 복사하도록 합니다.
            const copyButton = codeWrapper.querySelector('#copyButton');
            if (copyButton) {
                copyButton.addEventListener('click', function () {
                    const codeElement = codeWrapper.parentElement.querySelector('code');
                    if (codeElement) {
                        navigator.clipboard.writeText(codeElement.textContent);
                        // 아이콘 숨김 처리
                        const icon = copyButton.querySelector('svg');
                        if (icon) {
                            icon.style.display = 'none';
                        }
                        // 버튼 텍스트 변경
                        copyButton.textContent = '🗸   Copied!';
                        // 2초 후 원래대로 돌아가도록 설정
                        setTimeout(() => {
                            // 아이콘 표시
                            if (icon) {
                                icon.style.display = 'inline-block';
                            }
                            // 버튼 텍스트와 아이콘 원래대로 변경
                            copyButton.innerHTML = copyButtonHtml;
                        }, 2000);
                        
                    } 
                    
                });
            } else {
                ismodified = false;
                //console.log('Copy button not found!');
            }
        });

    } else {
        ismodified = false;

        //console.log('code parent div not found!');
    }
}



const observer = new MutationObserver((mutationsList, observer) => {
    setTimeout(() => {
        if(contentknow === 'activate' && !ismodified){
            modifyHTML();
        }
    }, 1);
});

observer.observe(document.body, { childList: true, subtree: true });
