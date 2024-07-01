let ismodified = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in content script:", request.type);
    if (request.type === 'activate' && !ismodified) {
        setTimeout(() => {
            modifyHTML();
        }, 1);      
    } else if (request.type === 'deactivate') {
        removeHTML();
    } else {
        console.log("request.type is not matched!");
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
    observer.disconnect();
}

function modifyHTML() {
    if(ismodified) {
        console.log("이미 실행중입니다.");
        return;
    }
    ismodified = true;
    const parentDivs = document.querySelectorAll('.overflow-y-auto code:not(.junedone)');
    if (parentDivs.length > 0) {
        parentDivs.forEach(parentDiv => {
            parentDiv.classList.add('junedone');
            const codeWrapper = document.createElement('div');
            codeWrapper.classList.add('flex', 'items-center', 'px-4', 'text-xs', 'font-sans', 'justify-end','text-token-text-secondary','junebutton');
            codeWrapper.style.height = '32px';
            const copyButtonHtml = '<button class="flex gap-1 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path> </svg>코드 복사</button>';
            codeWrapper.innerHTML = copyButtonHtml;
            parentDiv.parentNode.parentNode.appendChild(codeWrapper);
            
            console.log("실제로 코드 변경함");
            const copyButton = codeWrapper.querySelector('button');
            if (copyButton) {
                copyButton.addEventListener('click', function () {
                    const codeElement = codeWrapper.parentElement.querySelector('code');
                    if (codeElement) {
                        navigator.clipboard.writeText(codeElement.textContent);
                        const icon = copyButton.querySelector('svg');
                        if (icon) {
                            icon.style.display = 'none';
                        }
                        copyButton.textContent = '🗸   Copied!';
                        setTimeout(() => {
                            if (icon) {
                                icon.style.display = 'inline-block';
                            }
                            copyButton.innerHTML = copyButtonHtml;
                        }, 2000);  
                    } 
                });
            }
        });
    }
    const juneButtons = document.querySelectorAll('.junebutton');
    // junebutton 클래스를 가진 요소들을 순회하면서 검사
        juneButtons.forEach((button, index, buttons) => {   
        // 현재 요소의 다음 형제 요소가 존재하고, 그 다음 형제 요소가 junebutton 클래스를 가지고 있는지 확인
        if (button.nextElementSibling && button.nextElementSibling.classList.contains('junebutton')) {
            // 현재 요소의 다음 형제 요소가 junebutton 클래스를 가지고 있다면 현재 요소 삭제
            button.remove();
            console.log("중복버튼 삭제")
        }
        });
    ismodified = false;
    const parenttarget = document.querySelector('[role="presentation"]');
    const target = parenttarget.querySelector('.flex-1.overflow-hidden');
    observer.observe(target, { childList: true, subtree: true });
}

const observer = new MutationObserver((mutationsList, observer) => {
    setTimeout(() => {
        modifyHTML();
    }, 1);
});
